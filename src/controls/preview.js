import React from 'react';
import './preview.css';

export class PreviewControl extends React.Component {
	//	static contextType = AzureThemeContext;
	constructor(props) {
		super(props);
		return;
	};
	render()
	{
		//	console.debug( "PortfolioHeader.render()" );	//, this.props.navigateEvent);
		return (
				<div className="demo-preview-badge">
				<div className="demo-text">{this.props.children}</div>
				</div>
		);
	};
};