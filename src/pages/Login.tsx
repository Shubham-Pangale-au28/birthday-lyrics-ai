import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async () => {
    const ok = await login(id, password);
    if (ok) navigate("/details-1", { replace: true, state: { from: location.state?.from } });
    else setErr("Login failed");
  };

  return (
    <Stack spacing={2} mx="auto" className="">
      <Typography variant="h5" fontWeight={700}>
        Login
      </Typography>
      <TextField size="small" label="Email or Phone" value={id} onChange={(e) => setId(e.target.value)} />
      <TextField size="small" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {err && <Typography color="error">{err}</Typography>}
      <Button variant="contained" onClick={submit}>
        Login
      </Button>

      <p className="mt-10 text-center text-sm/6 text-gray-400">
        Don't have an account?
        <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
          Register
        </a>
      </p>
    </Stack>
  );
}
