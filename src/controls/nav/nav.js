﻿import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../js/theme-context.js';
import { PagesList } from '../../pages/pages.js';

import './nav.css';

export default class SiteNav extends React.Component
{
	static contextType = ThemeContext;
	constructor(props)
	{
		super( props );
		return;
	};
	render()
	{	//	console.debug( "Navigation.render()", this.context.Theme.Foreground );
		return (
			<div>
			<nav>
				{
					PagesList.map( (item, index) =>
						<NavLink
							key={index}
							exact={true}
							to={item.defaultProps.Href}
							className='nav'
							activeClassName='nav-selected'
							title={item.defaultProps.Title}>
							{item.defaultProps.LinkTitle}
						</NavLink>
					)
				}
				</nav>
			</div>
		);
	};
};