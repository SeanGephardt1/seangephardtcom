import React from 'react';
import './header.css';

export default class LorumContent extends React.Component
{
	constructor ( props ) 
	{
		super( props );
		return;
	};
	render()
	{
		return (
			<footer>&copy; { new Date().getFullYear().toString() } Sean Gephardt. All rights reserved.</footer>
		);
	};
};