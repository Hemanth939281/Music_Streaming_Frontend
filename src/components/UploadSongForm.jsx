import React, { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function UploadSongForm() {
  const user = useSelector(( store ) => store?.user);

  const titleRef = useRef();
  const movieRef = useRef();
  const albumRef = useRef();
  const genreRef = useRef();
  const releaseYearRef = useRef();
  const coverImageRef = useRef();
  const songFileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Upload file to Cloudinary with progress tracking
  const uploadToCloudinary = async (file, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "songs_uploaded"); 
    formData.append("folder", folder);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dffr1kcqq/upload", 
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      );
      return res.data.secure_url; 
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  // Handling cover image preview
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);

    // Get file inputs
    const coverImage = coverImageRef.current.files[0];
    const songFile = songFileRef.current.files[0];

    // Upload files to Cloudinary
    const coverImageUrl = await uploadToCloudinary(coverImage, "song_covers");
    const songUrl = await uploadToCloudinary(songFile, "songs");

    if (!coverImageUrl || !songUrl) {
      alert("File upload failed. Please try again.");
      setLoading(false);
      return;
    }

    // Prepare song data
    const songData = {
      title: titleRef?.current?.value,
      movieName: movieRef?.current?.value || null,
      albumName: albumRef?.current?.value || "single",
      genre: genreRef?.current?.value,
      releaseYear: parseInt(releaseYearRef?.current?.value),
      coverImageUrl,
      songUrl,
      uploadedBy: user?.user?.id
    };
    console.log(songData);

    // Sending song data to backend
    try {
      const res = await axios.post("https://music-streaming-backend-zs5a.onrender.com/songs/", songData);
      console.log("Song Uploaded:", res.data);
      
      // Show success message
      setUploadProgress(100);
      setTimeout(() => {
        alert("Song uploaded successfully!");
        // Resetting form
        e.target.reset();
        setCoverPreview(null);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload song.");
    } finally {
      setLoading(false);
    }
  };

  // Getting current year for the release year input max
  const currentYear = new Date().getFullYear();

  return (
    <div className=" mt-10 max-w-xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 text-white mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Upload Your Music</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column - Text inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Song Title*</label>
              <input 
                ref={titleRef} 
                type="text" 
                required 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all" 
                placeholder="Enter song title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Movie Name</label>
              <input 
                ref={movieRef} 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all" 
                placeholder="Optional"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Album Name</label>
              <input 
                ref={albumRef} 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all" 
                placeholder="Default: Single"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre*</label>
              <input 
                ref={genreRef} 
                type="text" 
                required 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all" 
                placeholder="e.g. Pop, Rock, Hip-hop"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Release Year*</label>
              <input 
                ref={releaseYearRef} 
                type="number" 
                min="1900" 
                max={currentYear} 
                required 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all" 
                placeholder={currentYear.toString()}
              />
            </div>
          </div>
          
          {/* Right column - File uploads and preview */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image*</label>
              <div 
                className={`flex items-center justify-center w-full h-40 bg-gray-50 border-2 ${coverPreview ? 'border-gray-200' : 'border-dashed border-gray-300'} rounded-lg overflow-hidden mb-2`}
              >
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">click to select</p>
                  </div>
                )}
              </div>
              <input 
                ref={coverImageRef} 
                type="file" 
                accept="image/*" 
                required
                onChange={handleCoverImageChange}
                className="w-full text-sm  file:bg-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:text-white hover:file:bg-gray-600 cursor-pointer file:cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Song File*</label>
              <div className="w-full px-4 py-2 rounded-lg border border-gray-300 flex items-center">
                <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <input 
                  ref={songFileRef} 
                  type="file" 
                  accept="audio/*" 
                  required 
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-500 file:text-white hover:file:bg-gray-600 cursor-pointer file:cursor-pointer"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Supported formats: MP3, WAV, OGG (Max 10MB)</p>
            </div>
          </div>
        </div>

        {/* Upload progress */}
        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gray-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <p className="text-xs text-gray-500 mt-1 text-right">{uploadProgress}% Complete</p>
          </div>
        )}

        {/* Submit button */}
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Song
            </>
          )}
        </button>
      </form>
    </div>
  );
}