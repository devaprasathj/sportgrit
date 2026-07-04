import React from 'react';

export default function Logo({ size = 'sm' }) {
  const sizes = {
    sm: { svg: 'w-12 h-12', text: 'text-lg', padding: 'p-2' },
    md: { svg: 'w-16 h-16', text: 'text-xl', padding: 'p-3' },
    lg: { svg: 'w-24 h-24', text: 'text-3xl', padding: 'p-4' },
  };

  const sizeClass = sizes[size] || sizes.sm;

  return (
    <div className={`logo-container flex flex-col items-center ${sizeClass.padding}`}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClass.svg} drop-shadow-lg`}
      >
        <path
          d="M100 20 L110 10 L130 15 L140 30 L160 35 L165 55 L180 65 L175 85 L185 100 L175 115 L180 135 L165 145 L160 165 L140 170 L130 185 L110 190 L100 180 L90 190 L70 185 L60 170 L40 165 L35 145 L20 135 L25 115 L15 100 L25 85 L20 65 L35 55 L40 35 L60 30 L70 15 L90 10 Z"
          fill="#2c3e50"
          stroke="#95a5a6"
          strokeWidth="2"
        />

        <circle
          cx="100"
          cy="100"
          r="55"
          fill="none"
          stroke="#2ecc71"
          strokeWidth="3"
          style={{ filter: 'drop-shadow(0 0 5px #2ecc71)' }}
        />

        <path d="M85 45 L90 35 L100 42 L110 35 L115 45 Z" fill="#ecf0f1" />

        <g fill="#ecf0f1">
          <circle cx="115" cy="75" r="5" />
          <path
            d="M110 80 L90 95 L105 110 L95 135 M105 110 L125 130"
            stroke="#ecf0f1"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M110 85 L130 80 L140 65"
            stroke="#ecf0f1"
            strokeWidth="4"
            fill="none"
          />
        </g>

        <path
          d="M70 80 H90 M70 100 H85 M75 120 H95"
          stroke="#2ecc71"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {size !== 'sm' && (
        <h1 className={`logo-text ${sizeClass.text} text-white font-black tracking-widest mt-2 uppercase italic`}>
          SPORT<span className="text-green-500">GRIT</span>
        </h1>
      )}
    </div>
  );
}
