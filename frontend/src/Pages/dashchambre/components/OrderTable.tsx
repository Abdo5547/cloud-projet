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
import Link from "@mui/joy/Link";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import {
  GroupRemoveSharp,
  Groups,
  Person,
  Whatshot,
} from "@mui/icons-material";

import ModalChambreIncidents from "./ModalChambreIncidents";
import ModalChambreResidents from "./ModalChambreResidents";
import { colors } from "@mui/material";
import ModalAddChambre from "../components/ModalAddChambre.jsx";

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
  const [statusOrder, setStatusOrder] = React.useState<Order>("asc");
  const [isChambreIncidentModalOpen, setIsChambreIncidentModalOpen] =React.useState(false);
  const [chambreIncidents, setChambreIncidents] = React.useState([{}]);
  const [isChambreResidentModalOpen, setIsChambreResidentModalOpen] =React.useState(false);
  const [chambreResident, setChambreResident] = React.useState([{}]);
  const [isAddChambreModalOpen, setIsAddChambreModalOpen] =
    React.useState(false);

  const handleViewChambreIncidents = (incidents) => {
    setChambreIncidents(
      incidents.map((incident) => ({
        incidentId: incident.incidentId,
        description: incident.description,
        dateAlert: incident.dateAlert,
        dateResolved: incident.dateResolved,
        status: incident.status,
        firstNameTechnicien: incident.firstNameTechnicien,
        lastNameTechnicien: incident.lastNameTechnicien,
      }))
    );
    setIsChambreIncidentModalOpen(true);
  };

  const handleAddChambre = () => {
    setIsAddChambreModalOpen(true);
  };

  const handleViewChambreResidents = (residents) => {
    setChambreResident(
      residents.map((resident) => ({
        residentFirstName: resident.firstNameResident,
        residentLastName: resident.lastNameResident,
        statusPayment: resident.statusPayment,
        telephone: resident.telephone,
      }))
    );
    setIsChambreResidentModalOpen(true);
  };

  type Order = "asc" | "desc";

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <Button
          size="sm"
          sx={{ marginTop: "23px" }}
          color="primary"
          onClick={() => setOpen(false)}>
          Submit
        </Button>
      </FormControl>
      <FormControl size="sm">
        <Button
          size="sm"
          sx={{ marginTop: "23px" }}
          color="primary"
          onClick={() => handleAddChambre()}>
          + Add Room
        </Button>
      </FormControl>
    </React.Fragment>
  );

  const handleStatusClick = () => {
    const newOrder = statusOrder === "asc" ? "desc" : "asc";
    setStatusOrder(newOrder);
    setRows([...rows].sort(getComparator(newOrder, "status")));
  };

  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8080/chambres/all", {
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
        setRows(data.sort(getComparator(statusOrder, "status")));
      })
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
          <FormLabel>Search for payment</FormLabel>
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
          display: { xs: "none", sm: "initial" },
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
                  width: 48,
                  textAlign: "center",
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
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
                  width: 40,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Price
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
                  onClick={handleStatusClick}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          statusOrder === "desc"
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
                  width: 60,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                {" "}
                Number
              </th>
              <th
                style={{
                  width: 74,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                {" "}
                Curent Number
              </th>
              <th
                style={{
                  width: 76,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                Number Possible
              </th>
              <th
                style={{
                  width: 70,
                  padding: "12px 6px",
                  backgroundColor: "#fef0f2",
                }}>
                {" "}
                Type
              </th>

              <th
                style={{
                  width: 80,
                  backgroundColor: "#fef0f2",
                  padding: "12px 6px",
                }}>
                Resident's List
              </th>
              <th
                style={{
                  width: 80,
                  backgroundColor: "#fef0f2",
                  padding: "12px 6px",
                }}>
                Incident's List
              </th>
              <th
                style={{
                  width: 80,
                  backgroundColor: "#fef0f2",
                  padding: "12px 6px",
                }}>
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {[...rows].sort(getComparator(order, "statue")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? "warning" : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Typography>{row.id}</Typography>
                </td>
                <td>
                  <Typography>{row.price} $</Typography>
                </td>

                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Available: <CheckRoundedIcon />,
                        PendingPayment: <AutorenewRoundedIcon />,
                        Occupied: <BlockIcon />,
                      }[row.status as "Paid" | "PendingPayment" | "LatePayment"]
                    }
                    color={
                      {
                        Available: "success",
                        PendingPayment: "neutral",
                        Occupied: "danger",
                      }[
                        row.status as "Paid" | "PendingPayment" | "LatePayment"
                      ] as ColorPaletteProp
                    }>
                    {row.status}
                  </Chip>
                </td>
                <td>{row.number}</td>
                <td>{row.numberCurent} </td>
                <td>{row.numberResidentPossible}</td>

                <td>
                  <Typography>{row.type}</Typography>
                </td>
                <td>
                  <Button
                    color="primary"
                    size="sm"
                    startDecorator={<Groups />}
                    onClick={() => handleViewChambreResidents(row.residents)}>
                    Residents
                  </Button>
                </td>
                <td>
                  <Button
                    color="warning"
                    size="sm"
                    startDecorator={<Whatshot />}
                    onClick={() => handleViewChambreIncidents(row.incidents)}>
                    Incidents
                  </Button>
                </td>
                <td>
                  <Button
                    color="success"
                    sx={{ textDecoration: "none", color: "white" }}>
                    {" "}
                    <Link
                      sx={{ color: "white" }}
                      href={`/dashrooms/detailroom/${row.id}`}>
                      See Details
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isChambreIncidentModalOpen && (
          <ModalChambreIncidents
            open={isChambreIncidentModalOpen}
            onClose={() => setIsChambreIncidentModalOpen(false)}
            incidents={chambreIncidents}
          />
        )}
        {isChambreResidentModalOpen && (
          <ModalChambreResidents
            open={isChambreResidentModalOpen}
            onClose={() => setIsChambreResidentModalOpen(false)}
            residents={chambreResident}
          />
        )}
        {isAddChambreModalOpen && (
          <ModalAddChambre
            open={isAddChambreModalOpen}
            onClose={() => setIsAddChambreModalOpen(false)}
          />
        )}

        
      </Sheet>
    </React.Fragment>
  );
}
