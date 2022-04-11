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
			<footer>&copy; { new Date().getFullYear().toString() } Sean Gephardt. All rights reserved.</footer>
		);
	};
};