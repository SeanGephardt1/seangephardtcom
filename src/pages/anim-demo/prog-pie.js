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

		this._percentage = "%";

		this._default_polygon_values = [
			"50% 40%",		// 1
			"60% 40%",		// 2
			"60% 50%",		// 3
			"60% 55%",		// 4
			"60% 60%",		// 5 
			"50% 60%",		// 6
			"40% 60%",		// 7 
			"40% 56%",		// 8 
			"40% 50%",		// 9
			"40% 40%"		// 10
		];
		this._starting_polygon_values = [
			"50% 40%",		// 1
			"60% 40%",		// 2
			"60% 50%",		// 3
			"60% 55%",		// 4
			"60% 60%",		// 5 
			"50% 60%",		// 6
			"40% 60%",		// 7 
			"40% 56%",		// 8 
			"40% 50%",		// 9
			"40% 40%"		// 10
		];
		this._ending_polygon_values = [
			"50% 0%",		// 1
			"100% 0%",		// 2
			"100% 50%",		// 3
			"100% 75%",		// 4
			"100% 100%",		// 5 
			"50% 100%",		// 6
			"0% 100%",		// 7 
			"0% 100%",		// 8 
			"0% 100%",		// 9
			"0% 0%"			// 10
		];		

		this.CurrentPolygonValues = this._starting_polygon_values;

		this.state = {
			polygonValuesChanged: false
		}
		return;
	};
	CleanPolyValues( value )
	{
		let _rv = value.split( " " );
		for ( let c = 0; c < _rv.length; c++ )
		{
			_rv[c] = _rv[c].replace( this._percentage, "" );
			if ( _rv[c] < 0 )
			{
				_rv[c] = 0;
			}

			if ( _rv[c] > 99 )
			{
				_rv[c] = 100;
			}
		}
		return _rv;
	};
	ComputeClipPath( val )
	{
		console.debug( "ComputeClipPath", val );

		let _temp_values = [];

		if ( val === 0 || val === 1 )
		{
			_temp_values = [...this._starting_polygon_values];
		}
		else if ( val === 100 )
		{
			_temp_values = [...this._ending_polygon_values];
		}
		else
		{
			_temp_values = [...this.CurrentPolygonValues];

			for ( let i = 0; i < _temp_values.length; i++ )
			{
				let _temp = this.CleanPolyValues( _temp_values[i] );
				console.debug( i, val, _temp[0], _temp[1]);

				//let _val_one = 50 + this._percentage;
				//let _val_two = ( _temp[1] - 0.5 ) + this._percentage;

				//let _val_string = _val_one + " " + _val_two;
				//console.debug( i, val, _val_one, _val_two, _val_string );

				//	_temp_values[i] = _val_string;
			}
		}

		console.debug( val, "_temp", _temp_values, this.CurrentPolygonValues );
		this.CurrentPolygonValues = _temp_values;
		return; 
	}
	render()
	{
		//	console.debug( "ProgressPieControl", this.props.value );
		const _outer_class_name = "prog-pie-outer-circle";
		const _inner_class_name = "prog-pie-inner-circle " + this.Color;

		//const _value_class_name = "prog-pie-value " + this.Color;
		//const _value_string = this.props.value + "%";
		//	<div className={_value_class_name}>{ _value_string }</div>

		this.ComputeClipPath( this.props.value );
		//	console.debug(this.props.value, "this.CurrentPolygonValues", this.CurrentPolygonValues );
		const _poly_join = this.CurrentPolygonValues.join( ',' );
		//	console.debug( "_poly_join", _poly_join );
		const _clip_path = { "clipPath": "polygon(" + _poly_join + ")" };

		return (
			<div className="prog-pie-ctrl">
				<div className={_outer_class_name}></div>
				<div className={_inner_class_name} style={_clip_path}></div>

			</div>
		);
	};
};
