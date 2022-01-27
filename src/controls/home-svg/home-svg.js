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
				className="home-svg-root"
				textRendering="optimizeLegibility"
				preserveAspectRatio="xMinYMin slice"
				vectorEffect="non-scaling-stroke"
				x="0px" y="0px"
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
				<g className="home-svg-main-ux">
					<text className="home-text-UX"
						x="50%"
						y="60%"
						fontFamily="Segoe UI"
						fontSize="600"
						textAnchor="middle">
						<tspan>UX</tspan>
					</text>
				</g>

				<g>
					<text className="home-text-DESIGN"
						x="50%"
						y="75%"
						fontFamily="Segoe UI"
						fontSize="202"
						textAnchor="middle"
						>
						<tspan>DESIGN</tspan>
					</text>
				</g>

				<g>
					<text
						className="home-text-PROTOTPYING"
						x="50%"
						y="83%"
						fontFamily="Segoe UI"
						fontSize="106"
						textAnchor="middle">
						<tspan>PROTOTYPING</tspan>
					</text>
				</g>

				{ /* RANDOM DESIGN ELEMENTS */ }
				{/*<g id="design-flow">*/}
				{/*	<text*/}
				{/*		x="50%"*/}
				{/*		y="60%"*/}
				{/*		className="design-asset-text"*/}
				{/*		fontFamily="Segoe UI"*/}
				{/*		fontSize="400px"*/}
				{/*		textAnchor="middle"*/}
				{/*		letterSpacing="-32px">*/}
				{/*		<tspan dx="0" dy="0">#design</tspan>*/}
				{/*	</text>*/}

				{/*	<g className="g-design-flow">*/}
				{/*		<rect*/}
				{/*			className="design-rect dr-layout"*/}
				{/*			x="200"*/}
				{/*			y="300"*/}
				{/*			width="500"*/}
				{/*			height="200"*/}
				{/*			rx="6"*/}
				{/*			filter="url(#design-asset-shadow)" />*/}

				{/*		<rect*/}
				{/*			className="design-rect dr-toolbar"*/}
				{/*			x="200"*/}
				{/*			y="250"*/}
				{/*			width="1520"*/}
				{/*			height="80"*/}
				{/*			rx="2" />*/}
				{/*		<text className="design-text dr-brand" x="222" y="302">Company Brand</text>*/}
				{/*		<text className="design-text dr-login" x="1620" y="302">Login</text>*/}
				{/*		<text className="design-text dr-content-text" x="500" y="400">Welcome Valued Customer!</text>*/}
				{/*		<text className="design-text dr-content-text-2" x="500" y="460">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at faucibus felis. Nulla faucibus elit vel mollis finibus.</text>*/}
				{/*		<text className="design-text dr-content-text-2" x="500" y="490">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at faucibus felis. Nulla faucibus elit vel mollis finibus.</text>*/}
				{/*		<text className="design-text dr-content-text-2" x="500" y="520">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at faucibus felis. Nulla faucibus elit vel mollis finibus.</text>*/}
				{/*		<text className="design-text dr-content-text-2" x="500" y="550">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at faucibus felis. Nulla faucibus elit vel mollis finibus.</text>*/}

				{/*		<g className="g-dr-menu">*/}
				{/*			<rect*/}
				{/*				className="design-rect dr-menu"*/}
				{/*				x="200"*/}
				{/*				y="332"*/}
				{/*				width="250"*/}
				{/*				height="718"*/}
				{/*				rx="0" />*/}

				{/*				<rect*/}
				{/*					className="dr-menu-icon"*/}
				{/*					x="220"*/}
				{/*					y="360"*/}
				{/*					width="32"*/}
				{/*					height="32"*/}
				{/*					rx="5" />*/}
				{/*				<rect*/}
				{/*					className="dr-menu-icon"*/}
				{/*					x="220"*/}
				{/*					y="430"*/}
				{/*					width="32"*/}
				{/*					height="32"*/}
				{/*					rx="5" />*/}
				{/*				<rect*/}
				{/*					className="dr-menu-icon"*/}
				{/*					x="220"*/}
				{/*					y="500"*/}
				{/*					width="32"*/}
				{/*					height="32"*/}
				{/*					rx="5" />*/}
				{/*				<rect*/}
				{/*					className="dr-menu-icon"*/}
				{/*					x="220"*/}
				{/*					y="570"*/}
				{/*					width="32"*/}
				{/*					height="32"*/}
				{/*					rx="5" />*/}

				{/*				<text*/}
				{/*					className="dr-menu-icon-text"*/}
				{/*					x="270"*/}
				{/*					y="388"*/}
				{/*				>Feature One</text>*/}
				{/*				<text*/}
				{/*					className="dr-menu-icon-text"*/}
				{/*					x="270"*/}
				{/*					y="454"*/}
				{/*				>Feature Two</text>*/}
				{/*				<text*/}
				{/*					className="dr-menu-icon-text"*/}
				{/*					x="270"*/}
				{/*					y="528"*/}
				{/*				>Feature Three</text>*/}
				{/*				<text*/}
				{/*					className="dr-menu-icon-text"*/}
				{/*					x="270"*/}
				{/*					y="598"*/}
				{/*				>Feature Four</text>*/}

				{/*		</g>*/}

				{/*	</g>*/}
				{/*</g>*/}

				{/*<g id="develop-flow">*/}
				{/*	<text*/}
				{/*		x="50%"*/}
				{/*		y="60%"*/}
				{/*		className="design-asset-text"*/}
				{/*		fontFamily="Segoe UI"*/}
				{/*		fontSize="400px"*/}
				{/*		textAnchor="middle"*/}
				{/*		letterSpacing="-32px">*/}
				{/*		<tspan dx="0" dy="0">#develop</tspan>*/}
				{/*	</text>*/}
				{/*</g>*/}

				{/*<g id="deploy-flow">*/}
				{/*	<text*/}
				{/*		x="50%"*/}
				{/*		y="60%"*/}
				{/*		className="design-asset-text"*/}
				{/*		fontFamily="Segoe UI"*/}
				{/*		fontSize="400px"*/}
				{/*		textAnchor="middle"*/}
				{/*		letterSpacing="-32px">*/}
				{/*		<tspan dx="0" dy="0">#deploy</tspan>*/}
				{/*	</text>*/}
				{/*</g>*/}

			</svg>
		);
	};
};