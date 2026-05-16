import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatAssistant from "./pages/ChatAssistant";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeePlanning from "./pages/EmployeePlanning";
import { getCurrentUser, logout } from "./services/authService";

const routesPrivees = ["booking", "payment", "confirmation", "client", "admin", "employee", "chat"];

function App() {
  const [page, setPage] = useState("home");
  const [utilisateur, setUtilisateur] = useState(getCurrentUser());
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    if (routesPrivees.includes(page) && !utilisateur) {
      setPage("login");
    }
  }, [page, utilisateur]);

  const contexte = useMemo(
    () => ({
      page,
      setPage,
      utilisateur,
      setUtilisateur,
      reservation,
      setReservation,
    }),
    [page, utilisateur, reservation]
  );

  const deconnecter = () => {
    logout();
    setUtilisateur(null);
    setPage("home");
  };

  const pages = {
    home: <Home {...contexte} />,
    services: <Services {...contexte} />,
    login: <Login {...contexte} />,
    register: <Register {...contexte} />,
    chat: <ChatAssistant {...contexte} />,
    booking: <Booking {...contexte} />,
    payment: <Payment {...contexte} />,
    confirmation: <Confirmation {...contexte} />,
    client: <ClientDashboard {...contexte} />,
    admin: <AdminDashboard {...contexte} />,
    employee: <EmployeePlanning {...contexte} />,
  };

  return (
    <>
      <Navbar page={page} setPage={setPage} utilisateur={utilisateur} deconnecter={deconnecter} />
      <main>{pages[page] || pages.home}</main>
      <footer className="footer">
        <strong>FMC STYLE</strong>
        <nav>
          <button onClick={() => setPage("services")}>Services</button>
          <button onClick={() => setPage("chat")}>Conciergerie</button>
          <button onClick={() => setPage("login")}>Connexion</button>
        </nav>
        <small>© 2026 FMC Style Salon. Une experience de beaute moderne.</small>
      </footer>
    </>
  );
}

export default App;
