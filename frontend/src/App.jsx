import { useMemo, useState } from "react";
import "./App.css";
import ClientLayout from "./components/ClientLayout";
import PublicLayout from "./components/PublicLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Promotions from "./pages/Promotions";
import BlogConseils from "./pages/BlogConseils";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatAssistant from "./pages/ChatAssistant";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import ClientDashboard from "./pages/ClientDashboard";
import ClientAppointments from "./pages/ClientAppointments";
import ClientInspirations from "./pages/ClientInspirations";
import ClientHistory from "./pages/ClientHistory";
import ClientProfile from "./pages/ClientProfile";
import ClientSupport from "./pages/ClientSupport";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeePlanning from "./pages/EmployeePlanning";
import { getCurrentUser, logout } from "./services/authService";

const routesPrivees = [
  "booking",
  "payment",
  "confirmation",
  "client",
  "client-appointments",
  "client-inspirations",
  "client-history",
  "client-profile",
  "client-support",
  "admin",
  "employee",
];

const pagesClient = [
  "client",
  "client-appointments",
  "client-inspirations",
  "client-history",
  "client-profile",
  "client-support",
  "booking",
  "payment",
  "confirmation",
];

function App() {
  const [page, setPage] = useState("home");
  const [utilisateur, setUtilisateur] = useState(getCurrentUser());
  const [reservation, setReservation] = useState(null);
  const pageCourante = routesPrivees.includes(page) && !utilisateur ? "login" : page;

  const contexte = useMemo(
    () => ({
      page: pageCourante,
      setPage,
      utilisateur,
      setUtilisateur,
      reservation,
      setReservation,
    }),
    [pageCourante, utilisateur, reservation]
  );

  const deconnecter = () => {
    logout();
    setUtilisateur(null);
    setPage("home");
  };

  const pages = {
    home: <Home {...contexte} />,
    services: <Services {...contexte} />,
    promotions: <Promotions {...contexte} />,
    blog: <BlogConseils {...contexte} />,
    about: <About {...contexte} />,
    login: <Login {...contexte} />,
    register: <Register {...contexte} />,
    chat: <ChatAssistant {...contexte} />,
    booking: <Booking {...contexte} />,
    payment: <Payment {...contexte} />,
    confirmation: <Confirmation {...contexte} />,
    client: <ClientDashboard {...contexte} />,
    "client-appointments": <ClientAppointments {...contexte} />,
    "client-inspirations": <ClientInspirations {...contexte} />,
    "client-history": <ClientHistory {...contexte} />,
    "client-profile": <ClientProfile {...contexte} />,
    "client-support": <ClientSupport {...contexte} />,
    admin: <AdminDashboard {...contexte} />,
    employee: <EmployeePlanning {...contexte} />,
  };

  const contenu = pages[pageCourante] || pages.home;
  const estClientConnecte = utilisateur?.role === "client";
  const estPageClient = estClientConnecte && (pagesClient.includes(pageCourante) || pageCourante === "chat");

  if (pageCourante === "admin" || pageCourante === "employee") {
    return <main className="staff-main">{contenu}</main>;
  }

  if (estPageClient) {
    return (
      <ClientLayout page={pageCourante} setPage={setPage} utilisateur={utilisateur} deconnecter={deconnecter}>
        {contenu}
      </ClientLayout>
    );
  }

  return (
    <PublicLayout page={pageCourante} setPage={setPage} utilisateur={utilisateur} deconnecter={deconnecter}>
      {contenu}
    </PublicLayout>
  );
}

export default App;
