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
				Design

				<div className="design-panel">
					<svg>

					</svg>
				</div>


			</div>
        );
    }
};
