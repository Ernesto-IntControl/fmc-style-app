import { api } from "./api";

export const getServices = () => api.get("/services");
export const getAvailability = ({ date, serviceId }) => api.get(`/availability?date=${date}&serviceId=${serviceId}`);
export const createAppointment = (donnees) => api.post("/appointments", donnees);
export const getMyAppointments = () => api.get("/appointments/my");
export const getAllAppointments = () => api.get("/appointments");
export const payAppointment = (donnees) => api.post("/payments", donnees);
export const sendChatMessage = (message) => api.post("/chat", { message });
