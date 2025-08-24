import { Typography, Paper } from "@mui/material";
import CelebrationBg from "../assets/Celebrations(Bg) - hashtag.png";
import Login from "./Login";
export default function Landing() {
  return (
    <div className="w-full h-full mx-auto flex flex-col items-center md:flex-row">
      <div className="w-[50%]">
        <img src={CelebrationBg} style={{ width: "100%", height: "auto" }} alt="Celebration Background" />
        <Typography variant="h4" className="text-center">
          A Unique Birthday for everyone 🎉
        </Typography>
        <Typography variant="body1" className="text-center" sx={{ mb: 3 }}>
          Craft unique, short, rhyming lines and play them aloud instantly.
        </Typography>
      </div>
      <div className="w-[40%] h-full">
        <Paper sx={{ p: 3, textAlign: "center" }} className="" elevation={3}>
          <Login />
        </Paper>
      </div>
    </div>
  );
}
