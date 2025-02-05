import React from "react";

const RoomDetails = (room,detailsRoom) => {
  return (
    <>
      <div className=" col-md-6 col-lg-4 wow fadeInUp overflow-y-auto h-full py-4">
        <div
          style={{
            flex: 1,
            marginLeft: "20px",
            width: "79%",
            marginRight: "20px",
            paddingRight: "50px",
            paddingTop: "50px",
            paddingLeft: "50px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}>
          <div style={{ display: "flex", width: "100%",marginBottom:"50px" }}>
            <div style={{ flex: 1, paddingRight: "20px" }}>
              <div className="card-img-container">
              </div>
            </div>
            <div style={{ flex: 1, paddingLeft: "40px" }}>
              <ul className="mb-4">
                <li>
                  <strong>Taille:</strong> 35 m²
                </li>
                <li>
                  <strong>Équipements:</strong> Lit King size, grand bureau,
                  canapé, mini-réfrigérateur, balcon privé
                </li>
                <li>
                  <strong>Connexion:</strong> Wi-Fi haut débit, TV 4K avec
                  services de streaming
                </li>
                <li>
                  <strong>Vue:</strong> Vue sur la mer ou le parc
                </li>
                <li>
                  <strong>Prix:</strong> 750€ par mois
                </li>
              </ul>
              <div
                style={{ marginBottom: "10px", marginLeft: "-5px" }}
                className="btn-group dropend">
                <button
                  type="button"
                  className="btn btn-secondary bg-warning"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Chamber Member
                </button>
              </div>

              <div style={{ marginBottom: "20px" }}>Chambre numéro</div>

              <div style={{ paddingRight: "20px" }}>Price : 22594$</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                marginTop: "10px",
                marginBottom: "10px",
              }}>
              <button
                className="btn btn-success"
                style={{
                  margin: "5px",
                  color: "white",
                  backgroundColor: "#28a745", // Couleur verte pour success
                  border: "1px solid #28a745",
                  padding: "5px 10px", // Espacement interne pour le bouton
                  borderRadius: "5px", // Coins arrondis
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Ombre légère
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                ajouter membre
              </button>
            </div>
            <div
              style={{
                margin: "5px",
                color: "white",
                backgroundColor: "#3925ea", // Couleur verte pour success
                border: "2px solid #28a745",
                padding: "5px 10px", // Espacement interne pour le bouton
                borderRadius: "5px", // Coins arrondis
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Ombre légère
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <button className="btn btn-info" style={{ margin: "10px" }}>
                modifier chambre
              </button>
            </div>
            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <button
                className="btn btn-danger"
                style={{
                  margin: "5px",
                  color: "white",
                  backgroundColor: "#f15f1b", // Couleur verte pour success
                  border: "2px solid #e24e2e",
                  padding: "5px 10px", // Espacement interne pour le bouton
                  borderRadius: "5px", // Coins arrondis
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Ombre légère
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                Delete Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
