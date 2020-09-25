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
			"50% 3%",		// 1
			"100% 17%",	// 2
			"90% 40%",		// 3
			"95% 70%",		// 4
			"80% 95%",		// 5 
			"50% 99%",		// 6
			"27% 87%",		// 7 
			"1% 74%",		// 8 
			"5% 46%",		// 9
			"4% 7%"			// 10
		];
		this._starting_polygon_values = [
			"50% 50%",		// 1
			"100% 17%",	// 2
			"90% 40%",		// 3
			"95% 70%",		// 4
			"80% 95%",		// 5 
			"50% 99%",		// 6
			"27% 87%",		// 7 
			"1% 74%",		// 8 
			"5% 46%",		// 9
			"4% 7%"			// 10
		];
		this._ending_polygon_values = [
			"50% 3%",		// 1
			"100% 0%",		// 2
			"100% 50%",		// 3
			"100% 75%",		// 4
			"100% 100%",		// 5 
			"50% 97%",		// 6
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
		}
		return _rv;
	};
	ComputeClipPath( v )
	{
		console.debug( "ComputeClipPath", v, this.CurrentPolygonValues.length, this.CurrentPolygonValues.length );

		if ( v === 0 )
		{
			this.CurrentPolygonValues = this._starting_polygon_values;
		}
		else if ( v === 100 )
		{
			return;	//this.CurrentPolygonValues = this._ending_polygon_values;
		}
		else
		{
			for ( let i = 0; i < this.CurrentPolygonValues.length; i++ )
			{
				let _val_one;
				let _val_two;

				if ( i === 0 )
				{
					let _temp = this.CleanPolyValues( this.CurrentPolygonValues[i] );
					console.debug( i, v, _temp );

					_val_one = 50 + this._percentage;
					_val_two = ( _temp[1] - 0.5 ) + this._percentage;

					let _val_string = _val_one + " " + _val_two;
					console.debug( i,v, _val_one, _val_two, _val_string );

					this.CurrentPolygonValues[i] = _val_string;
				}
			}
		}

		return; 
	}
	render()
	{
		const _outer_class_name = "prog-pie-outer-circle";
		const _inner_class_name = "prog-pie-inner-circle " + this.Color;
		const _value_class_name = "prog-pie-value " + this.Color;
		const _value_string = this.props.value + "%";


		this.ComputeClipPath( this.props.value );
		//	console.debug(this.props.value, "this.CurrentPolygonValues", this.CurrentPolygonValues );
		const _poly_join = this.CurrentPolygonValues.join( ',' );
		//	console.debug( "_poly_join", _poly_join );
		const _clip_path = { "clipPath": "polygon(" + _poly_join + ")" };

		return (
			<div className="prog-pie-ctrl">
				<div className={_outer_class_name}></div>
				<div className={_inner_class_name} style={_clip_path}></div>
				<div className={_value_class_name}>{ _value_string }</div>
			</div>
		);
	};
};
