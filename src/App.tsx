import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Details1 from "./pages/DetailsOne";
import Details2 from "./pages/DetailsTwo";
import Lyrics from "./pages/Lyrics";
import { useAuth } from "./context/AuthContext";
import { PrivateRoute, VerifiedOrLoginRoute } from "./components/Protected";

export default function App() {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 via-purple-900 to-black text-white">
      {/* <AppBar position="sticky" className="bg-purple-800">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img src={Logo} alt="Logo" width="150px" height="80px" />
          <div>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            {!isLoggedIn ? (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar> */}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/details-1" replace />} />
        <Route path="/" element={!isLoggedIn ? <Login /> : <Navigate to="/details-1" replace />} />

        <Route
          path="/details-1"
          element={
            <PrivateRoute>
              <Details1 />
            </PrivateRoute>
          }
        />
        <Route
          path="/details-2"
          element={
            <PrivateRoute>
              <Details2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/lyrics"
          element={
            <PrivateRoute>
              <Lyrics />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={location?.state?.from ?? "/"} replace />} />
      </Routes>
    </div>
  );
}
