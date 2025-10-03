import React, { useEffect, useState } from "react";

const API_KEY = "c496137eb55f738dee8288b80ae333c4"; // apna API key

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
console.log(weather)

  // 📌 Fetch weather by coordinates
  async function fetchByCoords(lat, lon) {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // 📌 Fetch weather by city name
  async function fetchByCity(cityName) {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // 📌 On mount → auto fetch by geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        () => setError("Location permission denied. Please search city.")
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🌤 Weather App</h1>

      {/* Search Box */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border px-3 py-2 flex-1"
        />
        <button
          onClick={() => fetchByCity(city)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Loading / Error / Data */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="bg-gray-100 p-4 rounded shadow mt-4 text-black">
            <h1>weather details</h1>
          <h2 className="text-lg font-semibold">{weather.name}</h2>
          <p className="capitalize">{weather.weather[0].description}</p>
          <h3 className="text-3xl font-bold"> feel likes{Math.round(weather.main.temp)}°C</h3>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>air presure {weather.main.pressure}</p>
          <p>visibility {weather.visibility}</p>
          
          <p>sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})}</p>
        </div>
      )}
    </div>
  );
}
