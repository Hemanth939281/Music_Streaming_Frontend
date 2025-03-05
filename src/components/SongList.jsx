// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { setSongs } from '../redux/features/songSlice';

// // const SongList = () => {
// //   const [filteredSongs, setFilteredSongs] = useState([]);
// //   const [genres, setGenres] = useState([]);
// //   const [selectedGenre, setSelectedGenre] = useState('all');
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const songs =  useSelector((store) => store.song.songs);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     const fetchSongs = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await fetch('http://localhost:5000/songs/');
        
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch songs');
// //         }
        
// //         const data = await response.json();

// //         dispatch(setSongs(data));

// //         setFilteredSongs(data);
        
// //         // Extracting unique genres
// //         const uniqueGenres = [...new Set(data.map(song => song.genre))];
// //         setGenres(uniqueGenres);
        
// //         setIsLoading(false);
// //       } catch (err) {
// //         setError(err.message);
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchSongs();
// //   }, [dispatch]);

// //   // Handle genre filter change
// //   const handleGenreChange = (e) => {
// //     const genre = e.target.value;
// //     setSelectedGenre(genre);
    
// //     if (genre === 'all') {
// //       setFilteredSongs(songs);
// //     } else {
// //       const filtered = songs.filter(song => song.genre === genre);
// //       setFilteredSongs(filtered);
// //     }
// //   };

// //   if (isLoading) return <div className="text-center p-6">Loading songs...</div>;
// //   if (error) return <div className="text-red-500 p-6">Error: {error}</div>;

// //   return (
// //     <div className='min-h-screen w-full text-black bg-gray-200'>
// //       <div className="max-w-6xl mx-auto p-4 sm:p-6">
// //       <h1 className="text-2xl font-bold mb-6 lg:mb-12 text-center">Songs Library</h1>
      
// //       {/* Genre Filter Dropdown */}
// //       <div className="mb-16 flex justify-center">
// //         <label htmlFor="genre-filter" className="sr-only">
// //           Filter by Genre:
// //         </label>
// //         <select
// //           id="genre-filter"
// //           value={selectedGenre}
// //           onChange={handleGenreChange}
// //           className="w-full sm:w-64 p-2 border border-gray-300 rounded-md"
// //         >
// //           <option value="all">All Genres</option>
// //           {genres.map(genre => (
// //             <option key={genre} value={genre} className='text-black'>
// //               {genre.charAt(0).toUpperCase() + genre.slice(1)}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
      
// //       {/* Songs Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //         {filteredSongs?.length > 0 ? (
// //           filteredSongs?.map(song => (
// //             <div key={song?._id} className="flex flex-col justify-between bg-gray-100 rounded-lg shadow-md overflow-hidden shadow-md shadow-white group hover:rotate-5 transition-all duration-300">
// //               <img
// //                 src={song.coverImageUrl}
// //                 alt={`${song?.title} cover`}
// //                 className="w-full h-48 group-hover:scale-110 transition-all duration-300"
// //               />
// //               <div className="p-4">
// //                 <h2 className="font-bold text-lg text-gray-700">{song?.title}</h2>
// //                 <p className="text-gray-700">
// //                   {song.movieName !== "single" ? `Movie: ${song?.movieName}` : "Single"}
// //                 </p>
// //                 <p className="text-gray-700">Genre: {song?.genre}</p>
// //                 <p className="text-gray-700">Year: {song?.releaseYear}</p>

// //                 <audio controls className="w-full mt-2">
// //                   <source src={song.songUrl} type="audio/mp3" />
// //                   Your browser does not support the audio element.
// //                 </audio>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="col-span-full text-center p-6">
// //             No songs found for the selected genre.
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //     </div>
// //   );
// // };

// // export default SongList;


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSongs } from '../redux/features/songSlice';
// import CustomAudioPlayer from './CustomAudioPlayer'; 

// const SongList = () => {
//   const [filteredSongs, setFilteredSongs] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState('all');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSong, setSelectedSong] = useState(null);
//   const songs = useSelector((store) => store.song.songs);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('http://localhost:5000/songs/');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch songs');
//         }
        
//         const data = await response.json();

//         dispatch(setSongs(data));

//         setFilteredSongs(data);
        
//         // Extracting unique genres
//         const uniqueGenres = [...new Set(data.map(song => song.genre))];
//         setGenres(uniqueGenres);
        
//         setIsLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setIsLoading(false);
//       }
//     };

//     fetchSongs();
//   }, [dispatch]);

//   // Handle genre filter change
//   const handleGenreChange = (e) => {
//     const genre = e.target.value;
//     setSelectedGenre(genre);
    
//     if (genre === 'all') {
//       setFilteredSongs(songs);
//     } else {
//       const filtered = songs.filter(song => song.genre === genre);
//       setFilteredSongs(filtered);
//     }
//   };

//   if (isLoading) return <div className="text-center p-6">Loading songs...</div>;
//   if (error) return <div className="text-red-500 p-6">Error: {error}</div>;

//   return (
//     <div className='min-h-screen w-full text-black bg-gray-200'>
//       <div className="max-w-6xl mx-auto p-4 sm:p-6">
//         <h1 className="text-2xl font-bold mb-6 lg:mb-12 text-center">Songs Library</h1>
        
//         {/* Genre Filter Dropdown */}
//         <div className="mb-16 flex justify-center">
//           <label htmlFor="genre-filter" className="sr-only">
//             Filter by Genre:
//           </label>
//           <select
//             id="genre-filter"
//             value={selectedGenre}
//             onChange={handleGenreChange}
//             className="w-full sm:w-64 p-2 border border-gray-300 rounded-md"
//           >
//             <option value="all">All Genres</option>
//             {genres.map(genre => (
//               <option key={genre} value={genre} className='text-black'>
//                 {genre.charAt(0).toUpperCase() + genre.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         {/* Songs Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredSongs?.length > 0 ? (
//             filteredSongs?.map(song => (
//               <div 
//                 key={song?._id} 
//                 className="flex flex-col justify-between bg-gray-100 rounded-lg shadow-md overflow-hidden shadow-md shadow-white group hover:rotate-5 transition-all duration-300"
//                 onClick={() => setSelectedSong(song)}
//               >
//                 <img
//                   src={song.coverImageUrl}
//                   alt={`${song?.title} cover`}
//                   className="w-full h-48 group-hover:scale-110 transition-all duration-300"
//                 />
//                 <div className="p-4">
//                   <h2 className="font-bold text-lg text-gray-700">{song?.title}</h2>
//                   <p className="text-gray-700">
//                     {song.movieName !== "single" ? `Movie: ${song?.movieName}` : "Single"}
//                   </p>
//                   <p className="text-gray-700">Genre: {song?.genre}</p>
//                   <p className="text-gray-700">Year: {song?.releaseYear}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center p-6">
//               No songs found for the selected genre.
//             </div>
//           )}
//         </div>

//         {/* Custom Audio Player Modal */}
//         {selectedSong && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
//               <button 
//                 onClick={() => setSelectedSong(null)}
//                 className="absolute top-2 right-2 text-gray-600 hover:text-black"
//               >
//                 ✕
//               </button>
//               <CustomAudioPlayer song={selectedSong} />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SongList;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSongs } from '../redux/features/songSlice';
import CustomAudioPlayer from './CustomAudioPlayer'; 

const SongList = () => {
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const songs = useSelector((store) => store.song.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/songs/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        
        const data = await response.json();

        dispatch(setSongs(data));

        setFilteredSongs(data);
        
        // Extracting unique genres
        const uniqueGenres = [...new Set(data.map(song => song.genre))];
        setGenres(uniqueGenres);
        
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [dispatch]);

  // Handle genre filter change
  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    
    if (genre === 'all') {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song => song.genre === genre);
      setFilteredSongs(filtered);
    }
  };

  if (isLoading) return <div className="text-center p-6">Loading songs...</div>;
  if (error) return <div className="text-red-500 p-6">Error: {error}</div>;

  return (
    <div className='min-h-screen w-full text-black bg-gray-200 pb-20'>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-6 lg:mb-12 text-center">Songs Library</h1>
        
        {/* Genre Filter Dropdown */}
        <div className="mb-16 flex justify-center">
          <label htmlFor="genre-filter" className="sr-only">
            Filter by Genre:
          </label>
          <select
            id="genre-filter"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="w-full sm:w-64 p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre} className='text-black'>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Songs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSongs?.length > 0 ? (
            filteredSongs?.map(song => (
              <div 
                key={song?._id} 
                className="flex flex-col justify-between bg-gray-100 rounded-lg shadow-md overflow-hidden shadow-md shadow-white group hover:rotate-5 transition-all duration-300"
                onClick={() => setSelectedSong(song)}
              >
                <img
                  src={song.coverImageUrl}
                  alt={`${song?.title} cover`}
                  className="w-full h-48 group-hover:scale-110 transition-all duration-300"
                />
                <div className="p-4">
                  <h2 className="font-bold text-lg text-gray-700">{song?.title}</h2>
                  <p className="text-gray-700">
                    {song.movieName !== "single" ? `Movie: ${song?.movieName}` : "Single"}
                  </p>
                  <p className="text-gray-700">Genre: {song?.genre}</p>
                  <p className="text-gray-700">Year: {song?.releaseYear}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-6">
              No songs found for the selected genre.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Audio Player */}
{selectedSong && (
  <div className="fixed bottom-0 left-0 w-full text-white p-3 flex items-center justify-between shadow-xl z-50">

    {/* Audio Player */}
    <div className="flex-grow mx-6">
      <CustomAudioPlayer song={selectedSong} />
    </div>

    {/* Close Button */}
    <button 
      onClick={() => setSelectedSong(null)}
      className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-red-600 text-white rounded-full shadow-md transition-all"
    >
      ✕
    </button>
  </div>
)}


    </div>
  );
};

export default SongList;
