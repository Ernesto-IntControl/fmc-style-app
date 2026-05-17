import { api } from "./api";

const fallbackArray = (resultat) => (resultat.status === "fulfilled" && Array.isArray(resultat.value) ? resultat.value : []);

export const getAdminData = async () => {
  const [rendezVous, services, employes, promotions, paiements] = await Promise.allSettled([
    api.get("/appointments"),
    api.get("/services"),
    api.get("/employees"),
    api.get("/promotions"),
    api.get("/payments"),
  ]);

  return {
    rendezVous: fallbackArray(rendezVous),
    services: fallbackArray(services),
    employes: fallbackArray(employes),
    promotions: fallbackArray(promotions),
    paiements: fallbackArray(paiements),
  };
};

export const getAdminAppointments = () => api.get("/appointments");
export const updateAppointmentStatus = (id, donnees) => api.put(`/appointments/${id}/status`, donnees);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

export const getAdminServices = () => api.get("/services");
export const createService = (donnees) => api.post("/services", donnees);
export const updateService = (id, donnees) => api.put(`/services/${id}`, donnees);
export const deleteService = (id) => api.delete(`/services/${id}`);

export const getAdminEmployees = () => api.get("/employees");
export const createEmployee = (donnees) => api.post("/employees", donnees);
export const updateEmployee = (id, donnees) => api.put(`/employees/${id}`, donnees);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export const getAdminPromotions = () => api.get("/promotions");
export const createPromotion = (donnees) => api.post("/promotions", donnees);
export const updatePromotion = (id, donnees) => api.put(`/promotions/${id}`, donnees);
export const deletePromotion = (id) => api.delete(`/promotions/${id}`);

export const getAdminPayments = () => api.get("/payments");
