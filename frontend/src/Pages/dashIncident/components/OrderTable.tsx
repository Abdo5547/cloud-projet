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
import { Check, ResetTvOutlined } from "@mui/icons-material";
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
  const [incidentId, setIncidentId] = React.useState<number | null>(null);
  const [showAcceptAlert, setAcceptShowAlert] = React.useState(false);
  const [id, setId] = React.useState<number | null>(null);

  interface HandleAccept {
    (id: number): void;
  }

  const handleAccept: HandleAccept = (id) => {
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

  interface Technicien {
    technicienId: number;
    speciality: string;
    firstName: string;
    lastName: string;
    telephone: number;
  }

  interface Row {
    id: number;
    status: string;
    dateAlert: string;
    dateResolved: string;
    technicienFirstName?: string;
    technicienLastName?: string;
    chambreNumber: number;
    description: string;
  }

  const handleListTechnicien = (id: number) => {
    setIncidentId(id);
    setIsIncidentModalOpen(true);
  };

  const handleSubmitAccept = async () => {
    const today = new Date().toISOString().split("T")[0];

    const updatedData = {
      newDateResolved: today,
      newStatus: "Resolved",
    };

    const token = localStorage.getItem("token"); // Remplacez cela par la méthode appropriée pour obtenir le token

    try {
      const response = await axios.put(
        `http://localhost:8080/incidents/${id}/dateResolved`,

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

  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8080/incidents/all", {
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
        setRows(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);
  console.log(rows);

  type Order = "asc" | "desc";

  const statusOrderMap = {
    Pending: 1,
    InProgress: 2,
    Resolved: 3,
  };

  const statusComparator = (a: string, b: string, order: Order) => {
    const statusOrderMap = {
      Pending: 3,
      InProgress: 2,
      Resolved: 1,
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

  const handleStatusClick = () => {
    const newOrder = statusOrder === "asc" ? "desc" : "asc";
    setStatusOrder(newOrder);
    setRows([...rows].sort(getComparator(newOrder, "status")));
  };

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
                      event.target.checked ? rows.map((row) => row.id) : []
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
                  width: 100,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                <Link
                  underline="none"
                  color="warning"
                  component="button"
                  onClick={handleStatusClick}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          statusOrder === "asc"
                            ? "rotate(0deg)"
                            : "rotate(180deg)",
                      },
                    },
                    statusOrder === "desc"
                      ? { "& svg": { transform: "rotate(0deg)" } }
                      : { "& svg": { transform: "rotate(180deg)" } },
                  ]}>
                  Status
                </Link>
              </th>
              <th
                style={{
                  width: 100,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Start date
              </th>
              <th
                style={{
                  width: 100,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                End date
              </th>
              <th
                style={{
                  width: 100,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Technicien name
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
                  width: 140,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Description
              </th>
              <th
                style={{
                  width: 140,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Change Status
              </th>
            </tr>
          </thead>
          <tbody>
            {[...rows].sort(getComparator(order, "status")).map((row) => (
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
                        Resolved: <CheckRoundedIcon />,
                        InProgress: <AutorenewRoundedIcon />,
                        Pending: <BlockIcon />,
                      }[row.status as keyof typeof statusOrderMap]
                    }
                    color={
                      {
                        Resolved: "success",
                        InProgress: "neutral",
                        Pending: "danger",
                      }[
                        row.status as keyof typeof statusOrderMap
                      ] as ColorPaletteProp
                    }>
                    {row.status}
                  </Chip>
                </td>
                <td>{row.dateAlert}</td>
                <td>{row.dateResolved}</td>
                <td>
                  {row.technicienFirstName ? (
                    `${row.technicienFirstName} ${row.technicienLastName}`
                  ) : (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => handleListTechnicien(row.id)}>
                      +Add Tech
                    </Button>
                  )}
                </td>
                <td>{row.chambreNumber}</td>
                <td>{row.description}</td>
                <td>
                  {row.status != "InProgress" ? (
                    ``
                  ) : (
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => handleAccept(row.id)}
                      startDecorator={<Check />}>
                      Change Status
                    </Button>
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
            id={incidentId}
          />
        )}

        {showAcceptAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
            <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800">
                Are you sure?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Are you sure you want to Change the status ? This action cannot
                be undone.
              </p>
              <div className="flex justify-end mt-4 space-x-2">
                <Button onClick={handleAcceptCancel} color="neutral">
                  Cancel
                </Button>
                <Button color="success" onClick={handleAcceptConfirm}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </Sheet>

      <React.Fragment />
    </React.Fragment>
  );
}
