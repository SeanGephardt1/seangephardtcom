import React from 'react';

export default class FourOhFourPage extends React.Component
{
	static defaultProps = {
		Title: "Page not found - 404 - seangephardt.com",
		LinkTitle: "404",
		Href: "/404/",
		Icon: ""
	};
	constructor ( props )
	{	
		super( props );
		document.title = FourOhFourPage.defaultProps.Title;

		//	<meta http-equiv="refresh" content="5;URL='http://example.com/'" />
		//const metaRedirect = document.createElement( "meta" );
		//metaRedirect.httpEquiv = "refresh";
		//metaRedirect.content = "15; URL = /";
		//document.head.appendChild( metaRedirect );
		return;
	};
	render()
	{	//	console.debug( "FourOhFourPage.render()", this.props );
		return (
			<div className="page-layout padding30 centered">
				<div><a href="/">Page not found - 404 - Click here to return to the home page.</a></div>
			</div>
		);
	}
};