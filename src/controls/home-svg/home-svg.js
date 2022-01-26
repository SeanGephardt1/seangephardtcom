import React from 'react';
import './home-svg.css';

export default class HomeSvg extends React.Component
{
	constructor( props ) 
	{
		super( props );
		this.state = { debug: true };
		return;
	};
	render()
	{	
		return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
				className="home-svg-root"
        width="960"
        height="540"
        viewBox="0 0 1920 1080"
			>
				{ /* DEBUG BACKGROUND */ }
				{
					this.state.debug === true &&
					<g className="home-svg-debug">
						<rect x="0" y="0" width="100%" height="100%" />
						<line x1="0" y1="50%" x2="100%" y2="50%" />
						<line x1="50%" y1="0" x2="50%" y2="100%" />
						<circle
							r="50"
							cx="50%"
							cy="50%" />
						<rect className="palette-rect-1" x="710" />
						<rect className="palette-rect-2" x="810" />
						<rect className="palette-rect-3" x="910" />
						<rect className="palette-rect-4" x="1010" />
						<rect className="palette-rect-5" x="1110" />
					</g>
				}

				{ /* MAIN */ }
				{ /* UX */ }
				<text
					x="0"
					y="0"
					dx="500"
					dy="216"
					textLength="100%"
					textAnchor="middle"
					fontFamily="Segoe UI"
					fontSize="200px"
					alignmentBaseline="auto"
					textAnchor="start"
					letterSpacing="10" >
					<tspan>U</tspan>
					<tspan dx="-6">I</tspan>
				</text>

				{ /* Design */ }
				<text className="ani-design-text-2" textLength="100%" x="0" y="0" textAnchor="middle" dx="500" dy="300" fontSize="128px" letterSpacing="-6" >
					<tspan>D</tspan>
					<tspan dx="-2">e</tspan>
					<tspan dx="2">s</tspan>
					<tspan dx="-2">i</tspan>
					<tspan dx="-2">g</tspan>
					<tspan dx="-5">n</tspan>
				</text>

				{ /* Prototyping */ }
				<text className="ani-design-text-3" textLength="100%" x="0" y="0" textAnchor="middle" dx="500" dy="380" fontSize="128px" letterSpacing="-6" >
					<tspan>P</tspan>
					<tspan dx="-6">r</tspan>
					<tspan dx="-2">o</tspan>
					<tspan>t</tspan>
					<tspan>o</tspan>
					<tspan>t</tspan>
					<tspan dx="8">y</tspan>
					<tspan>p</tspan>
					<tspan dx="-1">i</tspan>
					<tspan dx="-4">n</tspan>
					<tspan>g</tspan>
				</text>

      </svg>
		);
	};
};