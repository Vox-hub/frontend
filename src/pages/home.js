import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/hero";
import Features from "../components/features";
import Testimony from "../components/testimony";
import Pricing from "../components/pricing";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://random-data-api.com/api/users/random_user?size=3"
        );
        setData(response.data);
      } catch (err) {
        console.log("error: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <Testimony data={data} />
      <Pricing />
    </>
  );
}
