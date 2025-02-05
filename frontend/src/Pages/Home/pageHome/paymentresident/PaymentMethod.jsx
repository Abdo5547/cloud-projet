import React, { useState } from "react";
import "./m.css";
import mst from "./mst.png";
import { Add } from "@mui/icons-material";
import AddCardModal from "./AddCardModal";

const PaymentMethod = ({ info }) => {



  
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Vérification : info doit être un tableau
  if (!Array.isArray(info)) {
    return (
      <div className="col-md-12 mb-lg-0 mb-4">
        <div className="card mt-4" style={{ width: "1000px" }}>
          <div className="card-header pb-0 p-3">
            <h6 className="mb-0">Payment Method</h6>
          </div>
          <div className="card-body p-3">
            <p>Aucune méthode de paiement disponible.</p>
          </div>
        </div>
        <AddCardModal open={openModal} onClose={handleCloseModal} />
      </div>
    );
  }

  return (
    <div className="col-md-12 mb-lg-0 mb-4">
      <div className="card mt-4" style={{ width: "1000px" }}>
        <div className="card-header pb-0 p-3">
          <div className="row">
            <div className="col-6 d-flex align-items-center">
              <h6 className="mb-0">Payment Method</h6>
            </div>
            <div className="col-6 text-end">
              <button
                onClick={handleOpenModal}
                className="btn mb-0 text-white"
                style={{ backgroundColor: "#2f1fd6" }}>
                <Add /> Add Card
              </button>
            </div>
          </div>
        </div>
        <div className="card-body p-3">
          <div className="row">
            {info.map((card, index) => (
              <div key={index} className="col-md-6 mb-md-0 mb-4">
                <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                  <img className="w-10 me-3 mb-0" src={mst} alt="logo" />
                  <h6 className="mb-0">
                    ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;{" "}
                    {card.cardNumber.slice(-4)}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddCardModal open={openModal} onClose={handleCloseModal} />
    </div>
  );
};

export default PaymentMethod;
