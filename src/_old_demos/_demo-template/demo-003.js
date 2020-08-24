import React from 'react';
import './demo-003.css';

export class Demo003Extension extends React.Component
{
	//	static contextType = AzureThemeContext;
	static defaultProps = {
		Title: "Demo - MyMail ",
		LinkTitle: "Mail Demo",
		Href: "/my-mail/"
		// Icon: SvgIcon.Extensions.AzureHome,
		//Columns: [],
		//Data: []
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || Demo003Extension.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Demo003Extension.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Demo003Extension.defaultProps.Href );
		
		return;
	};


	render()
	{	//	console.debug( "home-ext.render()" );	//, this.props.navigateEvent);
		return (
			<div className="demo-001-main">
				<div>{Demo003Extension.defaultProps.Title}</div>
				<div>{Demo003Extension.defaultProps.LinkTitle}</div>
			</div>
		);
	};
};