import { useState } from "react";

const api = {
  key: import.meta.env.VITE_WEATHER_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};
const useOpenWeather = () => {
  const [weather, setWeather] = useState({});

  fetch(`${api.base}weather?q=London&units=metric&APPID=${api.key}`)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setWeather(result);
    });
  return weather;
};

export default useOpenWeather;
