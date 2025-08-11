import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';

import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = async (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const currentResponse = await axios.get(currentUrl);
      setWeatherData(currentResponse.data);

      const forecastResponse = await axios.get(forecastUrl);
      setForecastData(forecastResponse.data);

      // Update recent searches
      setRecentSearches(prev => {
        const updated = [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())];
        return updated.slice(0, 5); // keep only 5 recent
      });

    } catch (error) {
      console.error('Error fetching data:', error);
      setWeatherData(null);
      setForecastData(null);
    }
  };
  const handleDelete = (cityToDelete) => {
    setRecentSearches((prev) =>
      prev.filter((city) => city.toLowerCase() !== cityToDelete.toLowerCase())
    );
  };


  return (
    <div className="app">
      <h1><i className="fas fa-cloud-sun"></i> Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Display Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h3>Recent Searches:</h3>
          <ul>
            {recentSearches.map((city, index) => (
              <li key={index} className="search-item">
                <span onClick={() => handleSearch(city)}>{city}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(city)}
                  title="Delete"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

        </div>
      )}

      <WeatherCard data={weatherData} />
      <Forecast data={forecastData} />
    </div>
  );
}

export default App;
