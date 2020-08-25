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
			<footer>{this.props.children}</footer>
		);
	};
};