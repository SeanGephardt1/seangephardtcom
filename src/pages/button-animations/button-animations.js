import React from 'react';
import SubNav from '../../controls/nav/sub-nav.js';
import './button-animations.css';

export default class ButtonAnimations extends React.Component
{
	static defaultProps = {
		Title: "Button Animations",
		LinkTitle: "Button Animations",
		Href: "/demos/button-animations/",
		//Icon: SVG.AppNavButtons.About,
	};
	constructor( props )
	{
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		document.title = this.Title;

		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

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

					<div className="svg-ani-card-icon">

						<svg className="hamburger-icon">
							<rect className="hb-bk" />
							<rect className="hb-stripe" />
							<rect className="hb-stripe" />
							<rect className="hb-stripe" />
						</svg>

					</div>

				</div>

			</div>
        );
    }
};