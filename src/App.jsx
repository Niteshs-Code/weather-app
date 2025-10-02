import './App.css'
import video from "./assets/midday.mp4"
import meadows from "./assets/meadows.mp4"

function App() {


  return (
    <>
        <div className="relative h-screen w-full">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="https://www.pexels.com/download/video/2113097/" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-black/40">
        <h1 className="text-4xl font-bold">Hello React</h1>
        <p className="mt-4 text-lg">This is on top of video background</p>
      </div>
    </div>
    </>
  )
}

export default App
