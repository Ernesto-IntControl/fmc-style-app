const { Service } = require("../modeles");
const { creerClientOpenAI } = require("../configuration/openai");
const { CRENEAUX_FIXES, trouverDisponibilites } = require("./disponibilite.service");

const modeleAssistant = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const schemaAssistant = {
  type: "object",
  additionalProperties: false,
  properties: {
    intention: {
      type: "string",
      enum: ["reservation", "information_services", "modification", "annulation", "salutation", "hors_sujet"],
    },
    serviceId: { type: ["integer", "null"] },
    serviceNom: { type: ["string", "null"] },
    date: { type: ["string", "null"], description: "Date au format YYYY-MM-DD, ou null si inconnue." },
    heure: {
      type: ["string", "null"],
      description: "Heure au format HH:mm si elle correspond a 09:00, 11:00, 14:00 ou 16:00.",
    },
    creneauDemande: { type: ["string", "null"], description: "Heure demandee par le client, meme indisponible." },
    besoinClient: {
      type: ["string", "null"],
      description: "Resume court du besoin ou de l'humeur du client : conseil, hesitation, urgence, style souhaite.",
    },
    suggestions: {
      type: "array",
      items: { type: "string" },
      description: "Deux ou trois suggestions courtes que l'assistant peut proposer ensuite.",
    },
    informationsManquantes: {
      type: "array",
      items: { type: "string", enum: ["service", "date", "heure"] },
    },
    prochaineAction: {
      type: "string",
      enum: ["demander_service", "demander_date", "demander_heure", "proposer_creneaux", "pret_a_reserver", "repondre_info"],
    },
    reponse: { type: "string" },
  },
  required: [
    "intention",
    "serviceId",
    "serviceNom",
    "date",
    "heure",
    "creneauDemande",
    "besoinClient",
    "suggestions",
    "informationsManquantes",
    "prochaineAction",
    "reponse",
  ],
};

const extraireDate = (texte) => {
  const contenu = texte.toLowerCase();
  const aujourdHui = new Date();

  if (contenu.includes("demain")) {
    const demain = new Date(aujourdHui);
    demain.setDate(aujourdHui.getDate() + 1);
    return demain.toISOString().slice(0, 10);
  }

  if (contenu.includes("aujourd")) {
    return aujourdHui.toISOString().slice(0, 10);
  }

  const iso = contenu.match(/\b\d{4}-\d{2}-\d{2}\b/);
  return iso ? iso[0] : null;
};

const extraireHeure = (texte) => {
  const correspondance = texte.match(/\b(09|9|11|14|16)[:h]?(00)?\b/);
  if (!correspondance) return null;
  const heure = correspondance[1].padStart(2, "0");
  return `${heure}:00`;
};

const identifierServiceLocal = (texte, services) => {
  if (!texte) return null;
  const contenu = texte.toLowerCase();

  return services.find((service) => {
    const nom = service.nom.toLowerCase();
    return contenu.includes(nom) || nom.split(" ").some((mot) => mot.length > 3 && contenu.includes(mot));
  });
};

const detecterIntentionLocale = (texte) => {
  const contenu = texte.toLowerCase();
  if (/\b(bonjour|bonsoir|salut|hello|coucou|bjr)\b/.test(contenu)) return "salutation";
  if (/\b(prix|tarif|combien|service|services|proposez|conseil|recommande|choisir|peau|cheveux|ongles)\b/.test(contenu)) {
    return "information_services";
  }
  if (/\b(annuler|supprimer|cancel)\b/.test(contenu)) return "annulation";
  if (/\b(modifier|changer|deplacer|reporter)\b/.test(contenu)) return "modification";
  return "reservation";
};

const construireCatalogue = (services) => {
  return services.map((service) => ({
    id: service.id,
    nom: service.nom,
    prix: Number(service.prix),
    duree: service.duree,
    description: service.description,
  }));
};

const formaterHistorique = (historique = []) => {
  return historique.map((item) => ({
    role: item.expediteur === "assistant" ? "assistant" : "user",
    content: item.contenu,
  }));
};

const analyserAvecOpenAI = async ({ message, contexte, historique, services }) => {
  const client = creerClientOpenAI();
  if (!client) return null;

  const dateAujourdhui = new Date().toISOString().slice(0, 10);
  const catalogue = construireCatalogue(services);

  const response = await client.responses.create({
    model: modeleAssistant,
    input: [
      {
        role: "system",
        content:
          "Tu es Aura, assistante virtuelle generative du salon FMC Style. Ton style est chaleureux, professionnel, " +
          "elegant, naturel et concis. Tu sais saluer, rassurer, conseiller et orienter le client avant de reserver. " +
          "Tu peux poser une question a la fois quand une information manque. " +
          "Tu extrais aussi les informations utiles, en francais, sans inventer de service. " +
          "Quand le client demande seulement un conseil ou une information, reponds vraiment a sa question avant de proposer une reservation. " +
          "Si le client hesite, recommande un service du catalogue en expliquant simplement pourquoi. " +
          "Les seuls creneaux acceptes sont 09:00, 11:00, 14:00 et 16:00. " +
          "Si l'utilisateur donne une heure differente, place-la dans creneauDemande et laisse heure a null. " +
          "Si la demande est relative, calcule la date avec la date du jour fournie. " +
          "Ne dis jamais qu'un rendez-vous est definitivement confirme : le serveur verifiera les disponibilites et le paiement.",
      },
      ...formaterHistorique(historique),
      {
        role: "user",
        content: JSON.stringify({
          dateAujourdhui,
          catalogueServices: catalogue,
          contexteActuel: contexte,
          messageClient: message,
        }),
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "analyse_assistant_fmc_style",
        strict: true,
        schema: schemaAssistant,
      },
    },
  });

  return JSON.parse(response.output_text);
};

const analyserAvecRegles = async ({ message, contexte, services }) => {
  const service = identifierServiceLocal(message, services);
  const date = extraireDate(message);
  const heure = extraireHeure(message);
  const intention = detecterIntentionLocale(message);

  return {
    intention,
    serviceId: service?.id || null,
    serviceNom: service?.nom || null,
    date,
    heure,
    creneauDemande: heure,
    besoinClient: null,
    suggestions: services.slice(0, 3).map((item) => item.nom),
    informationsManquantes: [],
    prochaineAction: "repondre_info",
    reponse: "",
  };
};

const normaliserAnalyse = ({ analyse, message, contexte, services }) => {
  const serviceParId = analyse.serviceId ? services.find((service) => Number(service.id) === Number(analyse.serviceId)) : null;
  const serviceParNom = analyse.serviceNom ? identifierServiceLocal(analyse.serviceNom, services) : null;
  const serviceParMessage = identifierServiceLocal(message, services);
  const service = serviceParId || serviceParNom || serviceParMessage;

  return {
    ...analyse,
    serviceId: service?.id || contexte.serviceId || null,
    serviceNom: service?.nom || analyse.serviceNom || null,
    date: analyse.date || extraireDate(message) || contexte.date || null,
    heure: CRENEAUX_FIXES.includes(analyse.heure) ? analyse.heure : extraireHeure(message) || contexte.heure || null,
    besoinClient: analyse.besoinClient || contexte.besoinClient || null,
    suggestions: analyse.suggestions || [],
  };
};

const finaliserReponseMetier = async ({ analyse }) => {
  const contexte = {
    serviceId: analyse.serviceId,
    date: analyse.date,
    heure: analyse.heure,
    besoinClient: analyse.besoinClient || null,
    derniereIntention: analyse.intention,
  };

  if (analyse.intention === "salutation" && !contexte.serviceId) {
    return {
      reponse:
        analyse.reponse ||
        "Bonjour, je suis Aura, votre conciergerie FMC Style. Je peux vous conseiller un soin, presenter nos tarifs ou vous aider a prendre rendez-vous. Qu'est-ce qui vous ferait plaisir aujourd'hui ?",
      contexte,
      donneesStructurees: { ...analyse, prochaineAction: "repondre_info", informationsManquantes: [] },
    };
  }

  if (analyse.intention === "hors_sujet") {
    return {
      reponse:
        analyse.reponse ||
        "Je suis surtout la pour vous accompagner sur les soins FMC Style : services, conseils beaute, disponibilites et rendez-vous. Souhaitez-vous que je vous aide a choisir un rituel ?",
      contexte,
      donneesStructurees: { ...analyse, prochaineAction: "repondre_info", informationsManquantes: [] },
    };
  }

  if (analyse.intention === "modification" || analyse.intention === "annulation") {
    return {
      reponse:
        analyse.reponse ||
        "Bien sur. Pour modifier ou annuler un rendez-vous, ouvrez votre espace client afin de retrouver la reservation concernee. Je peux aussi vous aider a choisir un nouveau creneau.",
      contexte,
      donneesStructurees: { ...analyse, prochaineAction: "repondre_info", informationsManquantes: [] },
    };
  }

  if (analyse.intention === "information_services" && !contexte.date && !contexte.heure) {
    return {
      reponse:
        analyse.reponse ||
        "Nous proposons notamment les tresses signature, le soin du visage eclat et la manucure spa. Si vous me dites l'occasion, votre style ou le temps disponible, je peux vous orienter vers le soin le plus adapte.",
      contexte,
      donneesStructurees: { ...analyse, prochaineAction: "repondre_info", informationsManquantes: [] },
    };
  }

  if (!contexte.serviceId) {
    return {
      reponse:
        "Avec plaisir. Quel service souhaitez-vous reserver ? Par exemple : tresses signature, soin du visage eclat ou manucure spa.",
      contexte,
      donneesStructurees: { ...analyse, prochaineAction: "demander_service", informationsManquantes: ["service"] },
    };
  }

  if (!contexte.date) {
    return {
      reponse: "Tres bon choix. Pour quelle date souhaitez-vous venir ? Vous pouvez dire demain ou ecrire une date au format YYYY-MM-DD.",
      contexte,
      donneesStructurees: { ...analyse, prochaineAction: "demander_date", informationsManquantes: ["date"] },
    };
  }

  const disponibilites = await trouverDisponibilites({ date: contexte.date, serviceId: contexte.serviceId });
  const creneauxDisponibles = disponibilites.creneaux.filter((creneau) => creneau.disponible).map((creneau) => creneau.heure);

  if (!contexte.heure) {
    const proposition = creneauxDisponibles.length ? creneauxDisponibles.join(", ") : "aucun creneau disponible";
    return {
      reponse: `Pour cette date, voici les creneaux disponibles : ${proposition}. Quelle heure preferez-vous ?`,
      contexte,
      donneesStructurees: { ...analyse, prochaineAction: "proposer_creneaux", informationsManquantes: ["heure"] },
    };
  }

  const creneauChoisi = disponibilites.creneaux.find((creneau) => creneau.heure === contexte.heure);
  if (!creneauChoisi?.disponible) {
    const alternative = creneauxDisponibles[0];
    return {
      reponse: alternative
        ? `Le creneau ${contexte.heure} n'est plus disponible. Je peux vous proposer ${alternative}.`
        : "Tous les creneaux sont deja pris pour cette date. Souhaitez-vous choisir une autre date ?",
      contexte: { ...contexte, heure: null },
      donneesStructurees: { ...analyse, heure: null, prochaineAction: "proposer_creneaux", informationsManquantes: ["heure"] },
    };
  }

  return {
    reponse:
      analyse.reponse ||
      "Parfait. J'ai les informations principales. Vous pouvez confirmer la reservation et ajouter vos photos d'inspiration si besoin.",
    contexte,
    donneesStructurees: { ...analyse, prochaineAction: "pret_a_reserver", informationsManquantes: [] },
  };
};

const repondreAssistant = async ({ message, contexte = {}, historique = [] }) => {
  const services = await Service.findAll({ where: { estActif: true } });
  let analyse = null;
  let source = "openai";

  try {
    analyse = await analyserAvecOpenAI({ message, contexte, historique, services });
  } catch (erreur) {
    console.error("OpenAI indisponible, fallback regles :", erreur.message);
  }

  if (!analyse) {
    source = "regles";
    analyse = await analyserAvecRegles({ message, contexte, services });
  }

  const analyseNormalisee = normaliserAnalyse({ analyse, message, contexte, services });
  const resultat = await finaliserReponseMetier({ analyse: analyseNormalisee });

  return { ...resultat, source };
};

module.exports = { repondreAssistant };
