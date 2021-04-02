import React from 'react';
import './portfolio.min.css';

export default class PortfolioPage extends React.Component
{
	static defaultProps = {
		Title: "Portfolio and prototyping",
		LinkTitle: "Portfolio",
		Href: "/portfolio/",
		Icon: "" //SVG.AppNavButtons.About
	};
	constructor( props )
	{
		// GENERIC
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

		document.title = this.Title;
		return;
	};
    render()
	{
		//	console.debug( "Portfolio.render()");
		return (
			<div className="page-layout">
				<div className="portfolio-header">Portfolio landing page</div>
			</div>
        );
    }
};