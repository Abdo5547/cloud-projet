import axios from "axios";

const API_URL = "http://localhost:8080/a/alogin";  // Corriger le double slash dans l'URL

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });

    if (response.data) {
      console.log(response.data);

      const { token, role } = response.data; 

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

      }
    }
    return response.data;
  } catch (error) {
    console.error("Login error: ", error);
    alert("Erreur de connexion. Veuillez vérifier vos informations.");
    return null;
  }
};


const logout = () => {
  // Retirer les éléments de localStorage pour déconnecter l'utilisateur
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  // Redirection vers la page de connexion après déconnexion
  window.location.href = "/login";
};

const getToken = () => {
  return localStorage.getItem("token");
};

export default { login, logout, getToken };
