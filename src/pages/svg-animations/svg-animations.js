import React from 'react';
import './svg-animations.css';
//import SvgAniData from "./svg-animations-data.js";

export default class SvgAnimationsDemo extends React.Component
{
	static defaultProps = {
		Title: "SVG Animations",
		LinkTitle: "SVG Animations",
		Href: "/portfolio/svg-animations/",
		Icon: ""//SVG.AppNavButtons.About,
	};
	constructor( props )
	{
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		document.title = this.Title;

		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

		//this._default_matrix = "matrix(1, 0, 0, 1, 0, 0)";
		//this._default_translate = "translate(0,0)";

		//this.state = {
		//};

		return;
	};
    render()
	{
        return (
			<div className="page-layout">
				<div className="bd-page-title">SVG animation demos</div>

				<div className="bd-page-description"><a href="https://en.wikipedia.org/wiki/Scalable_Vector_Graphics" target="new" title="SVG (Scalable Vector Graphics)">SVG (Scalable Vector Graphics)</a> are a performant, web browser standards compliant format that allows for using vector graphics in your application.</div>

				<div className="svg-ani-card-panel">

					{ /* testing 1*/}
					<div className="svg-ani-card">
						<svg>
							<rect height="200" width="200" fill="rgba(128,0,0,0.1)"/>
							<polygon points="60,30 90,90 30,90">
									<animateTransform attributeName="transform"
										attributeType="XML"
										type="rotate"
										from="0 60 70"
										to="360 60 70"
										dur="1s"
										repeatCount="indefinite"/>
								</polygon>
						</svg>
					</div>

					{ /* testing 2*/}
					<div className="svg-ani-card">
						<svg x="0px" y="0px" width="256px" height="256px" viewBox="0 0 256 256">
							<defs>
								<filter id="ds-1">
								  <feDropShadow dx="0.4" dy="0.4" stdDeviation="0.4"/>
								</filter>
							</defs>
							<path fill="#3D8BFF" style={{ 'filter': 'url(#ds-1)' }} d="M146.4,132.1l-23,36h79.2c-14.3,26.5-42.3,44.6-74.6,44.6c-46.8,0-84.7-37.9-84.7-84.7
							c0-46.8,37.9-84.7,84.7-84.7c35.3,0,65.6,21.6,78.3,52.3h44.6C236.5,41.2,187,1,128,1C57.9,1,1,57.9,1,128s56.9,127,127,127
							c68.8,0,124.8-54.6,126.9-122.9H146.4z">
								<animate attributeName="fill" values="#3D8BFF;#FF0000;#3D8BFF;" dur="1s" repeatCount="indefinite" repeatDur="10s" fill="freeze" />
							</path>
						</svg>
					</div>

					{ /* testing 3*/}
					<div className="svg-ani-card">
						<svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<filter id="shadow">
									<feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
								</filter>
								<filter id="shadow2">
									<feDropShadow dx="0" dy="0" stdDeviation="0.5" floodColor="cyan"/>
								</filter>
								<filter id="shadow3">
									<feDropShadow dx="-0.8" dy="-0.8" stdDeviation="0" floodColor="pink" floodOpacity="0.5"/>
								</filter>
							</defs>
							<circle cx="5" cy="50%" r="4" style={{'fill':'pink','filter':'url(#shadow)' }}/>
							<circle cx="15" cy="50%" r="4" style={{'fill':'pink','filter':'url(#shadow2)' }}/>
							<circle cx="25" cy="50%" r="4" style={{'fill':'pink','filter':'url(#shadow3)' }}/>
						</svg>
					</div>


				</div>

			</div>
        );
    }
};