import React from 'react';
import { NavLink } from 'react-router-dom';
import { PagesList } from '../../pages/pages.js';

export default class PortfolioPage extends React.Component
{
	static defaultProps = {
		Title: "Portfolio, Prototypes and Examples",
		LinkTitle: "Portfolio",
		Href: "/portfolio/",
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
	{	//	console.debug( "Portfolio.render()");
		return (
			<div className="page-layout padding30">
				<div className="header centered">Portfolio landing page</div>

				{ /* example links from import { PagesList } from '../../pages/pages.js'; */ }
				{
					<div className="nav-sub-level">
						{
							PagesList[ 2 ].routes.map( ( item, index ) => (
								<NavLink
									key={ index }
									exact={ true }
									to={ item.path }
									className='nav'
									activeClassName='nav-selected'
									title={ item.component.defaultProps.Title }
									isActive={ ( match, location ) =>
									{	//console.debug( "match", match );
										//console.debug( "location", location.pathname );

										let _bool = false;
										if ( match !== null )
										{
											//console.debug( "match", match );
											//console.debug( "location", location.pathname );
											_bool = true;
										}
										else if ( match === null )
										{
											if ( item.routes !== undefined && item.routes.length > 0 )
											{
												for ( let i = 0; i < item.routes.length; i++ )
												{
													//	console.debug( i, item.routes[i].path, item.path );
													if ( location.pathname.indexOf( item.path ) !== -1 )
													{
														_bool = true;
													}
												}
											}
											else
											{
												_bool = false;
											}
										}
										return _bool;
									} }
								>{ item.component.defaultProps.LinkTitle }</NavLink>
							) )
						}
					</div>
				}
			</div>
		);
	}
};