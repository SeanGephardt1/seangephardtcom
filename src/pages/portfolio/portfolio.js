import React from 'react';
import { NavLink } from 'react-router-dom';
import { PagesList } from '../../pages/pages.js';

export default class PortfolioPage extends React.Component
{
	static defaultProps = {
		Title: "Portfolio, Prototypes and Examples",
		LinkTitle: "Portfolio",
		Href: "portfolio",
		Icon: "" //SVG.AppNavButtons.About
	};
	constructor ( props )
	{	// GENERIC
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

		document.title = this.Title;
		return;
	};
	render()
	{	//	console.debug( "Portfolio.render()", this.props);
		return (
			<div className="page-layout padding30">
				<div className="header centered">Portfolio landing page</div>

				{ /* example links from import { PagesList } from '../../pages/pages.js'; */ }
				
					{/*<div className="nav-sub-level">*/}
					{/*	{*/}
					{/*		PagesList[ 2 ].routes.map( ( item, index ) => (*/}
					{/*			<NavLink*/}
					{/*				key={ index }*/}
					{/*				to={ item.path }*/}
					{/*				className='nav'*/}
					{/*				title={ item.component.defaultProps.Title }*/}
					{/*				className={ ( { isActive } ) => isActive ? 'nav nav-selected' : 'nav' }*/}
					{/*			>{ item.component.defaultProps.LinkTitle }</NavLink>*/}
					{/*		) )*/}
					{/*	}*/}
					{/*</div>*/}
				
			</div>
		);
	}
};