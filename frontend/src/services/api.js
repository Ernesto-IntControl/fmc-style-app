const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getToken = () => localStorage.getItem("jeton");

const request = async (chemin, options = {}) => {
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    ...options.headers,
  };

  const reponse = await fetch(`${API_URL}${chemin}`, { ...options, headers });
  const contenu = await reponse.json().catch(() => ({}));

  if (!reponse.ok) {
    throw new Error(contenu.message || "Une erreur est survenue");
  }

  return contenu;
};

export const api = {
  get: (chemin) => request(chemin),
  post: (chemin, body) => request(chemin, { method: "POST", body: JSON.stringify(body) }),
  put: (chemin, body) => request(chemin, { method: "PUT", body: JSON.stringify(body) }),
  delete: (chemin) => request(chemin, { method: "DELETE" }),
  upload: (chemin, formData) => request(chemin, { method: "POST", body: formData }),
};
