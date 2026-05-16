import { useState } from "react";
import { sendChatMessage } from "../services/appointmentService";

function ChatAssistant({ setPage }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", texte: "Bonjour, je suis votre conciergerie FMC Style. Comment puis-je vous sublimer aujourd'hui ?" },
  ]);
  const [chargement, setChargement] = useState(false);

  const envoyer = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    const texte = message.trim();
    setMessage("");
    setMessages((actuels) => [...actuels, { role: "user", texte }]);
    setChargement(true);

    try {
      const reponse = await sendChatMessage(texte);
      setMessages((actuels) => [...actuels, { role: "assistant", texte: reponse.reponse }]);
    } catch (error) {
      setMessages((actuels) => [...actuels, { role: "assistant", texte: error.message }]);
    } finally {
      setChargement(false);
    }
  };

  return (
    <section className="chat-page">
      <div>
        <p className="eyebrow">Experience personnalisee</p>
        <h1>Votre assistante de beaute</h1>
        <p>
          Demandez simplement : "Je veux faire des tresses demain a 09h". L'assistant identifie le service, la date et
          les informations manquantes.
        </p>
        <button className="btn-primary" onClick={() => setPage("booking")}>
          Continuer vers la reservation
        </button>
      </div>
      <div className="chat-shell">
        <div className="chat-header">
          <p className="eyebrow">Conciergerie virtuelle</p>
          <h2>Aura</h2>
        </div>
        <div className="messages">
          {messages.map((item, index) => (
            <div key={`${item.role}-${index}`} className={`message ${item.role}`}>
              {item.texte}
            </div>
          ))}
          {chargement && <div className="message">Aura prepare sa reponse...</div>}
        </div>
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
