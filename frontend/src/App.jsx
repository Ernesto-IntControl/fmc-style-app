import { useMemo, useState } from "react";
import "./App.css";
import AdminLayout from "./components/AdminLayout";
import ClientLayout from "./components/ClientLayout";
import EmployeeLayout from "./components/EmployeeLayout";
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
import AdminAppointments from "./pages/AdminAppointments";
import AdminPlanning from "./pages/AdminPlanning";
import AdminServices from "./pages/AdminServices";
import AdminEmployees from "./pages/AdminEmployees";
import AdminPromotions from "./pages/AdminPromotions";
import AdminClients from "./pages/AdminClients";
import AdminPayments from "./pages/AdminPayments";
import AdminNotifications from "./pages/AdminNotifications";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import AdminSupport from "./pages/AdminSupport";
import EmployeePlanning from "./pages/EmployeePlanning";
import EmployeeAppointments from "./pages/EmployeeAppointments";
import EmployeeClients from "./pages/EmployeeClients";
import EmployeeInspirations from "./pages/EmployeeInspirations";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeeSupport from "./pages/EmployeeSupport";
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
  "admin-appointments",
  "admin-planning",
  "admin-services",
  "admin-employees",
  "admin-promotions",
  "admin-clients",
  "admin-payments",
  "admin-notifications",
  "admin-reports",
  "admin-settings",
  "admin-support",
  "employee",
  "employee-appointments",
  "employee-clients",
  "employee-inspirations",
  "employee-profile",
  "employee-support",
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

const pagesAdmin = [
  "admin",
  "booking",
  "payment",
  "confirmation",
  "admin-appointments",
  "admin-planning",
  "admin-services",
  "admin-employees",
  "admin-promotions",
  "admin-clients",
  "admin-payments",
  "admin-notifications",
  "admin-reports",
  "admin-settings",
  "admin-support",
];

const pagesEmploye = [
  "employee",
  "employee-appointments",
  "employee-clients",
  "employee-inspirations",
  "employee-profile",
  "employee-support",
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
    "admin-appointments": <AdminAppointments {...contexte} />,
    "admin-planning": <AdminPlanning {...contexte} />,
    "admin-services": <AdminServices {...contexte} />,
    "admin-employees": <AdminEmployees {...contexte} />,
    "admin-promotions": <AdminPromotions {...contexte} />,
    "admin-clients": <AdminClients {...contexte} />,
    "admin-payments": <AdminPayments {...contexte} />,
    "admin-notifications": <AdminNotifications {...contexte} />,
    "admin-reports": <AdminReports {...contexte} />,
    "admin-settings": <AdminSettings {...contexte} />,
    "admin-support": <AdminSupport {...contexte} />,
    employee: <EmployeePlanning {...contexte} />,
    "employee-appointments": <EmployeeAppointments {...contexte} />,
    "employee-clients": <EmployeeClients {...contexte} />,
    "employee-inspirations": <EmployeeInspirations {...contexte} />,
    "employee-profile": <EmployeeProfile {...contexte} />,
    "employee-support": <EmployeeSupport {...contexte} />,
  };

  const contenu = pages[pageCourante] || pages.home;
  const estClientConnecte = utilisateur?.role === "client";
  const estPageClient = estClientConnecte && (pagesClient.includes(pageCourante) || pageCourante === "chat");
  const estAdminConnecte = utilisateur?.role === "admin";
  const estEmployeConnecte = utilisateur?.role === "employe" || utilisateur?.role === "employee";

  if (estAdminConnecte && pagesAdmin.includes(pageCourante)) {
    return (
      <AdminLayout page={pageCourante} setPage={setPage} utilisateur={utilisateur} deconnecter={deconnecter}>
        {contenu}
      </AdminLayout>
    );
  }

  if (estEmployeConnecte && pagesEmploye.includes(pageCourante)) {
    return (
      <EmployeeLayout page={pageCourante} setPage={setPage} utilisateur={utilisateur} deconnecter={deconnecter}>
        {contenu}
      </EmployeeLayout>
    );
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
