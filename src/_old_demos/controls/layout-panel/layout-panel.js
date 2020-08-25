import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';

export default class LayoutPanel extends React.Component
{
	static contextType = ThemeContext;
	constructor( props ) 
	{
		super( props );
		return;
	};
	render()
	{	//	console.debug( "LayoutPanel.render()", this.context );
		let _style = {
			backgroundColor: this.context.Theme.Background,
			color: this.context.Theme.Foreground,
			fontFamily: this.context.Theme.FontFamily
		};

		return (
			<div
				className={this.context.CurrentLayout.className}
				style={_style}
				>{this.props.children}</div>
		);
	};
};