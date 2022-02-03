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
				textRendering="optimizeLegibility"
				viewBox="0 0 1920 1080"
				className="home-svg-root"
			>
				{  /* DEBUG BACKGROUND */
					this.state.debug === true &&
					<g className="home-svg-debug">
						<rect x="0" y="0" width="100%" height="100%" />
						<line x1="50%" y1="0" x2="50%" y2="540" />
						<line x1="50%" y1="540" x2="50%" y2="1080" />
						<line x1="410" y1="50%" x2="960" y2="50%" />
						<line x1="960" y1="50%" x2="1500" y2="50%" />
						<circle r="30" cx="50%" cy="50%" />
						<rect className="palette-rect pr-db" x="710" />
						<rect className="palette-rect pr-rb" x="810" />
						<rect className="palette-rect pr-ow" x="910" />
						<rect className="palette-rect pr-pr" x="1010" />
						<rect className="palette-rect pr-bo" x="1110" />
					</g>
				}

				{ /* MAIN TEXT */ }

					<text className="home-text-UX"
						x="960"
						y="636"
						fontFamily="Segoe UI"
						fontSize="600px"
						textAnchor="start">
					<tspan dx="-370px" dy="0">U</tspan>
					<tspan dx="-66" dy="0">X</tspan>
					<animate
						attributeName="y"
						values="0;636;636;1400"
						keyTimes="0; 0.1; 0.9; 1"
						begin="250ms"
						dur="3000ms"
						repeatCount="indefinite" />
					{/*<animate*/}
					{/*	id="blue-text-cycle"*/}
					{/*	attributeName="fill"*/}
					{/*	begin="250ms"*/}
					{/*	dur="3000ms"*/}
					{/*	values="rgba(39, 93, 173, 1); rgba(39, 93, 173, 1); rgba(222,222,222,1); rgba(64, 128, 192, 1); rgba(39, 93, 173, 1); rgba(39, 93, 173, 1)"*/}
					{/*	keyTimes="0; 0.4; 0.5; 0.6; 0.7; 1"*/}
					{/*	repeatCount="indefinite" />*/}
				</text>

				<text className="home-text-DESIGN"
						x="960"
						y="794"
						fontFamily="Segoe UI"
						fontSize="202px"
						textAnchor="start"
						letterSpacing="-10px">
					<tspan dx="-340px" dy="0">DESIGN</tspan>
					<animate
						attributeName="x"
						values="-960;960;960;2880"
						keyTimes="0; 0.1; 0.9; 1"
						begin="250ms"
						dur="3000ms"
						repeatCount="indefinite" />
					</text>

				<text
						className="home-text-PROTOTYPING"
						x="960"
						y="884"
						dx="0"
						dy="0"
						fontFamily="Segoe UI"
						fontSize="108px"
						textAnchor="start"
						letterSpacing="-6px">
					<tspan dx="-330px" dy="0">PROTOTYPING</tspan>
					<animate
						attributeName="x"
						values="1920;960;960;-400"
						keyTimes="0; 0.1; 0.9; 1"
						begin="250ms"
						dur="3000ms"
						repeatCount="indefinite" />
					</text>

			</svg>
		);
	};
};