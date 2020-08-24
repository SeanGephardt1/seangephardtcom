import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';

export default class ContextAside extends React.Component
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
		
		let _style = {
			backgroundColor: this.context.Theme.Background,
			color: this.context.Theme.Foreground
		};

		return (
			<aside
				style={_style}
				>{this.props.children}</aside>
		);
	};
};