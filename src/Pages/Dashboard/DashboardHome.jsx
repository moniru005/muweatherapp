import { useState } from "react";

const DashboardHome = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const api = {
    key: import.meta.env.VITE_WEATHER_KEY,
    base: "http://api.weatherapi.com/v1/",
  };

  const handleSearch = () => {
    fetch(`${api.base}current.json?key=${api.key}&q=${search}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      });
  };

  //   Date Formating
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDay();
  const dayOfWeek = currentDate.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayName = daysOfWeek[dayOfWeek];

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", { month: "long" });
  };

  const fullDate = getMonthName(month) + " " + day + ", " + year;

  //   console.log(fullDate);

  return (
    <div className="w-full">
      {/* topbar */}
      <div className="flex flex-col lg:flex-row justify-between items-center h-[120px] lg:h-[80px] bg-slate-800 rounded-lg px-4 py-3 lg:py-0 w-full">
        {/* left */}
        <div className="flex flex-col text-white">
          <p>
            {getMonthName(month)} {year}
          </p>
          <p>
            {currentDayName}, {fullDate}
          </p>
        </div>

        {/* right */}
        <div className="flex flex-row items-center">
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
      </div>

      <div className="p-6">
        <div className="">
          {typeof weather.current !== "undefined" ? (
            <>
              <div>
                <h2 className="text-xl font-medium mb-3 text-stale-900">
                  Today Overview:
                  <span className="text-xl font-bold pl-2">{weather.location?.name}</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4">
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
                    <p>{weather.current?.condition.text} RH</p>
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
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
