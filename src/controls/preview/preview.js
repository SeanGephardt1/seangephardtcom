import React from 'react';
import './preview.min.css';

export class PreviewControl extends React.Component
{
	constructor ( props )
	{
		super(props);
		return;
	};
	render()
	{	//	console.debug( "PreviewControl.render()" );
		return (
			<div className="demo-preview-badge">
				<div className="demo-text">{this.props.children}</div>
			</div>
		);
	};
};