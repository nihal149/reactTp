import React, { useState, useEffect } from "react";
import "./CompteManager.css";



const API_URL = "http://localhost:8082/banque";

const CompteManager = () => {
  const [comptes, setComptes] = useState([]);
  const [form, setForm] = useState({ id: null, solde: "", dateCreation: "", type: "COURANT" });
  const [isEditing, setIsEditing] = useState(false);

  // Charger les comptes
  const fetchComptes = async () => {
    try {
      const response = await fetch(`${API_URL}/comptes`);
      const data = await response.json();
      setComptes(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des comptes :", error);
    }
  };

  // Récupérer un compte pour modification
  const editCompte = async (id) => {
    try {
      const response = await fetch(`${API_URL}/comptes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setForm(data);
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du compte :", error);
    }
  };

  // Ajouter ou mettre à jour un compte
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/comptes/${form.id}` : `${API_URL}/comptes`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        fetchComptes();
        setForm({ id: null, solde: "", dateCreation: "", type: "COURANT" });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  };

  // Supprimer un compte
  const deleteCompte = async (id) => {
    try {
      const response = await fetch(`${API_URL}/comptes/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchComptes();
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
    }
  };

  // Gérer les modifications du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Charger les comptes à la montée du composant
  useEffect(() => {
    fetchComptes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestion des Comptes</h1>

      {/* Liste des comptes */}
      <h2>Liste des Comptes</h2>
      <ul>
        {comptes.map((compte) => (
          <li key={compte.id} style={{ marginBottom: "10px" }}>
            <p><strong>Type:</strong> {compte.type}</p>
            <p><strong>Solde:</strong> {compte.solde} MAD</p>
            <p><strong>Date de création:</strong> {new Date(compte.dateCreation).toLocaleDateString()}</p>
            <button onClick={() => editCompte(compte.id)}>Modifier</button>
            <button onClick={() => deleteCompte(compte.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      {/* Formulaire */}
      <h2>{isEditing ? "Modifier un Compte" : "Ajouter un Compte"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Solde:
          <input
            type="number"
            name="solde"
            value={form.solde}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Date de Création:
          <input
            type="date"
            name="dateCreation"
            value={form.dateCreation}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Type:
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="COURANT">COURANT</option>
            <option value="EPARGNE">EPARGNE</option>
          </select>
        </label>
        <br />
        <button type="submit">{isEditing ? "Mettre à jour" : "Ajouter"}</button>
        {isEditing && <button onClick={() => setIsEditing(false)}>Annuler</button>}
      </form>
    </div>
  );
};

export default CompteManager;
