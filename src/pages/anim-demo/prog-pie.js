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


		this._starting_polygon_values = [
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
		this._ending_polygon_values = [
			"50% 5%",		// 1
			"100% 0%",		// 2
			"100% 50%",		// 3
			"100% 75%",		// 4
			"100% 100%",		// 5 
			"50% 95%",		// 6
			"0% 100%",		// 7 
			"0% 100%",		// 8 
			"0% 100%",		// 9
			"0% 0%"			// 10
		];		

		this.state = {
			equalsZero: true,
			equalsHundred: false,
			polygonValue: this._ending_polygon_values
		}
		return;
	};
	ComputeClipPath( value )
	{
		//	console.debug( "ComputeClipPath", value );
		const _perc = "%"
		let _values = [];

		if ( value === 0 )
		{
			_values = this._default_polygon_values;
		}
		else if ( value === 100 )
		{
			_values = this._default_polygon_values;
		}
		else
		{
			for ( let i = 0; i < 10; i++ )
			{
				let _val_one;
				let _val_two;

				if ( i === 0 )
				{
					_val_one = 50 + _perc;
					_val_two = 50 + _perc;
				}
				else if ( i === 9 )
				{
					_val_one = 100 + _perc;
					_val_two = 100 + _perc;
				}
				else
				{
					_val_one = Math.round( ( i * value ) * Math.PI.toFixed( 2 ) ) + _perc;
					_val_two = Math.round( ( i * value ) * Math.PI.toFixed( 2 ) ) + _perc;
				}

				let _val_string = _val_one + " " + _val_two;
				console.debug( value, i, _val_one, _val_two );
				_values.push(_val_string);
			}

		}

		console.debug( "V:", value, _values );
		this.setState( { polygonValue: _values } );
		return; 
	}
	render()
	{
		//	console.debug( "this.props", this.props.value);

		const _outer_class_name = "prog-pie-outer-circle";
		const _inner_class_name = "prog-pie-inner-circle " + this.Color;

		const _value_class_name = "prog-pie-value " + this.Color;
		const _value_string = this.props.value + "%";

		//	const _clip_path = this.ComputeClipPath( this.props.value );
		const _poly_join = this.state.polygonValue.join( ',' );
		console.debug( "_poly_join", _poly_join );

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
