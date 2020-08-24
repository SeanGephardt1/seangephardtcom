import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';
import './portfolio.css';

import SVG from '../../art/svgs.js';

import AzureHome1 from './azure-resp-home-1.png';
import AzureHome2 from './azure-resp-home-2.png';
import AzureHome3 from './azure-resp-home-3.png';
import AzureHome4 from './azure-resp-home-4.png';
import AzureHome5 from './azure-resp-home-5.png';
import AzureCreate1 from './azure-create-1.png';
import AzureCreate2 from './azure-create-2.png';
//import AzureCreate3 from './azure-create-3.png';
import AzureCreate4 from './azure-create-4.png';
import AzureCreate5 from './azure-create-5.png';
import AzureCreate9 from './azure-create-9.png';


export default class Portfolio extends React.Component
{
    static contextType = ThemeContext;
	static defaultProps = {
		Title: "Interaction Design Portfolio for Sean Gephardt",
		LinkTitle: "Portfolio",
		Href: "/portfolio/",
		Icon: SVG.AppNavButtons.Portfolio
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || Portfolio.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Portfolio.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Portfolio.defaultProps.Href );

		this.CurrentPortfolioPicture = AzureHome5;
		this.CurrentPortfolioPictureAltText = "testing";

		this.state = {
			displayOverlayPicture: "none"
		}

		document.title = this.Title;
		return;
	};
	OnClick_DisplayModalPicture(img, altText, se )
	{	//	console.debug( "OnClick_DisplayModalPicture", img, altText, se );
		this.CurrentPortfolioPicture = img;
		this.CurrentPortfolioPictureAltText = altText;
		this.setState( { displayOverlayPicture: "block" } );
		return;
	};
	OnClick_HideModalPicture( se )
	{	//	console.debug( "OnClick_HideModalPicture");
		this.setState( { displayOverlayPicture: "none" } );
		return;
	};
	render()
	{	//	console.debug( "PortfolioExtension.render()", this.state.displayOverlayPicture );	
		return (
			<div className="page-main">Portfolio</div>
		);
	};
};