import React from 'react';
import { motion } from 'framer-motion';

/**
 * NoDataWidget Component
 * This component is shown when there is no graph data available.
 * It displays a simple animated icon, message, and a 'Refresh Data' button.
 */
const NoDataWidget = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-gray-400">
      
      {/* Animated SVG Icon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} // Icon starts slightly above with 0 opacity
        animate={{ opacity: 1, y: 0 }}   // Fades in and slides down
        transition={{ duration: 0.5 }}
      >
        <motion.svg 
          className="w-16 h-16 mb-2" // Icon size and margin
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          initial={{ rotate: -5 }} // Slight rotation on load
          animate={{ rotate: 5 }}  // Rotates back and forth (wiggle)
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 2,
            ease: "easeInOut" 
          }}
        >
          {/* SVG Path representing a chart or dashboard-like icon */}
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </motion.svg>
      </motion.div>

      {/* Informational message below the icon */}
      <motion.div 
        className="text-sm"
        initial={{ opacity: 0 }} // Initially hidden
        animate={{ opacity: 1 }} // Fade in
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        No Graph data available!
      </motion.div>

      {/* Refresh Button (styled, animated on hover) */}
      <motion.button
        className="mt-4 text-xs text-blue-500 border border-blue-500 rounded-full px-3 py-1"
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }} // Slight scale + hover color
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Refresh Data
      </motion.button>
    </div>
  );
};

export default NoDataWidget;
