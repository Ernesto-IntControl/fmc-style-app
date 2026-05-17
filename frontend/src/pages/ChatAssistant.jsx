import { useState } from "react";
import { sendChatMessage } from "../services/appointmentService";

function ChatAssistant({ setPage, utilisateur }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", texte: "Bonjour, je suis la conciergerie FMC Style. Comment puis-je vous accompagner aujourd'hui ?" },
  ]);
  const [suggestions, setSuggestions] = useState([
    "Tresses",
    "Maquillage",
    "Manucure",
    "Soins visage",
  ]);
  const [chargement, setChargement] = useState(false);

  const envoyerMessage = async (texte) => {
    if (!texte.trim()) return;

    setMessage("");
    setSuggestions([]);
    setMessages((actuels) => [...actuels, { role: "user", texte }]);
    setChargement(true);

    try {
      const reponse = await sendChatMessage(texte);
      setMessages((actuels) => [...actuels, { role: "assistant", texte: reponse.reponse }]);
      setSuggestions(reponse.donneesStructurees?.suggestions || []);
    } catch (error) {
      setMessages((actuels) => [...actuels, { role: "assistant", texte: error.message }]);
    } finally {
      setChargement(false);
    }
  };

  const envoyer = async (event) => {
    event.preventDefault();
    await envoyerMessage(message.trim());
  };

  return (
    <section className="chat-page">
      <div className="chat-intro">
        <p className="eyebrow">{utilisateur ? "Reservation personnalisee" : "Conciergerie virtuelle"}</p>
        <h1>{utilisateur ? "Assistant virtuel" : "Votre experience personnalisee"}</h1>
        <p>
          Demandez un conseil, indiquez un service ou formulez une demande naturelle. La conciergerie vous guide vers le
          bon soin et le bon creneau.
        </p>
        <button className="btn-primary" type="button" onClick={() => setPage(utilisateur ? "booking" : "login")}>
          Continuer vers la reservation
        </button>
      </div>
      <div className="chat-shell">
        <div className="chat-header">
          <p className="eyebrow">Conciergerie virtuelle</p>
          <h2>FMC Concierge</h2>
        </div>
        <div className="messages">
          {messages.map((item, index) => (
            <div key={`${item.role}-${index}`} className={`message ${item.role}`}>
              {item.texte}
            </div>
          ))}
          {chargement && <div className="message">La conciergerie prepare sa reponse...</div>}
        </div>
        {suggestions.length > 0 && (
          <div className="chat-suggestions">
            {suggestions.slice(0, 3).map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => envoyerMessage(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
        )}
        <form className="chat-form" onSubmit={envoyer}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ecrivez votre message..." />
          <button className="btn-dark" type="submit">
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChatAssistant;
