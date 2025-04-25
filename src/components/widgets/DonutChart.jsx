import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * DonutChart Component
 * Displays a dynamic and animated donut chart based on provided data.
 */
const DonutChart = ({ data }) => {
  const { total, items } = data;

  // Chart configurations
  const size = 120; // Diameter of the chart
  const strokeWidth = 20; // Thickness of the chart ring
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Total circumference of the circle

  // State to manage hover effect and animation trigger
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);

  // Prepare segment data based on items
  const segments = [];
  let currentOffset = 0;

  items.forEach((item, index) => {
    const percent = item.value / total;
    const dashLength = percent * circumference;

    segments.push({
      ...item,
      index,
      percent,
      dashLength,
      dashArray: `${dashLength} ${circumference}`,
      dashOffset: -currentOffset
    });

    currentOffset += dashLength; // Update offset for next segment
  });

  // Trigger animation reset whenever the data changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className="flex items-center justify-between h-full">
      {/* SVG Donut Chart */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle (acts as base for chart) */}
          <circle
            cx={size/2}
            cy={size/2}
            r={radius}
            fill="transparent"
            stroke="#f1f1f1"
            strokeWidth={strokeWidth}
          />

          {/* Render each segment of the donut with animation */}
          {segments.map((segment, index) => (
            <motion.circle
              key={index}
              cx={size/2}
              cy={size/2}
              r={radius}
              fill="transparent"
              stroke={segment.color}
              strokeWidth={hoveredSegment === index ? strokeWidth + 3 : strokeWidth} // Increase stroke on hover
              strokeDasharray={segment.dashArray}
              initial={{ strokeDashoffset: circumference }}
              animate={{
                strokeDashoffset: isAnimating ? circumference : segment.dashOffset,
                transition: { duration: 1, ease: "easeInOut" }
              }}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
              transform={`rotate(-90 ${size/2} ${size/2})`} // Start chart from top
              style={{ cursor: 'pointer' }}
            />
          ))}
        </svg>

        {/* Centered total value inside the donut */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </motion.div>
      </div>

      {/* Legend showing each segment's label and value */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            className="flex items-center space-x-2 p-1 rounded-md"
            initial={{ x: 20, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              backgroundColor: hoveredSegment === index ? 'rgba(0,0,0,0.05)' : 'transparent'
            }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredSegment(index)}
            onMouseLeave={() => setHoveredSegment(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Color dot representing the segment */}
            <motion.div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
              animate={{ 
                scale: hoveredSegment === index ? 1.3 : 1,
                transition: { duration: 0.2 }
              }}
            />
            {/* Segment label and percentage */}
            <div className="text-sm">
              <div>
                {item.label} ({item.value}) - {Math.round((item.value / total) * 100)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
