import { useState, useEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import UserContext from "./context/userContext";
import SettingsContext from "./context/settingsContext";
import { isExpired, decodeToken } from "react-jwt";
import router from "./routerHandler";
import "animate.css";

export default function App() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(decodeToken(token) || {});
  const [settings, setSettings] = useState({});
  const isTokenExpired = isExpired(token);

  const UserProvider = useMemo(() => ({ user, setUser }), [user, setUser]);
  const SettingProvider = useMemo(
    () => ({ settings, setSettings }),
    [settings, setSettings]
  );

  useEffect(() => {
    if (isTokenExpired) {
      localStorage.setItem("token", "");
    }
  }, [isTokenExpired]);

  useEffect(() => {
    setSettings({
      type: window.localStorage.getItem("type"),
      model: window.localStorage.getItem("model"),
      language: window.localStorage.getItem("language"),
      voice: window.localStorage.getItem("voice"),
    });
  }, []);

  useEffect(() => {
    setUser(decodeToken(token));
  }, [token]);

  return (
    <UserContext.Provider value={UserProvider}>
      <SettingsContext.Provider value={SettingProvider}>
        <RouterProvider router={router} />
      </SettingsContext.Provider>
    </UserContext.Provider>
  );
}
