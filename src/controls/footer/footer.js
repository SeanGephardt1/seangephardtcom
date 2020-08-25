import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';
import { ImageList } from '../../art/imgs.js';
import SVG from '../../art/svgs.js';
import './footer.css';

export default class SiteFooter extends React.Component
{
	static contextType = ThemeContext;
	constructor( props ) 
	{
		super(props);
		return;
	};
	render()
	{	
		//console.debug( "SiteFooter.render()",
		//	this.context.Theme.Name,
		//	this.context.Theme.Background
		//);
		
		//let _style = {
		//	backgroundColor: this.context.Theme.Background,
		//	color: this.context.Theme.Foreground,
		//	fontFamily: this.context.Theme.FontFamily
		//};

		return (
			<footer>
				{this.props.children}
				<a
					target="_new"
					title="Sean Gephardt on GitHub"
					href="https://github.com/SeanGephardt1">
					<div>{SVG.Brands.GitHub}</div>
					<div>GitHub</div>
				</a>
				<a
					target="_new"
					title="Sean Gephardt on LinkedIn"
					href="https://www.linkedin.com/in/seangephardt/">
					<div>
						<img src={ImageList[5]} alt="Sean Gephardt on LinkedIn" />
					</div>
					<div>LinkedIn</div>
				</a>
			</footer>
		);
	};
};