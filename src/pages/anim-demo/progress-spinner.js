import React from 'react';
import './progress-spinner.css';

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
						<clipPath id="az-spinner-path-1">
							<rect x="0" y="0" width="256px" height="256px" fill="#FF0000" />
						</clipPath>
						<filter id="az-spinner-shadow-1" filterUnits="userSpaceOnUse">
							<feOffset in="SourceGraphic" result="oo-1" dx="0" dy="0" />
							<feGaussianBlur in="SourceAlpha" result="bo-1" stdDeviation="20" />
							<feBlend in="oo-1" in2="bo-1" result="blend-1" mode="normal" />
							<feMerge>
								<feMergeNode in="00-1" />
								<feMergeNode in="blend-1" />
							</feMerge>
						</filter>
						<filter id="az-spinner-shadow-2" filterUnits="userSpaceOnUse">
							<feOffset in="BackgroundAlpha" result="oo-2" dx="0" dy="0" />
							<feGaussianBlur in="StrokePaint" result="bo-2" stdDeviation="14" />
							<feBlend in="oo-2" in2="bo-2" result="blend-2" mode="normal" />
							<feMerge>
								<feMergeNode in="00-2" />
								<feMergeNode in="blend-2" />
							</feMerge>
						</filter>	
					</defs>
					<g>
						<circle cx="256px" cy="256px" r="200px" stroke="#EFF6FC" fill="none" strokeWidth="20" />
						<circle cx="256px" cy="256px" r="200px" stroke="#0078D4" fill="none" strokeWidth="20" clipPath="url(#az-spinner-path-1)" />
					</g>
				</svg>
			</div>
		);
	};
};
