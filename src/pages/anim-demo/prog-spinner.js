import React from 'react';
import './prog-spinner.css';

export default class ProgressSpinnerControl extends React.Component
{
	static defaultProps = {
		Sizes:
		{
			ExtraLarge: "progress-extra-large spin",
			Large: "progress-large spin",
			Medium: "progress-medium spin",
			Small: "progress-small spin"
		}
	};
	constructor( props )
	{	
		super( props );
		this.Size = ( this.props.size || ProgressSpinnerControl.defaultProps.Sizes.Medium );
		return;
	};
	render()
	{	//	console.debug( "ProgressSpinnerControl.render()", this.props.size, this.Size );	
		return (
			<div className={this.Size}>
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" imageRendering="optimizeSpeed">
					<g id="background-filler">
						<rect width="512px" height="512px" fill="rgba(0,0,0,0)" />
					</g>
					<defs>
						<clipPath id="spinner-path-1">
							<rect x="0" y="0" width="256px" height="256px"/>
						</clipPath>
					</defs>
					<g>
						<circle cx="256px" cy="256px" r="200px" stroke="#EFF6FC" fill="none" strokeWidth="30" />
						<circle cx="256px" cy="256px" r="200px" stroke="#0078D4" fill="none" strokeWidth="30" clipPath="url(#spinner-path-1)" />
					</g>
				</svg>
			</div>
		);
	};
};
