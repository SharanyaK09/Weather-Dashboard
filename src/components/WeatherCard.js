import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';


const WeatherCard = ({ data }) => {
  if (!data) return <p>No data available. Search a city.</p>;

  const getBackgroundColor = (description) => {
    if (description.includes('rain')) return '#1066f0ff';
    if (description.includes('cloud')) return '#b0c4de';
    if (description.includes('sun')) return '#ffa500';
    if (description.includes('clear')) return '#66bbdd';
    return '#ece9e6'; // default
  };

  return (
    <div
      className="weather-card"
      style={{ background: getBackgroundColor(data.weather[0].description) }}
    >
      <h2>{data.name}</h2>
      <p>{new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })}</p>
      <ReactAnimatedWeather
  icon={getWeatherIcon(data.weather[0].main)}
  color="white"
  size={64}
  animate={true}
/>


      <div className="temperature">{data.main.temp}°C</div>
    
      <p>Condition: {data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
};
function getWeatherIcon(condition) {
  switch(condition) {
    case 'Clear':
      return 'CLEAR_DAY';
    case 'Clouds':
      return 'CLOUDY';
    case 'Rain':
      return 'RAIN';
    case 'Drizzle':
      return 'SLEET';
    case 'Thunderstorm':
      return 'WIND'; // react-animated-weather has no thunderstorm icon; WIND can be used or fallback to RAIN
    case 'Snow':
      return 'SNOW';
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
    case 'Ash':
      return 'FOG';
    case 'Squall':
    case 'Tornado':
      return 'WIND';
    default:
      return 'PARTLY_CLOUDY_DAY';
  }
}


export default WeatherCard;
