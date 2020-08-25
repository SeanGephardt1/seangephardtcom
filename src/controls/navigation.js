import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../js/theme-context.js';
import { PagesList } from '../pages/pages.js';

export default class Navigation extends React.Component
{
	static contextType = ThemeContext;
	constructor(props)
	{
		super( props );
		this.Pages = PagesList;
		return;
	};
	render()
	{	//	console.debug( "Navigation.render()", this.context.Theme.Foreground);
		//		<a
		//	target="_new"
		//	style={_nav_link_padding}
		//	title="Sean Gephardt on Instagram"
		//	href="https://www.instagram.com/villainsean/">
		//	<div>
		//		<img src={ImageList[4]} alt="Sean Gephardt on Instagram"/>
		//	</div>
		//	<div>Instagram</div>
		//</a>
				//{
				//	this.Pages.map( (item, index) =>
				//		<NavLink
				//			key={index}
				//			exact={true}
				//			to={item.defaultProps.Href}
				//			activeClassName='thisLinkSelected'
				//			style={_nav_link_padding}
				//			title={item.defaultProps.Title}>
				//			{
				//				item.defaultProps.Icon !== undefined &&
				//				<div style={_svg_style}>{item.defaultProps.Icon}</div>
				//			}
				//			<div>{item.defaultProps.LinkTitle}</div>
				//		</NavLink>
				//	)
				//}

		return (
			<nav>
				{
					this.Pages.map( (item, index) =>
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
		);
	};
};