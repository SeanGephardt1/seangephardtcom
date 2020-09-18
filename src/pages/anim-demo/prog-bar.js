import React from 'react';
import './prog-bar.css';

export default class ProgressBarControl extends React.Component
{
	static defaultProps = {
		Colors:
		{
			Red: "pb-red",
			Orange: "pb-orange",
			Yellow: "pb-yellow",
			Green: "pb-green",
			Blue: "pb-blue",
			Purple: "pb-purple"
		}
	};
	constructor( props )
	{	
		super( props );
		this.Color = ( this.props.color || ProgressBarControl.defaultProps.Colors.Red );
		return;
	};
	render()
	{	//	console.debug( "ProgressBarControl.render()", this.props.size, this.Color );	
		const progClassName = "inner-bar " + this.Color;
		console.debug( "ProgressBarControl.render()", progClassName );	

		return (
			<div className="prog-bar">
				<div className={ progClassName}></div>
			</div>
		);
	};
};
