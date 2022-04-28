import React from 'react';
import './svg-zoom-data.css';

export default class ArtSVGs extends React.Component
{
  static Art = [
    {
      name: "Artful One",
      svg: (
        <svg x="0" y="0" viewBox="0 0 3000 3000">
          <defs>
            <linearGradient id="grad-1" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(0,0,0,1)" />
              <stop offset="1" stopColor="rgba(0,0,255,1)" />
            </linearGradient>
            <linearGradient id="grad-center" x1="0" y1="1250" x2="0" y2="1750" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(0,0,0,1)" />
              <stop offset="1" stopColor="rgba(255,0,0,1)" />
            </linearGradient>
            <linearGradient id="grad-left" x1="500" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(0,0,0,1)" />
              <stop offset="1" stopColor="rgba(255,0,0,1)" />
            </linearGradient>
            <linearGradient id="grad-right" x1="2000" y1="0" x2="2500" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,0,0,1)" />
              <stop offset="1" stopColor="rgba(0,0,0,1)" />
            </linearGradient>
            <radialGradient id="grad-ball-1" cx="25%">
              <stop offset="0%" stopColor="rgba(255,255,255,1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,1)" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" height="3000" width="3000" rx="25" fill="url(#grad-1)" />

          <rect
            x="500" y="500"
            height="500" width="500"
            rx="30"
            className="stroke-box sb-ani-top-left"
            fill="url(#grad-left)" />

          <rect
            x="500" y="2000"
            height="500" width="500"
            rx="30"
            className="stroke-box sb-ani-bottom-left"
            fill="url(#grad-left)" />

          <rect
            x="1250" y="1250"
            height="500" width="500"
            rx="30"
            className="stroke-box sb-ani-center"
            fill="url(#grad-center)" />

          <rect
            x="2000" y="500"
            height="500" width="500"
            rx="30"
            className="stroke-box sb-ani-top-right"
            fill="url(#grad-right)" />

          <rect
            x="2000" y="2000"
            height="500" width="500"
            rx="30"
            className="stroke-box sb-ani-bottom-right"
            fill="url(#grad-right)" />

        </svg>
      )
    },
    {
      name: "Artful Two",
      svg: (
        <svg x="0" y="0" viewBox="0 0 3000 3000">
          <defs>
            <radialGradient id="grad-ball-1" spreadMethod="reflect"
              cx="45%" cy="45%"
              >
              <stop offset="0" stopColor="rgba(255,255,255,1)" />
              <stop offset="1" stopColor="rgba(0,0,0,1)" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" height="100%" width="100%" className="debug-svg-blue" />
          <circle cx="50%" cy="50%" r="10%" className="stroke-circle" fill="url(#grad-ball-1)" />
          <circle cx="20%" cy="35%" r="11%" className="stroke-circle" fill="url(#grad-ball-1)" />
          <circle cx="33%" cy="71%" r="12%" className="stroke-circle" fill="url(#grad-ball-1)" />
          <circle cx="67%" cy="83%" r="13%" className="stroke-circle" fill="url(#grad-ball-1)" />
          <circle cx="80%" cy="41%" r="14%" className="stroke-circle" fill="url(#grad-ball-1)" />
          <circle cx="82%" cy="5%" r="15%" className="stroke-circle" fill="url(#grad-ball-1)" />
        </svg>
      )
    }
  ];
};