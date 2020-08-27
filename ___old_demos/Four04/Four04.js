import React from 'react';
import './Four04.css';

export class Four04 extends React.Component
{
	//	static contextType = AzureThemeContext;
	static defaultProps = {
		Title: "404 - content not found",
		LinkTitle: "About",
		Href: "/"
	};
	constructor( props )
	{
		super( props );
		return;
	};

	render()
	{	//	console.debug( "home-ext.render()" );	//, this.props.navigateEvent);
		return (
			<main className="four-04">{this.props.children}</main>
		);
	};
};