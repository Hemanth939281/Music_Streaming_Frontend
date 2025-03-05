import { FaPlay, FaMusic, FaHeadphones } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {

   
  return (
    <div>
        
        
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white flex flex-col justify-center items-center sticky top-5">
          {/* Hero Section */}
          <section
            className="flex flex-col items-center justify-center text-center py-20 px-4 sm:px-8"
            data-aos="fade-up"
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
              Feel the <span className="text-indigo-500">Vibe</span>, Enjoy the <span className="text-pink-500">Beat</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl">
              Discover millions of songs, playlists, and trending music at your fingertips.
            </p>
            <Link to="/songs" >
            <button className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-lg rounded-lg flex items-center gap-2 cursor-pointer">
              <FaPlay /> Start Listening
            </button>
            </Link>
          </section>
        </div>
    </div>
  )
}

export default Home