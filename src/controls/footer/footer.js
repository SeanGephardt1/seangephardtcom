import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';
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
		return (
			<footer>{this.props.children}</footer>
		);
	};
};