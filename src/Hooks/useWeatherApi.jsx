import { useEffect, useState } from "react";

const api = {
  key: "e16dcc1baece419580571753240502",
  base: "http://api.weatherapi.com/v1/",
};
const useWeatherApi = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetch(`${api.base}current.json?key=${api.key}&q=London`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setWeather(result);
      });
  }, []);
  return weather;
};

export default useWeatherApi;
