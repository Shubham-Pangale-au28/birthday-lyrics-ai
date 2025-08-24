import { Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import CapAndGift from "../assets/Cap&Gift.png";
import Bulloon from "../assets/Balloon.png";
import Star from "../assets/Asset 1.png";
import Navbar from "../components/Navbar";
export default function Details1() {
  const { setPrefs, prefs } = useAuth();
  const [receiverName, setReceiverName] = useState(prefs?.receiverName || "");
  const [gender, setGender] = useState(prefs?.gender || "male");
  const [age, setAge] = useState("0");
  const navigate = useNavigate();
  const next = () => {
    if (!receiverName.trim()) return;
    setPrefs({ ...prefs, receiverName, gender, age });
    navigate("/details-2");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center bg-gradient-to-b from-purple-800 via-purple-950 to-black text-white p-6 gap-10">
        <div className="flex flex-col items-center md:items-end justify-center w-full sm:1/2 md:w-1/2">
          <Typography variant="h3" className="mb-6 font-semibold text-center md:text-right">
            Tell us about your loved one...
          </Typography>
          <div className="flex items-center justify-center gap-6">
            <img src={Star} alt="star" className="h-20 md:h-28 object-contain" />
            <img src={CapAndGift} alt="capandgift" className="h-52 md:h-96 object-contain" />
            <img src={Bulloon} alt="balloon" className="h-20 md:h-28 object-contain" />
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-sm md:w-1/3">
          <div>
            <Typography variant="subtitle2" className="mb-1">
              Their name
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter name"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                },
              }}
            />
          </div>

          <div>
            <Typography variant="subtitle2" className="mb-1">
              How old they'll be this birthday
            </Typography>
            <TextField
              type="number"
              fullWidth
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                },
              }}
            />
          </div>

          <div>
            <Typography variant="subtitle2" className="mb-1">
              Gender
            </Typography>
            <FormControl fullWidth>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "white",
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            size="large"
            onClick={next}
            sx={{
              borderRadius: "50px",
              backgroundColor: "#facc15",
              color: "black",
              px: 6,
              "&:hover": { backgroundColor: "#eab308" },
            }}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}
