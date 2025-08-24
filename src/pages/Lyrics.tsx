import { Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import LyricsPlayer from "../components/LyricsPlayer";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Lyrics() {
  const { lyrics } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-800 to-purple-950 text-white">
      <Navbar />

      <div className="flex flex-col justify-between flex-1 p-6">
        <div className="text-center mb-4">
          <Typography variant="h5" fontWeight={700}>
            Your song’s lyrics are ready! 🎶
          </Typography>
        </div>

        <div className="flex-1 flex justify-center items-center mb-6">
          <div className="bg-white text-black rounded-2xl p-4 w-full max-w-md h-[60vh] overflow-y-auto shadow-lg">
            <pre className="whitespace-pre-wrap font-sans text-md leading-relaxed">{lyrics}</pre>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <LyricsPlayer lyrics={lyrics} />
          <Button variant="outlined" onClick={() => navigate("/details-1")} sx={{ borderColor: "white", color: "white" }}>
            Edit Details
          </Button>
        </div>
      </div>
    </div>
  );
}
