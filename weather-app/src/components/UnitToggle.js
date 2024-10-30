import React from 'react';

const UnitToggle = ({ unit, setUnit }) => {
  return (
    <div className="flex gap-2 glass-effect rounded-lg p-1">
      <button
        onClick={() => setUnit('metric')}
        className={`px-4 py-2 rounded transition-all ${
          unit === 'metric' 
            ? 'bg-white/20 text-white font-bold' 
            : 'text-white/70 hover:text-white'
        }`}
        aria-label="Switch to Celsius"
      >
        °C
      </button>
      <button
        onClick={() => setUnit('imperial')}
        className={`px-4 py-2 rounded transition-all ${
          unit === 'imperial' 
            ? 'bg-white/20 text-white font-bold' 
            : 'text-white/70 hover:text-white'
        }`}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle; 