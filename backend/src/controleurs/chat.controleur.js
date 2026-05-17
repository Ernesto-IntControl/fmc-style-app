const { Conversation } = require("../modeles");
const { repondreAssistant } = require("../services/chat.service");

const discuter = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400);
      throw new Error("Le message est obligatoire");
    }

    let conversation = await Conversation.findOne({
      where: { utilisateurId: req.utilisateur.id },
      order: [["modifieLe", "DESC"]],
    });
    if (!conversation) {
      conversation = await Conversation.create({ utilisateurId: req.utilisateur.id, messages: [], contexte: {} });
    }

    const historique = conversation.messages.slice(-12);
    const resultat = await repondreAssistant({ message, contexte: conversation.contexte, historique });
    const messages = [...conversation.messages];
    messages.push({ expediteur: "utilisateur", contenu: message, dateMessage: new Date() });
    messages.push({
      expediteur: "assistant",
      contenu: resultat.reponse,
      dateMessage: new Date(),
      donneesStructurees: resultat.donneesStructurees,
    });
    await conversation.update({ messages, contexte: resultat.contexte });

    res.json({
      reponse: resultat.reponse,
      contexte: resultat.contexte,
      source: resultat.source,
      donneesStructurees: resultat.donneesStructurees,
      conversation,
    });
  } catch (erreur) {
    next(erreur);
  }
};

module.exports = { discuter };
