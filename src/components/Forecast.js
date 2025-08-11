import React from 'react';

function Forecast({ data }) {
  if (!data) return null;

  // Filter data to get one forecast per day (every 8th item = 24h, as API gives 3h intervals)
  const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5); // show next 5 days

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-cards">
        {dailyData.map((item, index) => (
          <div key={index} className="forecast-card">
            <p className="date">{item.dt_txt.split(' ')[0]}</p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <p>{item.main.temp.toFixed(1)}°C</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;

