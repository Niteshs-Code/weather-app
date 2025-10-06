import React, { use, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import sunrise from "../images/sunrise.png"
import sunset from "../images/sunset.png"
import moon from "../images/moon.png"
import rainyday from "../images/rainy-day.png"
import rainy from "../images/rainy.png"
import snow from "../images/snow.png"
import sun from "../images/sun.png"
import thunder from "../images/thunder.png"
import wind from "../images/wind.png"
import cloud from "../images/cloud.png"




const API_KEY = "c496137eb55f738dee8288b80ae333c4"; // apna API key

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setshow] = useState(false)
  console.log(weather)
  const weathers = [moon, rainy, rainyday, snow, sun, thunder, wind];



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
      setshow(false)
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
    <>
      <div className="p-2 max-w-md mx-auto text-center ">
        <div className=" flex justify-between items-center mb-3 ml-2 mr-2">{weather && (<><div className=" flex items-center text-left m-0 p-0  "><FaLocationDot className="inline mt-3 m-1 text-1xl" />
          <h1 className="text-3xl font-bold inline ">{weather.name}</h1></div>

          <button onClick={() => setshow(true)}><FiSearch className="text-2xl m-2" /></button>
        </>)} </div>



        {/* Search Box */}
        {show && <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className=" px-3 py-2 flex-1 bg-white/10 rounded-2xl focus:outline-none focus:border-none"
          />
          <button
            onClick={() => fetchByCity(city)}
            className="bg-blue-500 text-white px-4 py-2 font-bold rounded-xl cursor-pointer hover:bg-blue-800"
          >
            Search
          </button>
        </div>}

        {/* Loading / Error / Data */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {weather && (
          <div className="bg-gray-800/15 p-4 rounded shadow mt-4 text-white ">
            <div className=" flex flex-row"><h3 className="text-5xl font-medium inline ">{Math.round(weather.main.temp)}</h3>

              <div className="ml-1   flex-col text-left  space-y-1"><p className="text-sm">°C</p><p className="capitalize font-semibold pl-1">{weather.weather[0].description}</p>
              </div>

            </div>

            <div className="flex space-x-1.5 pt-2 text-sm font-semibold"><p>{new Date(weather.dt * 1000).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              weekday: "short"
            })}</p> <p className="ml-4">{Math.round(weather.main.temp_max)}°C / {Math.floor(weather.main.temp_min) - 3}°C</p></div>
            <div className=" mt-1">
              <h2 className="font-bold text-sm text-left">Climate:</h2>
              <div className="flex justify-between items-center pl-2 pr-2 mt-2">
                <p className="text-2xl">{weather.weather[0].main}</p>

                {
                  (() => {
                    const main = weather.weather[0].main.toLowerCase(); // e.g. "clouds"

                    // mapping of weather types to image
                    const weatherImages = {
                      clear: sun,
                      clouds: cloud,
                      rain: rainy,
                      snow: snow,
                      thunderstorm: thunder,
                      wind: wind,
                      night: moon
                    };

                    // match image based on API data
                    const matchedImg = weatherImages[main];

                    // agar match mil gaya to show karo
                    if (matchedImg) {
                      return <img src={matchedImg} alt={main} className="w-10 h-10" />;
                    } else {
                      // optional fallback image
                      return <img src={sun} alt="default" className="w-10 h-10" />;
                    }
                  })()
                }
              </div></div>

            <hr className="mt-1 blur-[1px]" />
            <div className="pt-3 flex justify-between items-center pl-2 pr-2 ">
              <div className="flex flex-col justify-center items-center"> <img src={sunrise} className="w-10 h-10" />
                <p>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })}</p></div>
              <div className="flex flex-col justify-center items-center"><img src={sunset} className="w-10 h-10" />
                <p>{new Date(weather.sys.sunset * 1000).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })}</p></div>

            </div>
            <hr className="m-2 blur-[1px]" />
            <div className="font-semibold w-[90%] bg-black/20 rounded-3xl p-1 mb-5 "><a href="">15-day Weather forecast</a></div>

            <div></div>

            <h1 className="font-semibold text-left mb-2 mt-10">weather details</h1>
            <div className="flex items-center justify-between mb-6  ">
              <p className="flex flex-col"><span className="text-gray-300 text-sm">Feel like</span><span className="font-semibold text-2xl">{Math.round(weather.main.temp)}°C</span></p><p className="flex flex-col "><span className="text-gray-300 text-sm">Humidity</span><span className="font-semibold text-2xl">{weather.main.humidity}%</span></p></div>
            <div className="flex items-center justify-between mb-6  ">
              <p className="flex flex-col"><span className="text-gray-300 text-sm">W wind</span><span className="font-semibold text-2xl">{weather.wind.speed} km/h</span></p><p className="flex flex-col "><span className="text-gray-300 text-sm">UV</span><span className="font-semibold text-2xl">Weak</span></p></div>
            <div className="flex items-center justify-between mb-6  ">
              <p className="flex flex-col"><span className="text-gray-300 text-sm">visibility</span><span className="font-semibold text-2xl">{String(weather.visibility).slice(0, 2)} Km</span></p><p className="flex flex-col "><span className="text-gray-300 text-sm">Air pressure</span><span className="font-semibold  text-2xl">{weather.main.pressure}hPa</span></p></div>







          </div>
        )}
      </div>
    </>
  );
}
