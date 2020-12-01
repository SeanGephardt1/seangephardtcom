import React from 'react';

export default class SiteFooter extends React.Component
{
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