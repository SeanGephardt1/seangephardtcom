import React from 'react';
import './prog-pie.css';

export default class ProgressPieControl extends React.Component
{
	static defaultProps = {
		Colors:
		{
			Red: "pp-red",
			Orange: "pp-orange",
			Yellow: "pp-yellow",
			Green: "pp-green",
			Blue: "pp-blue",
			Purple: "pp-purple"
		}
	};
	constructor( props )
	{	
		super( props );
		this.Color = ( this.props.color || ProgressPieControl.defaultProps.Colors.Red );
		this.Value = ( this.props.value || 0 );
		return;
	};
	render()
	{
		//	console.debug( "this.props", this.props);

		const _outer_class_name = "prog-pie-outer-circle";
		const _inner_class_name = "prog-pie-inner-circle " + this.Color;

		const _value_class_name = "prog-pie-value " + this.Color;
		const _value_string = this.props.value + "%";

		return (
			<div className="prog-pie-ctrl">
				<div className={_outer_class_name}></div>
				<div className={_inner_class_name}></div>
				<div className={_value_class_name}>{ _value_string }</div>
			</div>
		);
	};
};
