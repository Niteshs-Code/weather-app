import './App.css'
import video from "./assets/midday.mp4"
import meadows from "./assets/meadows.mp4"
import Data from './components/Data'
import Good from "./component/Good"
import Bad from './components/Bad'

function App() {
// "https://www.pexels.com/download/video/2113097/"

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
        <source src={meadows} type="video/mp4" />
        Your browser does not support the ideo tag.
      </video>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center  justify-center h-full text-white rounded-3xl ">
      <div className='w-1/3 bg-black/20 backdrop-blur-2xl p-2 h-auto rounded-3xl'><Data/></div>
      </div>
    </div>
    </>
  )
}

export default App
