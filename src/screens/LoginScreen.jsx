import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { loginUser } from "../features/auth/authSlice";
const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState({ isError: false, message: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginUser({ ...formData }))
      .unwrap()
      .catch((rejectedValueOrSerializedError) => {
        setIsLoading(false);
        setIsError({
          isError: true,
          message: rejectedValueOrSerializedError.message,
        });
      });
  };
  return (
      <Grid sx={{ height:"90vh"}} container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={8} md={6} lg={3}>
          <Paper
            elevation={20}
            sx={{
              width:"100%",
              borderRadius: 10,
              padding: "25px",
              color: "whitesmoke",
            }}
          >
            <Snackbar
              open={error.isError}
              autoHideDuration={5000}
              onClose={() => {
                setIsError({ isError: false, message: "" });
              }}
            >
              <Alert
                severity="error"
                onClose={() => {
                  setIsError({ isError: false, message: "" });
                }}
              >
                {error.message}
              </Alert>
            </Snackbar>
            <form onSubmit={onFormSubmit}>
              <Grid
                container
                rowSpacing={3}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Grid item xs={12} sm={10} md={8} lg={8}>
                  <Typography variant="h3" component="div" color="lightskyblue">
                    LOGIN
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10} md={8} lg={8}>
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
                    autoFocus
                    InputProps={{
                      startAdornment: <EmailIcon />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={10} md={8} lg={8}>
                  <TextField
                    id="password"
                    value={formData.password}
                    required
                    label="Password"
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
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
                <Grid item xs={12} sm={10} md={8} lg={8}>
                  {!isLoading && (
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      Login
                    </Button>
                  )}
                  {isLoading && <CircularProgress color="success" size={30} />}
                </Grid>
                <Grid item xs={12} sm={10} md={8} lg={8}>
                  <Button
                    onClick={() => {
                      navigate("/signup");
                    }}
                    fullWidth
                    variant="contained"
                    color="warning"
                  >
                    Signup
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
  );
};
export default LoginScreen;
