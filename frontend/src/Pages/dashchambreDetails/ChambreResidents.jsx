import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Chip from "@mui/joy/Chip";
import profil from "../../Images/profRes.png";
import axios from "axios";

export default function ChambreResidents({ resident }) {
  console.log(resident.id);

  const [showModal, setShowModal] = React.useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8080/resident/${resident.id}/deletechambre`,
        {}
      );
      console.log(response);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error during request:", error.response || error.message);

      let errorMessage = "An error occurred during the request.";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "This resident is not associated with a room.";
            break;
          case 500:
            errorMessage = "An error occurred on the server.";
            break;
          default:
            errorMessage = error.response.data.detail || errorMessage;
            break;
        }
      }
      alert(errorMessage); // You can use a better error display mechanism here.
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        marginTop: "10px",
        left: "-17px",
      }}
    >
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          right: "-32px",
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={100} sx={{ minWidth: 182 }}>
          <img
            src={profil}
            loading="lazy"
            alt={`${resident.firstNameResident} ${resident.lastNameResident}`}
          />
        </AspectRatio>
        <CardContent>
          <Typography sx={{ fontSize: "xl", fontWeight: "lg" }}>
            {resident.firstNameResident} {resident.lastNameResident}
          </Typography>

          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="h5" sx={{ fontWeight: "lg" }}>
                Telephone
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>
                <Chip>{resident.telephone}</Chip>
              </Typography>
            </div>

            <div>
              <Typography level="h5" sx={{ fontWeight: "lg" }}>
                Payment status
              </Typography>

              {resident.statusPayment && resident.statusPayment !== "Paid" ? (
                <Chip
                  size="lg"
                  color="warning"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                >
                  {resident.statusPayment}
                </Chip>
              ) : (
                <Chip
                  size="lg"
                  color="success"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                >
                  {resident.statusPayment}
                </Chip>
              )}
            </div>
            <div>
              <Typography level="h5" sx={{ fontWeight: "lg" }}>
                Delete Resident
              </Typography>
              <Button size="sm" color="warning" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Sheet>
        </CardContent>
      </Card>

      {/* Modal for deletion confirmation */}
      <Modal open={showModal} onClose={handleDeleteCancel}>
        <ModalDialog>
          <Typography level="h5">Are you sure?</Typography>
          <Typography level="body2" sx={{ mt: 1, mb: 2 }}>
            Are you sure you want to delete this resident from this room? This
            action cannot be undone.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={handleDeleteCancel} color="neutral">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="warning">
              Confirm
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
