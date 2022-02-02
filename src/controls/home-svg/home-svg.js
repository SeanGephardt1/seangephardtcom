import React from 'react';
import './home-svg.css';

export default class HomeSvg extends React.Component
{
	constructor ( props ) 
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
				textRendering="optimizeLegibility"
				viewBox="0 0 1920 1080"
				className="home-svg-root"
			>
				<defs>
					<filter id="design-asset-shadow">
						<feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,1)" floodOpacity="0.6"  />
					</filter>
				</defs>

				{  /* DEBUG BACKGROUND */
					this.state.debug === true &&
					<g className="home-svg-debug">
						<rect x="0" y="0" width="100%" height="100%" />

						<g className="debug-rotate-ani">
							<line x1="50%" y1="0" x2="50%" y2="540" />
							<line x1="50%" y1="540" x2="50%" y2="1080" />
							<line x1="410" y1="50%" x2="960" y2="50%" />
							<line x1="960" y1="50%" x2="1500" y2="50%" />
							<circle r="30" cx="50%" cy="50%" />
						</g>

						{/*<rect className="palette-rect-1" x="710" />*/}
						{/*<rect className="palette-rect-2" x="810" />*/}
						{/*<rect className="palette-rect-3" x="910" />*/}
						{/*<rect className="palette-rect-4" x="1010" />*/}
						{/*<rect className="palette-rect-5" x="1110" />*/}
					</g>
				}

				{ /* MAIN TEXT */ }
					<text className="home-text-UX"
						x="50%"
						y="638"
						fontFamily="Segoe UI"
						fontSize="600px"
						textAnchor="middle"
						letterSpacing="-66px">
						<tspan dx="-48px" dy="0">UX</tspan>
				</text>

				<text className="home-text-DESIGN"
						x="50%"
						y="794"
						dx="0"
						dy="0"
						fontFamily="Segoe UI"
						fontSize="202px"
						textAnchor="middle"
						letterSpacing="-6px">
						<tspan>DESIGN</tspan>
					</text>

				<text
						className="home-text-PROTOTYPING"
						x="50%"
						y="884"
						dx="0"
						dy="0"
						fontFamily="Segoe UI"
						fontSize="108px"
						textLength="0"
						textAnchor="middle"
						letterSpacing="-4px">
						<tspan>PROTOTYPING</tspan>
					</text>

			</svg>
		);
	};
};