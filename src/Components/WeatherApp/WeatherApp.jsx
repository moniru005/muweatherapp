import { useEffect, useState } from "react";

const api = {
  key: import.meta.env.VITE_WEATHER_KEY,
  base: "http://api.weatherapi.com/v1/",
};
const WeatherApp = () => {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetch(`${api.base}current.json?key=${api.key}&q=London`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      });
  }, []);

  const handleSearch = () => {
    fetch(`${api.base}current.json?key=${api.key}&q=${search}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      });
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center py-4">
        <div className="flex flex-row items-center pb-4">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search City/Country.."
              className="p-2 rounded-l-lg border"
            />
            <button
              onClick={handleSearch}
              className="rounded-r-lg rounded-l-none bg-slate-300 p-[8.5px] hover:bg-slate-200"
            >
              Search
            </button>
          </div>
          <div className="mb-2 flex flex-col items-center space-y-3">
            <h2 className="text-xl font-medium  text-stale-900 text-center">
              <span className="text-xl font-bold pl-2">
                {weather.location?.name}
              </span>
            </h2>
            <p>{weather.location?.localtime}</p>
            <img src={weather.current?.condition.icon} alt="" />
          </div>
      </div>
      <div className="flex px-4 lg:px-16 flex-col gap-4 pb-6">
                {/* Row-1 */}
                <div className="flex lg:flex-row gap-4">
                  {/* Wind */}
                  <div className="bg-slate-700 w-full rounded-lg text-white p-4">
                    <h2 className="text-xl font-medium pb-2"> Wind Speed</h2>
                    <p>{weather.current?.wind_kph} KM/H</p>
                    <p>{weather.current?.wind_mph} MP/H</p>
                    <p>{weather.current?.wind_degree} Deg</p>
                  
                  </div>
                  {/* Humidity */}
                  <div className="bg-slate-700 w-full rounded-lg text-white p-4">
                    <h2 className="text-xl font-medium pb-2">Humidity</h2>
                    <p>{weather.current?.humidity} RH</p>
                    <p>{weather.current?.condition.text}</p>
                  </div>
                </div>

                {/* Row-2 */}
                <div className="flex lg:flex-row gap-4">
                  {/* Pressure */}
                  <div className="bg-slate-700 w-full rounded-lg text-white p-4">
                    <h2 className="text-xl font-medium pb-2"> Pressure</h2>
                    <p>{weather.current?.pressure_mb} HPA</p>
                    <p>{weather.current?.pressure_in} PA</p>
                  </div>
                  {/* Temperature */}
                  <div className="bg-slate-700 w-full rounded-lg text-white p-4">
                    <h2 className="text-xl font-medium pb-2">Temperature</h2>
                    <p>Celsius: {weather.current?.temp_c}&deg;C </p>
                    <p>Fahrenheit: {weather.current?.temp_f}&deg;F </p>
                    
                  </div>
                </div>
      </div>
    </div>
  );
};

export default WeatherApp;
