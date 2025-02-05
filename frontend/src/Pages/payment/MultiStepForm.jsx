import React, { useState } from "react";
import Etap1 from "./Etap1";  // Assurez-vous que ce fichier est bien importé.
import Etap2 from "./Etap2";  // Formulaire de l'étape 2
import Etap3 from "./Etap3";  // Formulaire de l'étape 3

const MultiStepForm = () => {
  const [step, setStep] = useState(1);  // Étape actuelle
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    motDePasse: "",
    // Ajoutez ici les autres champs des étapes suivantes
  });

  // Mise à jour des données à chaque étape
  const handleNext = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Lorsque l'utilisateur termine toutes les étapes, on peut collecter les données dans un objet
  const handleDownload = () => {
    // Créez un fichier JSON avec les données collectées
    const data = new Blob([JSON.stringify(formData)], { type: "application/json" });
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formData.json";
    a.click();
  };

  return (
    <div>
      {step === 1 && <Etap1 onNext={handleNext} formData={formData} />}
      {step === 2 && <Etap2 onNext={handleNext} onPrevious={handlePrevious} formData={formData} />}
      {step === 3 && <Etap3 onNext={handleNext} onPrevious={handlePrevious} formData={formData} />}
      {step === 4 && (
        <div>
          <h2>Formulaire complet</h2>
          <button onClick={handleDownload}>Télécharger les données</button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
