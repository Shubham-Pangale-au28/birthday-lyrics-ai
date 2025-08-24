import { Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Headphone from "../assets/Headphone.png";
import Balloon from "../assets/Balloon2.png";
import MusicNote from "../assets/Purple Music Tone.png";

import Happy from "../assets/Happy.png";
import Romantic from "../assets/Romantic.png";
import Funny from "../assets/Funny.png";
import Motivational from "../assets/Motivational.png";
import Calm from "../assets/Calm.png";

import Rap from "../assets/Rap (1).png";
import Rock from "../assets/Rock.png";
import Pop from "../assets/Pop.png";
import Desi from "../assets/Desi.png";
import EDM from "../assets/EDM.png";

import Male from "../assets/Male.png";
import Female from "../assets/Female.png";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Details2() {
  const { setPrefs, prefs, setLyrics } = useAuth();
  const [mood, setMood] = useState(prefs?.mood || "");
  const [genre, setGenre] = useState(prefs?.genre || "");
  const [voice, setVoice] = useState(prefs?.voice || "");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userObject = JSON.parse(sessionStorage.getItem("user") || "{}");
  let user_id = "";
  if (userObject && userObject.id) {
    user_id = userObject.id;
  }
  const proceed = async () => {
    if (!mood || !genre || !voice) return;
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/lyrics`, {
        userId: user_id,
        gender: prefs?.gender,
        genre: genre,
        receiverName: prefs?.receiverName,
      });
      if (response.data) {
        setLyrics(response.data.lyrics);
        setLoading(false);
        navigate("/lyrics");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setPrefs({ ...prefs, mood, genre, voice });
  };

  const moods = [
    { label: "Happy", img: Happy },
    { label: "Romantic", img: Romantic },
    { label: "Funny", img: Funny },
    { label: "Motivational", img: Motivational },
    { label: "Calm", img: Calm },
  ];

  const genres = [
    { label: "Rap", img: Rap },
    { label: "Rock", img: Rock },
    { label: "Pop", img: Pop },
    { label: "Desi", img: Desi },
    { label: "EDM", img: EDM },
  ];

  const voices = [
    { label: "Male", img: Male },
    { label: "Female", img: Female },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center  bg-gradient-to-b from-purple-800 via-purple-950 to-blacktext-white p-6 gap-10">
        <div className="flex flex-col items-center md:items-end justify-center gap-6 w-full sm:1/2 md:w-1/2">
          <Typography variant="h4" className="font-semibold text-center">
            What would you like their song’s vibe to be?
          </Typography>
          <div className="flex items-center gap-6">
            <img src={MusicNote} alt="music" className="h-12 md:h-16 top-0" />
            <img src={Headphone} alt="headphone" className="object-contain md:h-96" />
            <img src={Balloon} alt="balloon" className="h-16 md:h-20" />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          <div>
            <Typography variant="subtitle1" className="mb-3 font-medium">
              Mood
            </Typography>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {moods.map((m) => (
                <div key={m.label} className="w-24">
                  <Card onClick={() => setMood(m.label)} className={`rounded-2xl transition border-4 ${mood === m.label ? "border-yellow-400" : "border-transparent"}`}>
                    <CardActionArea>
                      <CardContent className="flex flex-col items-center">
                        <img src={m.img} alt={m.label} className="h-12 mb-2" />
                        <Typography variant="body2">{m.label}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Typography variant="subtitle1" className="mb-3 font-medium">
              Genre
            </Typography>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {genres.map((g) => (
                <div key={g.label} className="w-24">
                  <Card onClick={() => setGenre(g.label)} className={`rounded-2xl transition border-4 ${genre === g.label ? "border-yellow-400" : "border-transparent"}`}>
                    <CardActionArea>
                      <CardContent className="flex flex-col items-center">
                        <img src={g.img} alt={g.label} className="h-12 mb-2" />
                        <Typography variant="body2">{g.label}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Typography variant="subtitle1" className="mb-3 font-medium">
              Singer’s Voice
            </Typography>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {voices.map((v) => (
                <div key={v.label} className="w-28">
                  <Card onClick={() => setVoice(v.label)} className={`rounded-2xl transition border-4 ${voice === v.label ? "border-yellow-400" : "border-transparent"}`}>
                    <CardActionArea>
                      <CardContent className="flex flex-col items-center">
                        <img src={v.img} alt={v.label} className="h-12 mb-2" />
                        <Typography variant="body2">{v.label}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <Button
              variant="contained"
              size="large"
              onClick={proceed}
              disabled={loading}
              sx={{
                borderRadius: "50px",
                backgroundColor: "#facc15",
                color: "black",
                px: 6,
                "&:hover": { backgroundColor: "#eab308" },
              }}
            >
              {loading ? "Loading..." : "Proceed"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
