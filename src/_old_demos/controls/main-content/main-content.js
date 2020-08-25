import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';

export default class MainContent extends React.Component
{
	static contextType = ThemeContext;
	constructor( props ) 
	{
		super(props);
		return;
	};
	render()
	{	
		//console.debug( "MainContent.render()",
		//	this.context.Theme.Name,
		//	this.context.Theme.Background
		//);
		
		//let _style = {
		//	//backgroundColor: this.context.Theme.Background,
		//	//color: this.context.Theme.Foreground
		//};

		return (
			<main>{this.props.children}</main>
		);
	};
};