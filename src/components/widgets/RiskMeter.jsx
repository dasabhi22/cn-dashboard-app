import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RiskMeter = ({ data }) => {
  const { total, critical, high } = data;
  
  // Calculate the risk percentage for the meter
  const riskPercentage = Math.min(100, Math.round(((critical * 2) + high) / total * 100));
  
  // State for animation and interaction
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Determine the color based on the risk level
  const getColorForRisk = (percentage) => {
    if (percentage < 30) return '#4CAF50'; // Green
    if (percentage < 60) return '#FFC107'; // Yellow
    if (percentage < 80) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };
  
  const barColor = getColorForRisk(riskPercentage);
  
  // Risk level text
  const getRiskLevelText = (percentage) => {
    if (percentage < 30) return 'Low Risk';
    if (percentage < 60) return 'Medium Risk';
    if (percentage < 80) return 'High Risk';
    return 'Critical Risk';
  };

  // Reset animation when data changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [data]);
  
  return (
    <div className="h-full flex flex-col justify-center">
      <motion.div 
        className="mb-2 flex justify-between items-end"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-lg font-bold">{total} total vulnerabilities</div>
        <motion.div 
          className="text-sm font-medium px-3 py-1 rounded-full"
          style={{ 
            backgroundColor: `${barColor}20`, 
            color: barColor 
          }}
          whileHover={{ scale: 1.05 }}
        >
          {getRiskLevelText(riskPercentage)}
        </motion.div>
      </motion.div>
      
      <div 
        className="h-4 w-full bg-gray-200 rounded-full overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="h-full rounded-full relative"
          style={{ backgroundColor: barColor }}
          initial={{ width: '0%' }}
          animate={{ width: `${isAnimating ? 0 : riskPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Pulse effect */}
          {isHovered && (
            <motion.div
              className="absolute right-0 top-0 h-full w-2 rounded-full"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
        
        {/* Percentage indicator */}
        <motion.div
          className="absolute top-5 text-xs font-medium"
          style={{ 
            left: `${Math.min(Math.max(riskPercentage - 5, 0), 95)}%`,
            color: riskPercentage > 50 ? '#fff' : '#000'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {riskPercentage}%
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-6 flex space-x-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          style={{ cursor: 'pointer' }}
        >
          <div className="w-3 h-3 rounded-full bg-red-600"></div>
          <div className="text-sm">
            Critical ({critical}) - {Math.round((critical / total) * 100)}%
          </div>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          style={{ cursor: 'pointer' }}
        >
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <div className="text-sm">
            High ({high}) - {Math.round((high / total) * 100)}%
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RiskMeter;