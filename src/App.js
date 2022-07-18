import { Fragment, Suspense, useEffect ,lazy } from "react";

import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Navigate,Route } from "react-router-dom";
import { fetchLocalAuth } from "./services/services";
import { setLogin } from "./features/auth/authSlice";
const Protected= lazy(()=>import("./screens/Protected"));
const LoginScreen =lazy(() => import("./screens/LoginScreen"));
const Dashboard =lazy(() => import("./Dashboard"));
const RegistrationScreen =lazy(() => import("./screens/RegistrationScreen"));
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
