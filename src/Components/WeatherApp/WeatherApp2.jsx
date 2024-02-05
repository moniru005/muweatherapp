import { useEffect, useState } from "react";

const api = {
  key: import.meta.env.VITE_WEATHER_KEY,
  base: "http://api.weatherapi.com/v1/",
};
const WeatherApp2 = () => {
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
        <div className="mb-6 flex flex-col items-center space-y-3">
          <h2 className="py-4 font-medium text-stale-900 text-center">
            <span className="text-4xl font-bold">
              {weather.location?.name}
            </span>
          </h2>
          
          
        </div>
      </div>
      <div className="flex px-4 lg:px-16 flex-col gap-4 pb-6 items-center">
        {/* Row-1 */}
        <div className="flex lg:flex-row gap-4">
          {/* Wind */}
          <div className="w-96 md:mr-20 mb-10 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-gray-900">
            <div className="text-md font-bold flex flex-col text-white">
              <span className="uppercase">Wind</span>
              <span className="font-normal text-white text-sm">{weather.current?.last_updated}</span>
            </div>
            <div className="w-32 h-32 flex items-center justify-center">
            <img className="w-28" src={weather.current?.condition.icon} alt="" />
            </div>
            <p className="text-white mb-2">{weather.current?.condition.text}</p>
            <div className="text-3xl font-bold text-white mb-6">
            {weather.current?.wind_kph} KM/H
            </div>
          </div>
          {/* Humidity */}
          <div className="w-96 md:mr-20 mb-10 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-gray-900">
            <div className="text-md font-bold flex flex-col text-white">
              <span className="uppercase">Humidity</span>{" "}
              <span className="font-normal text-white text-sm">{weather.current?.last_updated}</span>
            </div>
            <div className="w-32 h-32 flex items-center justify-center">
            <img className="w-28" src={weather.current?.condition.icon}/>
            </div>
            <p className="text-white mb-2">{weather.current?.condition.text}</p>
            <div className="text-3xl font-bold text-white mb-6">
            {weather.current?.humidity} RH
            </div>
          </div>
        </div>

        {/* Row-2 */}
        <div className="flex lg:flex-row gap-4 ">
          {/* Pressure */}
          <div className="w-96 md:mr-20 mb-10 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-gray-900">
            <div className="text-md font-bold flex flex-col text-white">
              <span className="uppercase">Pressure</span>{" "}
              <span className="font-normal text-white text-sm">{weather.current?.last_updated}</span>
            </div>
            <div className="w-32 h-32 flex items-center justify-center">
            <img className="w-28" src={weather.current?.condition.icon}/>
              
            </div>
            <p className="text-white mb-2">{weather.current?.condition.text}</p>
            <div className="text-3xl font-bold text-white mb-6">
            {weather.current?.pressure_mb} HPA
            </div>
          </div>
          {/* Temperature */}
          <div className="w-96 md:mr-20 mb-10 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-gray-900">
            <div className="text-md font-bold flex flex-col text-white">
              <span className="uppercase">Temperature</span>{" "}
              <span className="font-normal text-white text-sm">{weather.current?.last_updated}</span>
            </div>
            <div className="w-32 h-32 flex items-center justify-center">
            <img className="w-28" src={weather.current?.condition.icon}/>
              
            </div>
            <p className="text-white mb-2">Partly cloud</p>
            <div className="text-3xl font-bold text-white mb-6">
            {weather.current?.temp_c}&deg;C <span className="font-normal text-white mx-1">/</span>{weather.current?.temp_f}&deg;F
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp2;
