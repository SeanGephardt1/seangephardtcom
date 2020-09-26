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

		if ( val === 0 || val === 1 )
		{
			this.CurrentPolygonValues = [...this._starting_polygon_values];
		}
		else if ( val === 100 )
		{
			this.CurrentPolygonValues = [...this._ending_polygon_values];
		}
		else
		{
			let _temp_values = [...this.CurrentPolygonValues];
			//let _temp_values = [];

			for ( let i = 0; i < this.CurrentPolygonValues.length; i++ )
			{
				let _temp1 = this.CleanPolyValues( this.CurrentPolygonValues[i] );
				console.debug( "_temp1", i, val, _temp1[0], _temp1[1]);

				let _one, _two;

				if ( i < 7 )
				{
					_one = parseInt( _temp1[0] ) + i;
					_two = parseInt( _temp1[1] ) + i;
				}
				else if ( i > 7)
				{
					_one = 50;
					_two = 100;
				}


				if ( _one < 0 ) { _one = 0; }
				if ( _one > 99 ) { _one = 100; }
				if ( _two < 0 ) { _two = 0; }
				if ( _two > 99 ) { _two = 100; }

				console.debug( "_one,_two", i, val, _temp1[0], _temp1[1], _one,_two);

				_temp_values[i] = _one + this._percentage + " " + _two + this._percentage;
				console.debug( i, _temp_values[i] );
				console.debug();
			}

			console.debug( val, "_temp", _temp_values,this.CurrentPolygonValues );
			this.CurrentPolygonValues = [..._temp_values];
			console.debug( val, "_temp", _temp_values,this.CurrentPolygonValues );
		}
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
