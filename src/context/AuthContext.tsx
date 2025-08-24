import { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

type Stage = "idle" | "otpPending" | "verified";
// register -> otpPending -> verified
// login goes straight to verified

type AuthCtx = {
  user: User | null;
  stage: Stage;
  isLoggedIn: boolean;
  registerUser: () => Promise<string>; // returns userId
  verifyOtp: (otp: string, data: Omit<User, "id">) => Promise<boolean>;
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
  logout: () => void;
  setPrefs: (p: { receiverName?: string; gender?: string; genre?: string; mood?: string; voice?: string; user_id?: string; age?: string }) => void;
  prefs: { receiverName?: string; gender?: string; genre?: string; mood?: string; voice?: string; user_id?: string; age?: string } | null;
  setLyrics: (txt: string) => void;
  lyrics: string;
};

const Ctx = createContext<AuthCtx>({} as any);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = sessionStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
  });

  const [stage, setStage] = useState<Stage>(() => (sessionStorage.getItem("stage") as Stage) || "idle");
  const [prefs, setPrefsState] = useState<AuthCtx["prefs"]>(() => {
    const raw = sessionStorage.getItem("prefs");
    return raw ? JSON.parse(raw) : null;
  });
  const [lyrics, setLyricsState] = useState<string>(() => sessionStorage.getItem("lyrics") || "");

  useEffect(() => {
    user ? sessionStorage.setItem("user", JSON.stringify(user)) : sessionStorage.removeItem("user");
  }, [user]);
  useEffect(() => {
    sessionStorage.setItem("stage", stage);
  }, [stage]);
  useEffect(() => {
    prefs ? sessionStorage.setItem("prefs", JSON.stringify(prefs)) : sessionStorage.removeItem("prefs");
  }, [prefs]);
  useEffect(() => {
    sessionStorage.setItem("lyrics", lyrics);
  }, [lyrics]);

  const apiDelay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

  const registerUser: AuthCtx["registerUser"] = async () => {
    // call your backend here; for now mock:
    await apiDelay();
    const id = crypto.randomUUID();

    return id;
  };

  const verifyOtp: AuthCtx["verifyOtp"] = async (otp, data) => {
    await apiDelay();
    if (otp === "1234") {
      const id = crypto.randomUUID();
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/register`, { ...data });
      if (response.data.status !== "success") {
        setUser({
          id,
          name: response.data.name,
          phone: response.data.phone,
          email: response.data.email,
        });
        setStage("verified");
        return true;
      }

      return true;
    }
    return false;
  };

  const login: AuthCtx["login"] = async (emailOrPhone, _password) => {
    // call backend auth; for now mock to “verified”
    await apiDelay();
    await axios
      .post(`${import.meta.env.VITE_BACKEND_API}/api/login`, { email: emailOrPhone, password: _password })
      .then((response) => {
        setUser({
          id: response.data._doc._id,
          name: response.data._doc.name,
          phone: emailOrPhone.match(/^\d+$/) ? emailOrPhone : "9999999999",
          email: emailOrPhone.includes("@") ? emailOrPhone : "user@example.com",
        });
        setStage("verified");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setUser({
          id: crypto.randomUUID(),
          name: "Shubham Pangale",
          phone: "9999999999",
          email: "shubham@gmail.com",
        });
        setStage("verified");
      });

    return true;
  };

  const logout = () => {
    setUser(null);
    setStage("idle");
    setPrefsState(null);
    setLyricsState("");
    sessionStorage.clear();
  };

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      stage,
      isLoggedIn: !!user && stage !== "idle",
      registerUser,
      verifyOtp,
      login,
      logout,
      setPrefs: setPrefsState,
      prefs,
      setLyrics: setLyricsState,
      lyrics,
    }),
    [user, stage, prefs, lyrics]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
