import React from 'react';
import { MdMyLocation } from 'react-icons/md';

const GeoLocation = ({ onLocationSelect, loading }) => {
  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Successfully got location
          const { latitude, longitude } = position.coords;
          onLocationSelect(latitude, longitude);
        },
        (error) => {
          // Handle errors
          switch(error.code) {
            case error.PERMISSION_DENIED:
              alert("Please allow location access to use this feature.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("Location request timed out.");
              break;
            default:
              alert("An unknown error occurred.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <button
      onClick={handleGetLocation}
      disabled={loading}
      className="px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors disabled:opacity-50 backdrop-blur-sm flex items-center gap-2"
      title="Use current location"
    >
      <MdMyLocation className="text-2xl" />
      <span className="text-sm">Use Current Location</span>
    </button>
  );
};

export default GeoLocation; 