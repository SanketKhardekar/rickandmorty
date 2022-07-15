import { Fragment, Suspense, useEffect } from "react";
import Dashboard from "./Dashboard";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Navigate,Route } from "react-router-dom";
import { fetchLocalAuth } from "./services/services";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import { setLogin } from "./features/auth/authSlice";
import Protected from "./screens/Protected";
function App() {
  const dispatch=useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    const authData = fetchLocalAuth();
    dispatch(setLogin(authData));
  }, [dispatch]);
   return (
    <Fragment>
      <Suspense fallback={<CircularProgress size={30} />}>
      <Routes>
           <Route path="/login" element={<Protected isLoggedIn={isLoggedIn} wantLoggedIn={true}><LoginScreen /></Protected>} />
           <Route path="/signup" element={<Protected isLoggedIn={isLoggedIn} wantLoggedIn={true}><RegistrationScreen /></Protected>} />
           <Route path="/dashboard" element={<Protected isLoggedIn={isLoggedIn} wantLoggedIn={false}><Dashboard /></Protected>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
