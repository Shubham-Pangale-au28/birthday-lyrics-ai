import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useAuth, type User } from "../context/AuthContext";
import CoudberyLogo from "../assets/Cadbury Logo.png";
import Logo from "../assets/2d logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const raw = sessionStorage.getItem("user");
  const username = raw ? (JSON.parse(raw) as User) : null;
  return (
    <AppBar position="sticky" className="!bg-purple-950 shadow-md">
      <Toolbar className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={CoudberyLogo} alt="cLogo" width={120} height={50} />
          </Link>
          <Link to="/">
            <img src={Logo} alt="Logo" width={150} height={80} />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {username && (
            <Typography variant="body1" className="text-white font-medium">
              Welcome, {username.name}!
            </Typography>
          )}
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={logout}
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": { borderColor: "white", background: "rgba(255,255,255,0.1)" },
            }}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
