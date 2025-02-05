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
import axios from "axios";
import { Cancel } from "@mui/icons-material";

const rowp = [
  {
    id: "INV-1234",
    date: "Feb 3, 2023",
    status: "PendingPayment",
    customer: {
      initial: "O",
      name: "Olivia Ryhe",
      email: "olivia@email.com",
    },
  },
  {
    id: "INV-1233",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Steve Hampton",
      email: "steve.hamp@email.com",
    },
  },
  {
    id: "INV-1232",
    date: "Feb 3, 2023",
    status: "PendingPayment",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com",
    },
  },
  {
    id: "INV-1231",
    date: "Feb 3, 2023",
    status: "LatePayment",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com",
    },
  },
  {
    id: "INV-1230",
    date: "Feb 3, 2023",
    status: "LatePayment",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com",
    },
  },
  {
    id: "INV-1229",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      email: "hooper@email.com",
    },
  },
  {
    id: "INV-1228",
    date: "Feb 3, 2023",
    status: "PendingPayment",
    customer: {
      initial: "K",
      name: "Krystal Stevens",
      email: "k.stevens@email.com",
    },
  },
  {
    id: "INV-1227",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "SachinFlynn",
      email: "s.flyn@email.com",
    },
  },
  {
    id: "INV-1226",
    date: "Feb 3, 2023",
    status: "LatePayment",
    customer: {
      initial: "B",
      name: "Bradley Rosales",
      email: "brad123@email.com",
    },
  },
  {
    id: "INV-1225",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "O",
      name: "OliviaRyhe",
      email: "olivia@email.com",
    },
  },
  {
    id: "INV-1224",
    date: "Feb 3, 2023",
    status: "PendingPayment",
    customer: {
      initial: "S",
      name: "SteveHampton",
      email: "steve.hamp@email.com",
    },
  },
  {
    id: "INV-1223",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com",
    },
  },
  {
    id: "INV-1221",
    date: "Feb 3, 2023",
    status: "LatePayment",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com",
    },
  },
  {
    id: "INV-1220",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com",
    },
  },
  {
    id: "INV-1219",
    date: "Feb 3, 2023",
    status: "PendingPayment",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      email: "hooper@email.com",
    },
  },
  {
    id: "INV-1218",
    date: "Feb 3, 2023",
    status: "LatePayment",
    customer: {
      initial: "K",
      name: "Krystal Stevens",
      email: "k.stevens@email.com",
    },
  },
  {
    id: "INV-1217",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Sachin Flynn",
      email: "s.flyn@email.com",
    },
  },
  {
    id: "INV-1216",
    date: "Feb 3, 2023",
    status: "LatePayment",
    customer: {
      initial: "B",
      name: "Bradley Rosales",
      email: "brad123@email.com",
    },
  },
];

const rowss = [
  {
    id: "1",
    nom: "abdo",
    prenom: "John",
    email: "john@example.com",
    telephone: "123456789",
    chambreId: "101",
    status: "Paid",
    AdminName: "Hassan",
    date: "2025-01-05",
    customer: { initial: "J", name: "John Doe", email: "john@example.com" },
  },
  {
    id: "2",
    nom: "djb",
    prenom: "Jane",
    email: "jane@example.com",
    telephone: "987654321",
    AdminName: "Hassan",
    chambreId: "102",
    status: "PendingPayment",
    date: "2025-01-04",
    customer: { initial: "J", name: "Jane Doe", email: "jane@example.com" },
  },
];

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
  
  const [id, setId] = React.useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  

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

  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8080/resident/residents", {
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



  const handleDeleteResident = async (): Promise<void> => {
    console.log(id);
    const token = localStorage.getItem("token"); // Remplacez cela par la méthode appropriée pour obtenir le token

    try {
      const response = await axios.delete(
        `http://localhost:8080/resident/delete/${id}`,
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



  const handleDelete = (id: React.SetStateAction<string>) => {
    setId(id);
    setIsDeleteModalOpen(true);  // Ouvre le modal de confirmation
  };
  
  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    handleDeleteResident();  // Exécute la suppression
  };
  
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);  // Ferme le modal sans supprimer
  };
  return (
    <React.Fragment>

<Modal open={isDeleteModalOpen} onClose={handleDeleteCancel}>
      <ModalDialog aria-labelledby="delete-modal" sx={{ width: 400 }}>
        <ModalClose />
        <Typography level="h2" id="delete-modal" sx={{ mb: 2 }}>
          Are you sure you want to delete this resident ?
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
                  width: 120,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                last Name
              </th>
              <th
                style={{
                  width: 120,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                first Name
              </th>
              <th
                style={{
                  width: 240,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Email
              </th>
              <th
                style={{
                  width: 140,
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
                Room Number
              </th>
              <th
                style={{
                  width: 120,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Delete Resident
              </th>
              <th
                style={{
                  width: 140,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Date
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
                    checked={selected.includes(row.id)}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>{row.id}</td>
                <td>{row.lastName}</td>
                <td>{row.firstName}</td>
                <td style={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Avatar size="sm">{row.lastName.slice(0, 1)}</Avatar>
                  {row.userName}
                </td>
                <td>{row.telephone}</td>
                <td>{row.chambreNumber}</td>
                <td>{row.date}</td>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>


      <React.Fragment />
    </React.Fragment>
  );
}
