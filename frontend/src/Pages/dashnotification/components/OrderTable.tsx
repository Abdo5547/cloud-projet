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
import ModalTechniciens from "./ModalTechniciens";
import { Close, Done } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { DialogTitle } from "@mui/joy";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: { variant: "plain", color: "neutral", size: "sm" },
        }}>
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = React.useState(false);
  const [technicienList, setTechnicienList] = React.useState<
    {
      technicienId: number;
      speciality: string;
      firstName: string;
      lastName: string;
      telephone: number;
    }[]
  >([]);
  const [statusOrder, setStatusOrder] = React.useState<Order>("asc");
  const [showAcceptAlert, setAcceptShowAlert] = React.useState(false);
  const [showRefuseAlert, setRefuseShowAlert] = React.useState(false);
  const [id, setId] = React.useState("");
  const [residentId, setResidentId] = React.useState("");
  const [chambreId, setChambreId] = React.useState("");

  const navigate = useNavigate();

  const handleAccept = (id, chambreId, residentId) => {
    setChambreId(chambreId);
    setResidentId(residentId);
    setId(id);
    setAcceptShowAlert(true);
  };

  const handleAcceptConfirm = () => {
    setAcceptShowAlert(false);
    handleSubmitAccept();
  };

  const handleAcceptCancel = () => {
    setAcceptShowAlert(false);
  };

  const handleRefuse = (id, chambreId, residentId) => {
    setChambreId(chambreId);
    setResidentId(residentId);
    setId(id);
    setRefuseShowAlert(true);
  };

  const handleRefuseConfirm = () => {
    setRefuseShowAlert(false);
    handleSubmitRefuse();
  };

  const handleRefuseCancel = () => {
    setRefuseShowAlert(false);
  };

  type Order = "asc" | "desc";

  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8080/notifications/allnotifications", {
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
      .then((data) => {
        // Tri des données par date, en supposant que 'date' est le champ contenant la date
        const sortedData = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setRows(sortedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  console.log(rows);

  const handleSubmitRefuse = async () => {
    const updatedData = {
      status: "NotAccepted",
      chambreId: chambreId,
      residentId: residentId,
    };

    // Récupérer le token (par exemple, depuis le localStorage ou un contexte)
    const token = localStorage.getItem("token"); // Remplacez cela par la méthode appropriée pour obtenir le token

    try {
      const response = await axios.put(
        `http://localhost:8080/notifications/${id}/status`,
        updatedData,
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

  const handleSubmitAccept = async () => {
    const updatedData = {
      status: "Accepted",
      chambreId: chambreId,
      residentId: residentId,
    };

    // Récupérer le token (par exemple, depuis le localStorage ou un contexte)
    const token = localStorage.getItem("token"); // Remplacez cela par la méthode appropriée pour obtenir le token

    try {
      const response = await axios.put(
        ` http://localhost:8080/notifications/${id}/status`,

        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans les en-têtes
          },
        }
      );
      window.location.reload();

      console.log("Réponse de l'API:", response.data);
      // Ajoutez votre logique ici pour gérer la réponse
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      // Gérez les erreurs ici
    }
  };

  const statusComparator = (a: string, b: string, order: Order) => {
    const statusOrderMap = {
      Accepted: 1,
      NotAcceped: 2,
      Non: 3,
    };

    // Comparaison selon l'ordre spécifié
    if (statusOrderMap[a] < statusOrderMap[b]) {
      return order === "desc" ? 1 : -1;
    }
    if (statusOrderMap[a] > statusOrderMap[b]) {
      return order === "desc" ? -1 : 1;
    }
    return 0;
  };
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    if (orderBy === "status") {
      return (a, b) =>
        statusComparator(a[orderBy] as string, b[orderBy] as string, order);
    }

    // Utilisez ici la logique pour d'autres colonnes, comme ID
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentAction, setCurrentAction] = React.useState("");

  const handleListTechnicien = () => {
    setIsIncidentModalOpen(true);
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Room</FormLabel>
        <Input
          size="sm"
          placeholder="Room"
          type="number"
          startDecorator={<SearchIcon />}
        />
      </FormControl>

      <FormControl size="sm">
        <Button
          size="sm"
          sx={{ marginTop: "23px" }}
          color="primary"
          onClick={() => setOpen(false)}>
          Submit
        </Button>
      </FormControl>
    </React.Fragment>
  );

  const handlClick = () => setOpenModal(true);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [actionMessage, setActionMessage] = React.useState("");
  const [actionType, setActionType] = React.useState("");

  // Fonction pour fermer le Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleStatusClick = () => {
    const newOrder = statusOrder === "asc" ? "desc" : "asc";
    setStatusOrder(newOrder);
    setRows([...rows].sort(getComparator(newOrder, "status")));
  };

  if (rows.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <h3>Chargement des données...</h3>
      </Box>
    );
  }

  return (
    <React.Fragment>
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
          <FormLabel>Search for Resident</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
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
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? "warning"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th
                style={{
                  width: 40,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                ID
              </th>
              <th
                style={{
                  width: 70,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Status
              </th>
              <th
                style={{
                  width: 80,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Date
              </th>
              <th
                style={{
                  width: 80,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Name resident
              </th>

              <th
                style={{
                  width: 80,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Telephone
              </th>
              <th
                style={{
                  width: 50,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Room ID
              </th>

              <th
                style={{
                  width: 150,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Validation
              </th>
            </tr>
          </thead>
          <tbody>
            {[...rows].sort(getComparator(order, "date")).map((row) => (
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
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>{row.id}</td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Accepted: <CheckRoundedIcon />,
                        Pending: <AutorenewRoundedIcon />,
                        P: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Accepted: "success",
                        NotAccepted: "warning",
                        P: "danger",
                      }[row.status] as ColorPaletteProp
                    }>
                    {row.status}
                  </Chip>
                </td>
                <td>{row.date}</td>
                <td>
                  {row.residentFirstName} {row.residentLastName}
                </td>

                <td>{row.residentTelephone}</td>

                <td>{row.chambreNumber}</td>
                <td>
                  {row.status === "" && (
                    <>
                      <Button
                        size="sm"
                        sx={{ mr: "20px" }}
                        color="success"
                        startDecorator={<Done />}
                        onClick={() =>
                          handleAccept(row.id, row.chambreId, row.residentId)
                        }>
                        Accepter
                      </Button>
                      <Button
                        color="warning"
                        size="sm"
                        startDecorator={<Close />}
                        onClick={() =>
                          handleRefuse(row.id, row.chambreId, row.residentId)
                        }>
                        Refuser
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isIncidentModalOpen && (
          <ModalTechniciens
            open={isIncidentModalOpen}
            onClose={() => setIsIncidentModalOpen(false)}
          />
        )}
      </Sheet>
      {showRefuseAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">
              Are you sure?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to Refuse ? This action cannot be undone.
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <Button onClick={handleRefuseCancel} color="neutral">
                Cancel
              </Button>
              <Button onClick={handleRefuseConfirm}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
      {showAcceptAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">
              Are you sure?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to Accepte ? This action cannot be undone.
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <Button onClick={handleAcceptCancel} color="neutral">
                Cancel
              </Button>
              <Button color="primary" onClick={handleAcceptConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
