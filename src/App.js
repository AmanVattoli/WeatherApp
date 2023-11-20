import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const API_KEY = '18a309392cdfd28f719daeea0a93f05b';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search City..."
          type="text"
        />
      </div>
      <div className="city">
        <p>{data.name}</p>
      </div>
      <div className="container">
        {data.name !== undefined && (
          <div className="top">
            <div className="temp">
              <p>Current Temp</p>
              {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
            </div>
          </div>
        )}

        {data.name !== undefined && (
          <div className="middle">
            <div className="min_max">
              <p>
                Min Temp Expected&nbsp;&nbsp;&nbsp;Max Temp Expected
              </p>
              {data.main && (
                <h1>
                  {data.main.temp_min.toFixed()}°C&nbsp;&nbsp;&nbsp;
                  {data.main.temp_max.toFixed()}°C
                </h1>
              )}
            </div>
          </div>
        )}

        {data.name !== undefined && (
          <div className="bottom">
            <div className="description">
              {data.weather && (
                <>
                  <p>Weather</p>
                  <p className="bold">{data.weather[0].main}</p>
                  
                </>
              )}
            </div>
            <div className="humidity">
              {data.main && (
                <>
                  <p>Humidity</p>
                  <p className="bold">{data.main.humidity}%</p>
                  
                </>
              )}
            </div>
            <div className="wind">
              {data.wind && (
                <>
                  <p>Wind Speed</p>
                  <p className="bold">{data.wind.speed} MPH</p>
                  
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;