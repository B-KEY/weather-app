import React, { useState, useEffect, useRef, useCallback } from 'react';
import { searchLocations } from '../services/geocodingService';
import { getTranslation } from '../utils/translations';
import { MdClose, MdHistory } from 'react-icons/md';
import debounce from 'lodash/debounce';

const RECENT_SEARCHES_KEY = 'recentSearches';
const MAX_RECENT_SEARCHES = 5;

const LocationSearch = ({ onLocationSelect, loading, language }) => {
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchValue) => {
      if (searchValue.length >= 2) {
        setSearchLoading(true);
        setError('');
        try {
          const results = await searchLocations(searchValue, language);
          setLocations(results);
          setShowDropdown(true);
          if (results.length === 0) {
            setError(getTranslation(language, 'noResults'));
          }
        } catch (error) {
          setError(getTranslation(language, 'searchError'));
          console.error('Error searching locations:', error);
        } finally {
          setSearchLoading(false);
        }
      }
    }, 300),
    [language]
  );

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle recent searches
  const addToRecentSearches = (location) => {
    const newRecent = [
      {
        name: location.name,
        state: location.state || '',
        country: location.country,
        lat: location.lat,
        lon: location.lon
      },
      ...recentSearches.filter(item => 
        !(item.lat === location.lat && item.lon === location.lon)
      )
    ].slice(0, MAX_RECENT_SEARCHES);
    
    setRecentSearches(newRecent);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newRecent));
  };

  // Input handlers
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setSelectedIndex(-1);

    if (value.length >= 2) {
      debouncedSearch(value);
    } else {
      setLocations([]);
      setShowDropdown(false);
      setError('');
    }
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || locations.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < locations.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleLocationClick(locations[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleLocationClick = (location) => {
    try {
      // Format the location name with country
      const countryName = new Intl.DisplayNames([language], { type: 'region' })
        .of(location.country);
      
      // Set the search text with proper formatting
      setSearchText(`${location.name}, ${location.state ? `${location.state}, ` : ''}${countryName}`);
      setShowDropdown(false);
      setSelectedIndex(-1);
      addToRecentSearches(location);
      onLocationSelect(location.lat, location.lon);
    } catch (error) {
      // Fallback if Intl.DisplayNames fails
      setSearchText(`${location.name}, ${location.state ? `${location.state}, ` : ''}${location.country}`);
      console.error('Error formatting location name:', error);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    setLocations([]);
    setShowDropdown(false);
    setError('');
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={searchText}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            placeholder={getTranslation(language, 'searchPlaceholder')}
            className="w-full px-6 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={loading}
            aria-label={getTranslation(language, 'searchPlaceholder')}
            aria-controls="location-dropdown"
            aria-expanded={showDropdown}
          />
          {searchText && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              aria-label={getTranslation(language, 'clearSearch')}
            >
              <MdClose size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && locations.length > 0 && (
        <div 
          id="location-dropdown"
          className="absolute z-50 w-full mt-2 bg-gray-800/90 backdrop-blur-md rounded-xl shadow-lg border border-white/10 max-h-60 overflow-y-auto"
        >
          {locations.map((location, index) => (
            <button
              key={`${location.lat}-${location.lon}-${index}`}
              onClick={() => handleLocationClick(location)}
              className={`w-full px-4 py-3 text-left text-white 
                ${index === selectedIndex ? 'bg-white/20' : 'hover:bg-white/10'} 
                transition-colors flex items-center justify-between`}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <span className="flex flex-col">
                <span className="font-medium">{location.name}</span>
                <span className="text-sm text-white/70">
                  {location.state && `${location.state}, `}
                  {new Intl.DisplayNames([language], { type: 'region' }).of(location.country)}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {showDropdown && searchLoading && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800/90 backdrop-blur-md rounded-xl p-4 text-center text-white/70">
          Searching...
        </div>
      )}
    </div>
  );
};

export default LocationSearch;