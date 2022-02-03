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
		//console.debug( "Nav.render()",
		//	window.location.pathname.includes( PagesList[ 2 ].path ),
		//	window.location.pathname,
		//	PagesList[ 2 ].path );

		return (
			<nav>
				<div className="nav-top-level">
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
						{	
							//console.debug( "match", match );
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
				</div>

				{	/* for portfolio sub-links */
					//window.location.pathname.includes( PagesList[ 2 ].path ) === true &&
					//<div className="nav-sub-level">
					//	{
					//		PagesList[ 2 ].routes.map( ( item, index ) => (
					//			<NavLink
					//				key={ index }
					//				exact={ true }
					//				to={ item.path }
					//				className='nav'
					//				activeClassName='nav-selected'
					//				title={ item.component.defaultProps.Title }
					//				isActive={ ( match, location ) =>
					//				{	//console.debug( "match", match );
					//					//console.debug( "location", location.pathname );

					//					let _bool = false;
					//					if ( match !== null )
					//					{
					//						//console.debug( "match", match );
					//						//console.debug( "location", location.pathname );
					//						_bool = true;
					//					}
					//					else if ( match === null )
					//					{
					//						if ( item.routes !== undefined && item.routes.length > 0 )
					//						{
					//							for ( let i = 0; i < item.routes.length; i++ )
					//							{
					//								//	console.debug( i, item.routes[i].path, item.path );
					//								if ( location.pathname.indexOf( item.path ) !== -1 )
					//								{
					//									_bool = true;
					//								}
					//							}
					//						}
					//						else
					//						{
					//							_bool = false;
					//						}
					//					}
					//					return _bool;
					//				} }
					//			>{ item.component.defaultProps.LinkTitle }</NavLink>
					//		) )
					//	}
					//</div>
				}

			</nav>
		);
	};
};