import { useEffect } from "react";
import api from "../api";

export default function AuthHandler() {
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/user/login/success", {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });

        window.localStorage.setItem("token", response.data.token);
        window.location.href = "/chat";
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  return <div></div>;
}
