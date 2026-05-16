import { api } from "./api";

export const saveSession = ({ utilisateur, jeton }) => {
  localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
  localStorage.setItem("jeton", jeton);
};

export const getCurrentUser = () => {
  const brut = localStorage.getItem("utilisateur");
  return brut ? JSON.parse(brut) : null;
};

export const login = async (donnees) => {
  const session = await api.post("/auth/login", donnees);
  saveSession(session);
  return session.utilisateur;
};

export const register = async (donnees) => {
  const session = await api.post("/auth/register", donnees);
  saveSession(session);
  return session.utilisateur;
};

export const logout = () => {
  localStorage.removeItem("utilisateur");
  localStorage.removeItem("jeton");
};
