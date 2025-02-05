import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  createTheme,
  ThemeProvider,
  Autocomplete,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import image777 from "../../image/RUlogo.png";
import { institutionsWithFaculties, countries } from "./data";
import { makeStyles } from "@mui/styles";
import { keywordsdomain } from "./data";
import maleImage from "../../components/AppAppBar/profile_mal.jpg";
import femaleImage from "../../components/AppAppBar/profile_female.png";

const logoStyle = {
  width: "300px",
  height: "auto",
  cursor: "pointer",
  margin: "-100px 0px -30px 0px",
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link to="">ResearchUnity</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    formControl: {
      margin: theme.spacing(3),
      padding: theme.spacing(5),
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
    },
    formLabel: {
      marginBottom: theme.spacing(2),
      color: theme.palette.secondary.main,
    },
    radioGroup: {
      flexDirection: "row",
    },
  };
});

export default function SignUp() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState(countries[135]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [departement, setDepartement] = useState("");
  const [emailError, setEmailError] = useState("");
  const [departementOptions, setDepartmentOptions] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Change from "" to []
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

 

  const validateForm = () => {
    const fields = [
      firstName,
      lastName,
      degree,
      email,
      region,
      selectedInstitution,
      selectedFaculty,
      departement,
      password,
      confirmPassword,
      selectedTags,
      gender,
    ];

    for (const field of fields) {
      if (!field) {
        setErrorSnackbarMessage("Tous les champs doivent être remplis.");
        setErrorSnackbarOpen(true);
        return false;
      }
    }

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas.");
      return; // Stop form submission
    }

    

    if (!validateForm()) {
      return;
    } // Closing the if block

    try {
        const keywords = selectedTags.join(",");

        const response = await axios.post("http://127.0.0.1:8000/api/signup2/", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            degree: degree,
            region: region.label,
            institution: selectedInstitution,
            faculte: selectedFaculty,
            departement: departement,
            keywords: keywords,
            gender: gender,
        });
        setSnackbarMessage("Registration successful!");
        setSnackbarOpen(true);
        navigate("/verification");
    } catch (error) {
        console.error("Error during request:", error.response || error.message);

        let errorMessage = "An error occurred during registration.";

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    errorMessage = "Email already exists. Please try another email.";
                    break;
                case 500:
                    errorMessage = "An error occurred during registration.";
                    break;
                default:
                    errorMessage = error.response.data.detail || errorMessage;
                    break;
            }
        }

        setErrorSnackbarMessage(errorMessage);
        setErrorSnackbarOpen(true);
    }
}



  const handleRadioChange1 = (event) => setDegree(event.target.value);
  const handleRadioChange2 = (event) => setGender(event.target.value);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validateConfirmPassword(newConfirmPassword);
  };
  
  const validateConfirmPassword = (confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas.");
    } else {
      setConfirmPasswordError("");
    }
  };
  

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const validatePassword = (password) => {
    const lengthCriteria = password.length >= 10;
    const complexityCriteria =
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>=]/.test(password);
    if (!lengthCriteria) {
      setPasswordError("Password must be at least 10 characters long.");
    } else if (!complexityCriteria) {
      setPasswordError(
        "Password must contain uppercase, lowercase, numbers, and symbols."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const institutionOptions = Object.keys(institutionsWithFaculties);

  const handleInstitutionChange = (event, newValue) => {
    setSelectedInstitution(newValue);
    setSelectedFaculty(null); // Reset selected faculty when institution changes
    setDepartmentOptions([]); // Reset department options when institution changes
  };

  const handleFacultyChange = (event, newValue) => {
    setSelectedFaculty(newValue);
    setDepartement(""); // Réinitialiser le département sélectionné lorsque la faculté change
    // Set department options based on selected faculty
    const departments = institutionsWithFaculties[selectedInstitution][
      newValue
    ].map((departmentObj) => departmentObj.département);
    setDepartmentOptions(departments);
  };

  let facultyOptions = [];
  if (selectedInstitution) {
    facultyOptions = Object.keys(
      institutionsWithFaculties[selectedInstitution]
    );
  }

  const [error, setError] = useState("");

  const handleDomainChange = (event, newValue) => {
    setSelectedDomain(newValue);
    // Reset tags when domain changes
    setSelectedTags([]);
  };

  const handleTagsChange = (event, newValues) => {
    if (newValues.length > 15) {
      setError("You can't select more than 15 tags.");
    } else {
      setSelectedTags(newValues);
      setError("");
    }
  };

  // Function to get filtered tags based on selected domain
  const getFilteredTags = () => {
    const selectedCategory = keywordsdomain.find(
      (category) => category.domain === selectedDomain
    );
    return selectedCategory
      ? selectedCategory.categories.map((cat) => cat.keywords).flat()
      : [];
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <img src={image777} alt="Logo" style={logoStyle}  />
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            method="post">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              {/**firstname */}
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              {/**lastname */}
              <Grid item xs={12} sm={6}>
                <FormControl
                  component="fieldset"
                  fullWidth
                  className={classes.formControl}>
                  <FormLabel
                    component="legend"
                    required
                    color="secondary"
                    className={classes.formLabel}>
                    Academic Degree
                  </FormLabel>
                  <RadioGroup
                    aria-label="degree"
                    name="degree"
                    value={degree}
                    onChange={handleRadioChange1}
                    className={classes.radioGroup}>
                    <FormControlLabel
                      value="PHDstudent"
                      control={<Radio color="secondary" />}
                      label="PHDstudent"
                    />
                    <FormControlLabel
                      value="Professor"
                      control={<Radio color="secondary" />}
                      label="Professor"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/**degree */}
              <Grid item xs={12} sm={6}>
                <FormControl
                  component="fieldset"
                  color="secondary"
                  fullWidth
                  className={classes.formControl}>
                  <FormLabel
                    component="legend"
                    required
                    className={classes.formLabel}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={handleRadioChange2}
                    className={classes.radioGroup}>
                    <FormControlLabel
                      value="Male"
                      control={<Radio color="secondary" />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio color="secondary" />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/**gender */}
              <Grid item xs={12}>
                <Autocomplete
                  color="secondary"
                  id="country-select-demo"
                  options={countries}
                  value={region}
                  onChange={(event, newValue) => setRegion(newValue)}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}>
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
                      color="secondary"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                    />
                  )}
                />
              </Grid>
              {/**contries */}
              <Grid item xs={12}>
                <Autocomplete
                  color="secondary"
                  id="institution-select"
                  options={institutionOptions}
                  value={selectedInstitution}
                  onChange={handleInstitutionChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Institution"
                      required
                      color="secondary"
                    />
                  )}
                />
              </Grid>
              {/**institution */}
              <Grid item xs={12}>
                <Autocomplete
                  color="secondary"
                  id="faculty-select"
                  options={facultyOptions}
                  value={selectedFaculty}
                  onChange={handleFacultyChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Faculty" required />
                  )}
                  disabled={!selectedInstitution}
                />
              </Grid>
              {/**facu */}
              <Grid item xs={12}>
                <Autocomplete
                  color="secondary"
                  id="department-select"
                  options={departementOptions}
                  value={departement}
                  onChange={(event, newValue) => setDepartement(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Department" required />
                  )}
                  disabled={!selectedFaculty}
                />
              </Grid>
              {/**depa */}

              {/*key-domain */}

              <Grid item xs={12}>
                <Autocomplete
                  id="domain-standard"
                  options={keywordsdomain.map((category) => category.domain)}
                  value={selectedDomain}
                  onChange={handleDomainChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Domain"
                      color="secondary"
                      placeholder="Select a domain"
                      required
                      error={!!error}
                      helperText={error}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={getFilteredTags()}
                  value={selectedTags}
                  onChange={handleTagsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color="secondary"
                      label="Tags"
                      placeholder="Select up to 15 tags"
                    />
                  )}
                />
              </Grid>
              {/*key*/}

              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={Boolean(emailError)}
                  helperText={emailError}
                />
              </Grid>
              {/**email */}

              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/**conf password */}
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={Boolean(confirmPasswordError)}
                  helperText={confirmPasswordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/**conf password */}

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="secondary" />
                  }
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary">
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorSnackbarMessage}
          </Alert>
        </Snackbar>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
