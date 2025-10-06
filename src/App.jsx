import './App.css'
import React, { useState, useEffect } from 'react'
import Data from './components/Data'
import Good from './components/Good'


function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Random index generate karte hain
      const randomIndex = Math.floor(Math.random() * Good.length);
      setCurrentIndex(randomIndex);
    }, 25000); // 25 seconds

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-screen w-full">
      {/* Background Video */}
      <video
        key={Good[currentIndex].id} // important for reload
        autoPlay
        playsInline
        loop={true}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 transition-all duration-700"
      >
        <source src={Good[currentIndex].url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
