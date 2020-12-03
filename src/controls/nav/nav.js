import React from 'react';
import { NavLink } from 'react-router-dom';
import { PagesList } from '../../pages/pages.js';
import './nav.css';

export default class SiteNav extends React.Component
{
	constructor(props)
	{
		super( props );
		return;
	};
	render()
	{	
		return (
			<nav>
				{
					PagesList.map( ( item, index ) => (
						<NavLink
							key={index}
							exact={true}
							to={item.path}
							className='nav'
							activeClassName='nav-selected'
							title={item.component.defaultProps.Title}
							isActive={( match, location ) =>
							{	// TALK ABOUT HACKS

								//console.debug( "\n", item);
								//console.debug( "match", match );
								//console.debug( "location", location.pathname );

								let _bool = false;
								if ( match !== null )
								{
									_bool = true;
								}
								else if ( match === null )
								{
									if ( item.routes !== undefined && item.routes.length > 0 )
									{
										for ( let i = 0; i < item.routes.length; i++ )
										{
											//	console.debug( i, item.routes[i].path, item.path );
											if ( location.pathname.indexOf( item.path) !== -1 )
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
							}}

						>{item.component.defaultProps.LinkTitle}</NavLink>
					))
				}
			</nav>
		);
	};
};