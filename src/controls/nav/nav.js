import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../js/theme-context.js';
import { PagesList } from '../../pages/pages.js';

import { ImageList } from '../../art/imgs.js';
import SVG from '../../art/svgs.js';

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

				<a
					target="_new"
					className="nav"
					title="Sean Gephardt on GitHub"
					href="https://github.com/SeanGephardt1">
					<span>{SVG.Brands.GitHub}</span>
					<span>GitHub</span>
				</a>
				<a
					target="_new"
					className="nav"
					title="Sean Gephardt on LinkedIn"
					href="https://www.linkedin.com/in/seangephardt/">
					<span>
						<img src={ImageList[5]} alt="Sean Gephardt on LinkedIn" />
					</span>
					<span>LinkedIn</span>
				</a>

			</nav>
		);
	};
};