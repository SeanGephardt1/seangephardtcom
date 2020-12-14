import React from 'react';
//import SVG from '../../art/svgs.js';
import './home.css';

export default class Home extends React.Component
{
	static defaultProps = {
		Title: "Sean Gephardt, UX Design Prototyping",
		LinkTitle: "Sean Gephardt",
		Href: "/",
		//	Icon: SVG.AppNavButtons.About
	};
    constructor( props )
    {
        super( props );

		this.Title = ( this.props.Title || Home.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Home.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Home.defaultProps.Href );
		document.title = this.Title;
		return;
	};
    render()
    {
        return (
			<div className="page-layout">

				{ /* SVG AREA 1 */ }
				<div className="svg-panel">

					<svg xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1000 500"
						className="design-svg"
						imageRendering="optimizeQuality"
						shapeRendering="geometricPrecision">

						<rect stroke="transparent" x="0" y="0" width="1000px" height="500px" rx="0"></rect>

						{ /* SECONDARY */}
						{ /* Interaction */ }
						<text className="ani-design-secondary-text-1" textLength="100%" x="0" y="0" textAnchor="start" dx="10" dy="490" fontSize="48px" letterSpacing="-2" >
							<tspan>live interaction</tspan>
						</text>

						<text className="ani-design-secondary-text-2" textLength="100%" x="0" y="0" textAnchor="middle" dx="500" dy="490" fontSize="48px" letterSpacing="-2" >
							<tspan>customer experience</tspan>
						</text>

						<text className="ani-design-secondary-text-3" textLength="100%" x="0" y="0" textAnchor="start" dx="770" dy="490" fontSize="48px" letterSpacing="-2" >
							<tspan>user research</tspan>
						</text>


						{ /* MAIN */}
						{ /* UX */ }
						<text className="ani-design-text-1" textLength="100%" x="0" y="0" textAnchor="middle" dx="500" dy="216" fontSize="200px" letterSpacing="-10" >
							<tspan>U</tspan>
							<tspan dx="-6">X</tspan>
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

						{ /* Prototyping */}
						<text  className="ani-design-text-3" textLength="100%" x="0" y="0" textAnchor="middle" dx="500" dy="380" fontSize="128px" letterSpacing="-6" >
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

				{ /* PORTFOLIO AREA */ }
				<div>
					<h2 className="header centered">What is "UX Design Prototyping"?</h2>
					<div>Over the past several years, I've been focused on creating high fidelity, interactive prototypes of user experience scenarios utilizing HTML, CSS & JavaScript, that go beyond wireframes and static mock ups. This methodology allows researchers to collect succinct quantitative & qualitative data on expectations from the customers who will be using a product that the experience is designed for. It's also valuable after research has been completed as a way to provide engineering a preliminary code base to integrate and implement the scenario and features. For example, this entire portfolio site is being created using the ReactJs framework & related JavaScript libraries, as well as HTML 5 & CSS 3. 
					</div>	
				</div>

			</div>
        );
    }
};
