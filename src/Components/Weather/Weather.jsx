import useOpenWeather from "../../Providers/openWeather/useOpenWeather";
import ReactWeather from "./ReactWeather";
const Weather = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '67d5b16a33ca3e2060d57f495434a2fa',
    lat: '48.137154',
    lon: '11.576124',
    lang: 'en',
    unit: 'metric',
  });

  return (
    <div className="px-20 py-6">
      <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Munich"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
    


    </div>
  );
};

export default Weather;