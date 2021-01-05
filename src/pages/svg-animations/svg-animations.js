import React from 'react';
import SubNav from '../../controls/nav/sub-nav.js';
import './svg-animations.css';
import SvgAniData from "./svg-animations-data.js";

export default class SvgAnimationsDemo extends React.Component
{
	static defaultProps = {
		Title: "SVG Animations",
		LinkTitle: "SVG Animations",
		Href: "/portfolio/svg-animations/",
		//Icon: SVG.AppNavButtons.About,
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
				<SubNav />
				<div className="bd-page-title">SVG animation demos</div>

				<div className="bd-page-description"><a href="https://en.wikipedia.org/wiki/Scalable_Vector_Graphics" target="new" title="SVG (Scalable Vector Graphics)">SVG (Scalable Vector Graphics)</a> are a performant, web browser standards compliant format that allows for using vector graphics in your application.</div>

				<div className="svg-ani-card-panel">

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

				</div>

			</div>
        );
    }
};