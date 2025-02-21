
import React from "react";

const Logo = () => {
  return (
    <div className="relative w-28 h-28 mx-auto mb-5 md:mb-8">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-pulse"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="animate-gradient-flow">
              <animate
                attributeName="stop-color"
                values="#3B82F6;#10B981;#3B82F6"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" className="animate-gradient-flow">
              <animate
                attributeName="stop-color"
                values="#10B981;#3B82F6;#10B981"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          d="M50 15
             Q 65 15 75 25
             Q 85 35 85 50
             Q 85 65 75 75
             Q 65 85 50 85
             Q 35 85 25 75
             Q 15 65 15 50
             Q 15 35 25 25
             Q 35 15 50 15
             M50 35
             L 65 50
             L 50 65
             L 35 50
             Z"
          fill="url(#logoGradient)"
          filter="url(#glow)"
          className="transform-origin-center"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="20s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <div className="absolute inset-0 blur-[0.4px] [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1)_60%,rgba(255,255,255,0)_90%)]"></div>
    </div>
  );
};

export default Logo;
