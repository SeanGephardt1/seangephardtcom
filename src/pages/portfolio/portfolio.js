import React from 'react';
import SubNav from '../../controls/nav/sub-nav.js';
import './portfolio.css';

export default class PortfolioPage extends React.Component
{
	static defaultProps = {
		Title: "Portfolio and prototyping",
		LinkTitle: "Portfolio",
		Href: "/portfolio/",
		//Icon: SVG.AppNavButtons.About
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
				<SubNav />
			</div>
        );
    }
};