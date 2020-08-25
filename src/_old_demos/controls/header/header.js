import React from 'react';
import { ThemeContext } from './../../js/theme-context.js';

export default class PortfolioHeader extends React.Component
{
	static contextType = ThemeContext;
	constructor( props ) 
	{
		super(props);
		return;
	};
	render()
	{	
		//	console.debug( "PortfolioHeader.render()", this.context.Theme );
		
		let _style = {
			backgroundColor: this.context.Theme.Background,
			color: this.context.Theme.Foreground,
			fontFamily: this.context.Theme.FontFamily
		};

		//	console.debug( _style );

		return (
			<header style={_style}>{this.props.children}</header>
		);
	};
};