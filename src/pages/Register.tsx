import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Stack, Typography, FormControlLabel, Checkbox, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CelebrationBg from "../assets/Celebrations(Bg) - hashtag.png";
import { useState } from "react";
const schema = z.object({
  name: z.string().min(2, "Name too short").max(60),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile"),
  email: z.string().email("Enter valid email"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { registerUser, verifyOtp } = useAuth();
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [userdata, setUserdata] = useState<any>({});
  const navigate = useNavigate();

  const submit = async () => {
    const ok = await verifyOtp(otp, userdata);
    if (ok) navigate("/details-1");
    else setErr("Invalid OTP. Hint: 1234");
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    registerUser();
    setUserdata(data);
    setOpen(true);
  };

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
          <Stack spacing={2} mx="auto">
            <Typography variant="h5" fontWeight={700}>
              Register to create your account 🎉
            </Typography>
            <TextField size="small" label="Full Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
            <TextField size="small" label="Mobile Number" {...register("phone")} error={!!errors.phone} helperText={errors.phone?.message} />
            <TextField size="small" label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
            <FormControlLabel control={<Checkbox defaultChecked />} label="I accept the terms & conditions and privacy policy" />

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              sx={{
                borderRadius: "50px",
                backgroundColor: "#facc15",
                color: "black",
                fontWeight: 700,
                px: 6,
                "&:hover": { backgroundColor: "#eab308" },
              }}
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </Stack>{" "}
          <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
            <div className="w-full p-3">
              <DialogTitle>OTP Verification</DialogTitle>
              <Typography variant="body2" color="text.secondary"></Typography>
              <DialogContent>
                <TextField label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} error={!!err} helperText={err || " "} />
              </DialogContent>
              <DialogActions className="dialog-actions-dense">
                <Button variant="contained" onClick={() => setOpen(false)} color="secondary">
                  Cancel
                </Button>
                <Button variant="contained" onClick={submit} color="primary">
                  Verify
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </Paper>
      </div>
    </div>
  );
}
