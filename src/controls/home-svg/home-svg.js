import React from 'react';
import './home-svg.css';

export default class HomeSvg extends React.Component
{
	constructor ( props ) 
	{
		super( props );
		this.state = { debug: false };
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
				textRendering="optimizeLegibility"
				width="960"
				height="540"
				viewBox="0 0 1920 1080"
			>
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
				<g className="home-svg-main">
					<text className="home-text-UX"
						x="50%"
						y="640"
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
						className="home-text-PROTOTPYING"
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
				</g>

				{ /* RANDOM DESIGN ELEMENTS */ }
				<g className="home-svg-assets">

				</g>

			</svg>
		);
	};
};