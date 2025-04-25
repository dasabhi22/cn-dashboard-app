import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // For animations
import useDashboardStore from '../store/dashboardStore'; // Zustand store for global state

//acceppt a prop to trigger the "Add Widget" modal
const Header = ({ onAddWidget }) => {
  // Zustand store function to set global search query
  const setSearchQuery = useDashboardStore(state => state.setSearchQuery);

  // Local state for various UI controls
  const [days, setDays] = useState(7); // Default filter duration
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Search input focus effect
  const [searchValue, setSearchValue] = useState(''); // Search input value

  // Predefined day options for filtering
  const dayOptions = [1, 7, 14, 30, 90];

  // Handles search input changes and updates global state
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearchQuery(value);
  };

  // Handles day selection from dropdown
  const handleDaySelect = (day) => {
    setDays(day);
    setShowDropdown(false);
  };

  // Closes dropdown menu if clicked outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showDropdown) setShowDropdown(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  return (
    <motion.header 
      className="bg-white shadow backdrop-blur-sm bg-white/95 sticky top-0 z-10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Container layout */}
      <div className="container mx-auto py-4 px-6 flex flex-col md:flex-row items-center justify-between">

        {/* Logo and Title */}
        <motion.div 
          className="w-full md:w-auto mb-4 md:mb-0 flex items-center"
          whileHover={{ scale: 1.02 }}
        >
          {/* Animated letter logo */}
          <motion.div
            className="w-8 h-8 mr-2 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold"
            whileHover={{ rotate: 5 }}
          >
            C
          </motion.div>

          {/* Dashboard title */}
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            CNAPP Dashboard
          </h1>
        </motion.div>

        {/* Search bar, Add Widget, and Day Filter */}
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 w-full md:w-auto">

          {/* Search input with focus effect */}
          <motion.div 
            className={`relative w-full md:w-64 transition-all duration-300 ${isSearchFocused ? 'md:w-72' : 'md:w-64'}`}
          >
            <input
              type="text"
              placeholder="Search anything..."
              value={searchValue}
              className={`pl-9 pr-4 py-2 border rounded-md w-full transition-all duration-300 ${
                isSearchFocused ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'
              }`}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />

            {/* Search icon */}
            <svg 
              className={`absolute left-3 top-2.5 w-4 h-4 transition-colors ${
                isSearchFocused ? 'text-blue-500' : 'text-gray-400'
              }`}
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            {/* Clear search button (X) */}
            {searchValue && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setSearchValue('');
                  setSearchQuery('');
                }}
              >
                <svg 
                  className="w-4 h-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </motion.div>

          {/* Add Widget Button */}
          <motion.button
            onClick={onAddWidget}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md px-4 py-2 flex items-center space-x-1 shadow-md hover:shadow-lg flex-1 md:flex-none justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <span>Add Widget</span>
            <svg 
              className="w-4 h-4 ml-1" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </motion.button>

          {/* Days filter dropdown */}
          <div className="relative flex-1 md:flex-none">
            <motion.button
              className={`border ${showDropdown ? 'border-blue-400 bg-blue-50' : 'border-gray-300'} rounded-md px-4 py-2 flex items-center justify-center space-x-2 hover:bg-gray-50 w-full`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent outside click listener from triggering
                setShowDropdown(!showDropdown);
              }}
              whileHover={{ backgroundColor: '#f7fafc' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-blue-700 font-semibold">Last {days} days</span>
              <svg 
                className={`w-4 h-4 text-blue-700 transition-transform duration-200 ${showDropdown ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>

            {/* Dropdown list with day options */}
            {showDropdown && (
              <motion.div 
                className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {dayOptions.map((day) => (
                  <motion.div
                    key={day}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${days === day ? 'bg-blue-100 text-blue-700' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent closing the dropdown immediately
                      handleDaySelect(day);
                    }}
                    whileHover={{ backgroundColor: '#ebf5ff' }}
                  >
                    Last {day} {day === 1 ? 'day' : 'days'}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
