import { useState } from "react";
import { useDispatch } from "react-redux";
import { regsiterUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, TextField, Typography,CircularProgress, Snackbar,Alert } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const RegistrationScreen = (props) => {
  const dispatch=useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading]=useState(false);
  const [success,setSuccess]=useState(false)
  const [error, setIsError]=useState({isError:false, message:""});
  const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
  const onFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(regsiterUser({ ...formData }))
      .unwrap().then(()=>{
        setIsLoading(false)
        setSuccess(true);
        setTimeout(()=>{
          navigate('/login');
        },2000)
      })
      .catch((rejectedValueOrSerializedError) => {
        setIsLoading(false);
        setIsError({
          isError: true,
          message: rejectedValueOrSerializedError.message,
        });
      });
  };
  return (
    <Grid
      container
      sx={{ height: "90vh" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={10} sm={8} md={6} lg={3}>
        <Paper
          elevation={20}
          sx={{
            width: "100%",
            borderRadius: 10,
            padding: "25px",
            color: "whitesmoke",
          }}
        ><Snackbar
        open={error.isError || success}
        autoHideDuration={5000}
        onClose={() => {
          success ? setSuccess(false) : setIsError({ isError: false, message: "" });
        }}
      >
        <Alert
          severity={success ? "success":"error"}
          onClose={() => {
            success ? setSuccess(false) : setIsError({ isError: false, message: "" });
          }}
        >
          {success ? "User Registration Successfull!" :error.message}
        </Alert>
      </Snackbar>
          <form onSubmit={onFormSubmit}>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={3}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Grid item xs={12} sm={10} md={8} lg={10}>
                <Typography variant="h2" component="div" color="lightskyblue">
                  SIGNUP
                </Typography>
              </Grid>
              <Grid item xs={10} sm={8} md={6} lg={6}>
                <TextField
                  id="firstName"
                  value={formData.firstName}
                  required
                  type="text"onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                  }}
                  label="First Name"
                  fullWidth
                  autoComplete="off"
                  autoFocus
                  InputProps={{
                    startAdornment: <AccountBoxIcon />,
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={8} md={6} lg={6}>
                <TextField
                  id="lastName"
                  value={formData.lastName}
                  required
                  type="text"
                  label="Last Name"
                  fullWidth
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                  }}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: <AccountBoxIcon />,
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={8} md={6} lg={6}>
                <TextField
                  id="email"
                  value={formData.email}
                  required
                  type="email"
                  label="Email"
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  fullWidth
                  autoComplete="off"
                  InputProps={{
                    startAdornment: <EmailIcon />,
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={8} md={6} lg={6}>
                <TextField
                  id="password"
                  value={formData.password}
                  label="Password"
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: <PasswordIcon />,
                    endAdornment: (
                      <IconButton
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        {!showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={10} md={8} lg={6}>
              {!isLoading && <Button size="large"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success">
                  Signup
                </Button>}
                {isLoading && <CircularProgress color="success" size={30} /> }
              </Grid>
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <Button
                  size="large"
                  onClick={() => {
                    navigate("/login");
                  }}
                  fullWidth
                  variant="contained"
                  color="warning"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default RegistrationScreen;
