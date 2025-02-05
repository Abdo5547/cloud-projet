/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { List, ListItem } from "@mui/joy";
import {
  ListItemText,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ModalIncidents from "./ModalIncidents.jsx";
import ModalAddTechnicien from "./ModalAddTechnicien.jsx";
import { Cancel } from "@mui/icons-material";
import axios from "axios";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Exemple de Hook personnalisé pour gérer la sélection

export default function OrderTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = React.useState(false);
  const [isAddTechnicienModalOpen, setIsAddTechnicienModalOpen] =React.useState(false);
  const [technicianIncidents, setTechnicianIncidents] = React.useState<
    {
      incidentid: number;
      description: string;
      dateAlert: string;
      dateResolved: string | null;
    }[]
  >([]);
  const [id, setId] = React.useState("");

  const [showDeleteAlert, setDeleteShowAlert] = React.useState(false);

  interface Admin {
    adminid: number;
    nom: string;
  }


  const handleViewIncidents = (incidents) => {

    console.log("voocienejr :",incidents)

    setTechnicianIncidents(
      incidents.map((incident) => ({
        incidentId: incident.incidentId,
        description: incident.description,
        dateAlert: incident.dateAlert,
        dateResolved: incident.dateResolved,
        status: incident.status,
      }))
    );
    setIsIncidentModalOpen(true);
  };

  const handleAddTechnicien = () => {
    setIsAddTechnicienModalOpen(true);
  };

  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8080/techniciens/listti", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        return response.json();
      })
      .then((data) => setRows(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);
  console.log(rows);



  const handleDeleteTechnicien = async (): Promise<void> => {
    console.log(id);
    // Récupérer le token (par exemple, depuis le localStorage ou un contexte)
    const token = localStorage.getItem("token"); // Remplacez cela par la méthode appropriée pour obtenir le token

    try {
      const response = await axios.delete(
        `http://localhost:8080/techniciens/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans les en-têtes
          },
        }
      );

      console.log("Réponse de l'API:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      // Gérez les erreurs ici
    }
  };



  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

const handleDelete = (id: React.SetStateAction<string>) => {
  setId(id);
  setIsDeleteModalOpen(true);  // Ouvre le modal de confirmation
};

const handleDeleteConfirm = () => {
  setIsDeleteModalOpen(false);
  handleDeleteTechnicien();  // Exécute la suppression
};

const handleDeleteCancel = () => {
  setIsDeleteModalOpen(false);  // Ferme le modal sans supprimer
};


  return (
    <>

    {/* Modal pour la suppression */}
    <Modal open={isDeleteModalOpen} onClose={handleDeleteCancel}>
      <ModalDialog aria-labelledby="delete-modal" sx={{ width: 400 }}>
        <ModalClose />
        <Typography level="h2" id="delete-modal" sx={{ mb: 2 }}>
          Are you sure you want to delete this technician?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" color="neutral" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button
            color="warning"
            onClick={() => {
              handleDeleteConfirm();
            }}
          >
            Confirm
          </Button>
        </Box>
      </ModalDialog>
    </Modal>


      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}>
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}>
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}>
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for technicien</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        <FormControl size="sm">
          <Button
            size="sm"
            sx={{ marginTop: "23px" }}
            color="primary"
            onClick={() => handleAddTechnicien()}>
            + Add technicien
          </Button>
        </FormControl>
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}>
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}>
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "#fef0f2",
                  width: 48,
                  textAlign: "center",
                  padding: "12px 6px",
                }}>
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked
                        ? rows.map((row) => row.id.toString())
                        : []
                    );
                  }}
                  color={selected.length > 0 ? "warning" : undefined}
                />
              </th>
              <th
                style={{
                  width: 80,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                <Link
                  underline="none"
                  color="warning"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    },
                    order === "desc"
                      ? { "& svg": { transform: "rotate(0deg)" } }
                      : { "& svg": { transform: "rotate(180deg)" } },
                  ]}>
                  ID
                </Link>
              </th>
              <th
                style={{
                  width: 100,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Name
              </th>
              <th
                style={{
                  width: 100,
                  padding: "15px 10px",
                  backgroundColor: "#fef0f2",
                }}>
                Speciality
              </th>
              <th
                style={{
                  width: 100,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Telephone
              </th>
              <th
                style={{
                  width: 140,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Incidents Resolved
              </th>
              <th
                style={{
                  width: 120,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Delete Technicien
              </th>

              <th
                style={{
                  width: 140,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Admin
              </th>
            </tr>
          </thead>
          <tbody>
            {[...rows].sort(getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center" }}>
                  <Checkbox
                    size="sm"
                    color="warning"
                    checked={selected.includes(row.id.toString())}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id.toString())
                          : ids.filter((itemId) => itemId !== row.id.toString())
                      );
                    }}
                  />
                </td>
                <td>{row.id}</td>
                <td>
                  {row.lastName} {row.fistName}{" "}
                </td>
                <td>{row.speciality}</td>
                <td>{row.telephone}</td>

                <td>
                  {row.incidents[0] && (
                    <Button
                      size="sm"
                      onClick={() => handleViewIncidents(row.incidents)}>
                      +Voir Incident
                    </Button>
                  )}
                </td>
                <td>
                  {" "}
                  <Button
                    size="sm"
                    startDecorator={<Cancel />}
                    onClick={() => handleDelete(row.id)}
                    color="warning">
                    Delete
                  </Button>
                </td>
                <td>
                  {row.adminFirstName} {row.adminLastName}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isIncidentModalOpen && (
          <ModalIncidents
            open={isIncidentModalOpen}
            onClose={() => setIsIncidentModalOpen(false)}
            incidents={technicianIncidents}
          />
        )}

        {isAddTechnicienModalOpen && (
          <ModalAddTechnicien
            open={isAddTechnicienModalOpen}
            onClose={() => setIsAddTechnicienModalOpen(false)}
          />
        )}
         
      </Sheet>
    </>
  );
}
