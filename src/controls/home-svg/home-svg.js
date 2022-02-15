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
					<radialGradient id="gradient2" gradientUnits="userSpaceOnUse"
						cx="200" cy="200" r="100"
						gradientTransform="translate(0, 0) scale(1)">
						<stop offset="0%" stopColor="rgba(39, 93, 173, 1)" />
						<stop offset="50%" stopColor="rgba(255,255,255,1)" >
							<animate attributeName="stop-color" dur="1000ms"
								values="rgba(255,255,255,1);rgba(39, 93, 173, 1);rgba(255,255,255,1)"
								repeatCount="indefinite" />
						</stop>
						<stop offset="100%" stopColor="rgba(39, 93, 173, 1)" />
						<animate attributeName="r" dur="1000ms"
							values="100;250;100"
							repeatCount="indefinite" />
					</radialGradient>

					<linearGradient id="textGradBlueSilver" x1="0%" x2="100%" y1="100%" y2="0%" gradientUnits="userSpaceOnUse">
						<stop offset="0" stopColor="rgba(39, 93, 173, 1)" stopOpacity="1" />
						<stop offset="0.01" stopColor="rgba(39, 93, 173, 1)" stopOpacity="1" />
						<stop id="gradStop3" offset="0.02" stopColor="rgba(255,255,255,1)" stopOpacity="1"/>
						<stop offset="0.03" stopColor="rgba(39, 93, 173, 1)" stopOpacity="1" />
						<stop offset="1" stopColor="rgba(39, 93, 173, 1)" stopOpacity="1" />
					</linearGradient>
				</defs>

				{  /* DEBUG BACKGROUND */
					this.state.debug === true &&
					<g className="home-svg-debug">
						<rect x="0" y="0" width="100%" height="100%"  />
						<line x1="50%" y1="0" x2="50%" y2="540" />
						<line x1="50%" y1="540" x2="50%" y2="1080" />
						<line x1="410" y1="50%" x2="960" y2="50%" />
						<line x1="960" y1="50%" x2="1500" y2="50%" />
						<circle r="30" cx="50%" cy="50%" />
						<rect x="0%" y="0%" width="400" height="400" fill="url(#gradient2)" />
						<rect className="palette-rect pr-db" x="710" />
						<rect className="palette-rect pr-rb" x="810" />
						<rect className="palette-rect pr-ow" x="910" />
						<rect className="palette-rect pr-pr" x="1010" />
						<rect className="palette-rect pr-bo" x="1110" />
					</g>
				}

				{ /* MAIN TEXT */ }
				<animate
					id="grad-stop-flip"
					href="#gradStop3"
					attributeName="offset"
					begin="1000ms"
					dur="500ms"
					values="0.02;1;0.02"
					repeatCount="1"/>


				<text
					id="home-text-ux-block"
					className="home-text-UX"
					x="960"
					y="636"
					fontFamily="Segoe UI"
					fontSize="600px"
					textAnchor="start"
					fill="url(#textGradBlueSilver)">
					<tspan dx="-370px" dy="0">U</tspan>
					<tspan dx="-66" dy="0">X</tspan>
					<animate
						id="move-ux-text"
						href="#home-text-ux-block"
						attributeName="y"
						values="0;636"
						keyTimes="0;1"
						begin="250ms"
						dur="750ms"
						repeatCount="1"
						fill="freeze" />
				</text>

				<text
					className="home-text-DESIGN"
					x="960"
					y="794"
					fontFamily="Segoe UI"
					fontSize="202px"
					textAnchor="start"
					letterSpacing="-10px"
					fill="url(#textGradBlueSilver)">
					<tspan dx="-340px" dy="0">DESIGN</tspan>
					<animate
						attributeName="x"
						values="-960;960"
						keyTimes="0;1"
						begin="250ms"
						dur="750ms"
						repeatCount="1" />
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
					letterSpacing="-6px"
					fill="url(#textGradBlueSilver)">
					<tspan dx="-330px" dy="0">PROTOTYPING</tspan>
					<animate
						attributeName="x"
						values="1920;960"
						keyTimes="0;1"
						begin="250ms"
						dur="750ms"
						repeatCount="1" />
					</text>

			</svg>
		);
	};
};