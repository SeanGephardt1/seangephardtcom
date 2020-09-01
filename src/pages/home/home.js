import React from 'react';
import SVG from '../../art/svgs.js';
import './home.css';
//import BtnImage1 from './ms-azure-button-image-1.png';
//import BtnImage2 from './ms-azure-button-image-2.png';
//import BtnImage3 from './ms-azure-button-image-3.png';
//import LinkedInIcon from '../../art/img/linkedin.png';
//import InstaGramLogo from '../../art/img/instagram.png';

export default class Home extends React.Component
{
	static defaultProps = {
		Title: "Sean Gephardt, UX Prototype Design",
		LinkTitle: "Sean Gephardt",
		Href: "/",
		Icon: SVG.AppNavButtons.About
	};
    constructor( props )
    {
        super( props );
        this.state = {};

		this.Title = ( this.props.Title || Home.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Home.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Home.defaultProps.Href );

		document.title = this.Title;
		return;
    };
    render()
    {
        return (
			<div className="home-layout">

				<div className="design-panel">

					<svg xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1000 500"
						className="design-svg"
						imageRendering="optimizeQuality"
						shapeRendering="geometricPrecision">

						<rect stroke="transparent" x="0" y="0" width="1000px" height="500px" rx="0"></rect>

						<text className="ani-design-text-1" textLength="auto" x="0" y="0" textAnchor="middle" dx="500" dy="140" fontSize="128px" letterSpacing="-10">
							<tspan>D</tspan>
							<tspan dx="-2">e</tspan>
							<tspan dx="2">s</tspan>
							<tspan dx="-2">i</tspan>
							<tspan dx="-2">g</tspan>
							<tspan dx="-5">n</tspan>
						</text>


						<text className="ani-design-text-2" textLength="auto" x="0" y="0" textAnchor="middle" dx="-120" dy="300" fontSize="200px" letterSpacing="-10">
							<tspan>U</tspan>
							<tspan dx="-6">X</tspan>
						</text>

						<text  className="ani-design-text-3" textLength="auto" x="0" y="0" textAnchor="middle" dx="500" dy="620" fontSize="128px" letterSpacing="-10">
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


				</div>


			</div>
        );
    }
};
