import React from 'react';
import './header.css';

export class PortfolioHeader extends React.Component {
	//	static contextType = AzureThemeContext;
	constructor(props) {
		super(props);
		return;
	};
	render()
	{
		//	console.debug( "PortfolioHeader.render()" );	//, this.props.navigateEvent);
		return (
			<header className="main-header">{this.props.children}</header>
		);
	};
};