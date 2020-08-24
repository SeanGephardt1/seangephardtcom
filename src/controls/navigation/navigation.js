import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../js/theme-context.js';
import { PagesList } from '../../pages/pages.js';

import { ImageList } from '../../art/imgs.js';
import SVG from '../../art/svgs.js';

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
		let _font_style = {
			fontFamily: this.context.Theme.FontFamily,
			fill: this.context.Theme.ForeGround
		};

		let _svg_style = {
			fill: this.context.Theme.Foreground
		};

		const _nav_link_padding = {
			..._font_style,
			padding: this.context.Theme.LinkPadding,

		}

		const _style = { _font_style };

		return (
			<nav style={_style}>
				{
					this.Pages.map( (item, index) =>
						<NavLink
							key={index}
							exact={true}
							to={item.defaultProps.Href}
							activeClassName='thisLinkSelected'
							style={_nav_link_padding}
							title={item.defaultProps.Title}>
							{
								item.defaultProps.Icon !== undefined &&
								<div style={_svg_style}>{item.defaultProps.Icon}</div>
							}
							<div>{item.defaultProps.LinkTitle}</div>
						</NavLink>
					)
				}
				<a
					target="_new"
					style={_nav_link_padding}
					title="Sean Gephardt on Instagram"
					href="https://www.instagram.com/villainsean/">
					<div>
						<img src={ImageList[4]} alt="Sean Gephardt on Instagram"/>
					</div>
					<div>Instagram</div>
				</a>
				<a
					target="_new"
					style={_nav_link_padding}
					title="Sean Gephardt on GitHub"
					href="https://github.com/SeanGephardt1">
					<div style={_svg_style}>{SVG.Brands.GitHub}</div>
					<div>GitHub</div>
				</a>
				<a
					target="_new"
					style={_nav_link_padding}
					title="Sean Gephardt on LinkedIn"
					href="https://www.linkedin.com/in/seangephardt/">
					<div>
						<img src={ImageList[5]} alt="Sean Gephardt on LinkedIn" />
					</div>
					<div>LinkedIn</div>
				</a>

			</nav>
		);
	};
};