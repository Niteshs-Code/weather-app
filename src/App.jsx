import './App.css'
import React, { useState, useEffect } from 'react'
import Data from './components/Data'
import Good from './components/Good'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null); // for preloading
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * Good.length);
      setNextIndex(randomIndex); // preload next
      setFade(true); // trigger fade-out
    }, 25000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // jab fade complete ho jaye
  useEffect(() => {
    if (fade && nextIndex !== null) {
      const timeout = setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex(null);
        setFade(false); // fade reset
      }, 1000); // fade duration
      return () => clearTimeout(timeout);
    }
  }, [fade, nextIndex]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Current Video */}
      <video
        key={Good[currentIndex].id}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${fade ? "opacity-0" : "opacity-100"}`}
      >
        <source src={Good[currentIndex].url} type="video/mp4" />
      </video>

      {/* Preload Next Video (invisible) */}
      {nextIndex !== null && (
        <video
          key={Good[nextIndex].id}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
        >
          <source src={Good[nextIndex].url} type="video/mp4" />
        </video>
      )}

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div className="lg:w-1/3 w-full bg-black/20 backdrop-blur-2xl rounded-3xl">
          <Data />
        </div>
      </div>
    </div>
  );
}

export default App;
