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
		this.state = {
			equalsZero: true,
			equalsHundred: false
		}
		return;
	};
	ComputeClipPath( value )
	{
		console.debug( "ComputeClipPath", value );
		// default testing = clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
		//	polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
		// "50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%";

		let _rv = {"clipPath": "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)"};

		//const _perc = "%"
		//let _p = "polygon(";
		//let _p_end = ")";

		//let _values = [];

		//if ( value === 0 )
		//{
		//	_rv = { "clipPath": _p + "50% 50%, 50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%," + _p_end };
		//}
		//else if ( value === 100 )
		//{
		//	_rv = { "clipPath": _p + "50% 0%, 100% 0, 100% 60%, 100% 100%, 0 100%, 0% 60%, 0 0" + _p_end };

		//}
		//else
		//{
		//	for ( let i = 0; i < 10; i++ )
		//	{
		//		let _val_one;
		//		let _val_two;

		//		if ( i === 0 )
		//		{
		//			_val_one = 50 + _perc;
		//			_val_two = 50 + _perc;
		//		}
		//		else if ( i === 10 )
		//		{
		//			_val_one = 50 + _perc;
		//			_val_two = 50 + _perc;
		//		}
		//		else
		//		{
		//			_val_one = i * Math.PI.toFixed(2) + _perc;
		//			_val_two = i * Math.PI.toFixed(2) + _perc;
		//		}

		//		let _val_string = _val_one + " " + _val_two;
		//		//	console.debug( "_val_one,_val_tow", _val_one, _val_two );
		//		// polygon(0% 50%,1% 51%,2% 52%,3% 53%,4% 54%,5% 55%,6% 56%,7% 57%,8% 58%,9% 59%)
		//		_values.push(_val_string);
		//	}
		//	console.debug( "_values", _values );

		//	_rv = { "clipPath": _p + _values.join(",") + _p_end };
		//}

		console.debug( "ComputeClipPath", value, _rv );
		return _rv; 
	}
	render()
	{
		//	console.debug( "this.props", this.props.value);

		const _outer_class_name = "prog-pie-outer-circle";
		const _inner_class_name = "prog-pie-inner-circle " + this.Color;

		const _value_class_name = "prog-pie-value " + this.Color;
		const _value_string = this.props.value + "%";

		const _clip_path = this.ComputeClipPath( this.props.value );

		return (
			<div className="prog-pie-ctrl">
				<div className={_outer_class_name}></div>
				<div className={_inner_class_name} style={_clip_path}></div>
				<div className={_value_class_name}>{ _value_string }</div>
			</div>
		);
	};
};
