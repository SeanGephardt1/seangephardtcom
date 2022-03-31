import React from 'react';

export default class FourOhFourPage extends React.Component
{
	static defaultProps = {
		Title: "404",
		LinkTitle: "404",
		Href: "/404",
		Icon: ""
	};
	constructor ( props )
	{	
		super( props );
		document.title = FourOhFourPage.defaultProps.Title;
		return;
	};
	render()
	{	//	
		console.debug( "FourOhFourPage.render()", this.props );
		return (
			<div className="page-layout padding30">404	</div>
		);
	}
};