import React from 'react';
import './bar-chart.css';

export default class BarChart extends React.Component
{
	static defaultProps = {
		Orientations:
		{
			Horizontal: "H",
			Vertical: "V"
		}
	};
	// GENERATE 4 VALUES PER COLUMN
	static GenerateBarChartData(numOfValues)
	{	//	
		console.debug( "GenerateBarChartData", numOfValues );
		let _rv = [];

		const _top_cap = 512;

		for ( let i = 0; i < 26; i++ )
		{
			let _temp = { value: 0, height: 0, percentage: 0 };

			//	Math.random() * (max - min) + min; 
			_temp.value = Math.round( Math.random() * ( _top_cap - 100 ) + 100 );	
			_temp.height = ( _top_cap - _temp.value );

			// get percentage
			//	let _perc = (( _temp.value / _top_cap ) * 100).toFixed(1);
			//	console.debug("%", _top_cap, _temp.value,  _perc);

			_temp.percentage = (( _temp.value / _top_cap ) * 100).toFixed(1);

			//console.debug( "_temp", _temp );
			_rv.push( _temp );
		}

		return _rv;
	};
	constructor( props )
	{	
		super( props );
		this.state = {};

		this.Orientation = ( this.props.orientation || BarChart.defaultProps.Orientations.Vertical );
		this.Data = ( this.props.data || BarChart.GenerateBarChartData(4) );

		this._left_border = 50;
		this._bottom_border = 50;
		this._bar_width_or_height = 20;
		this._box_dimension = 512;

		this.ViewBox = 0;
		this.Height = 0;
		this.Width = 0;
		return;
	};
	ComputeLayout()
	{
		console.debug( "ComputeLayout", this.props.data.length, this.props.orientation );

		this.Width = ( this.props.data.length * this._bar_width_or_height ) + this._left_border;
		this.Height = this._box_dimension + this._bottom_border;

		this.ViewBox = "0 0 " + this.Width + " " + this.Height;
 		return;
	};
	render()
	{		
		//	<rect x="0" y="112" height="400" width="20" rx="0" ry="0" fill="red" stroke="black" strokeWidth="0.2"/>
		console.debug( "Render", this.props.orientation, BarChart.defaultProps.Orientations.Horizontal );
		this.ComputeLayout();

		return (
			<div className="bar-chart-panel">
				<svg viewBox={ this.ViewBox }  height="100%" width="100%" className="bc-svg-root">
					<rect id="debug-background" fill="rgba(240,250,255,1)" height={this.Height} width={this.Width}></rect>

					{
						this.props.orientation === BarChart.defaultProps.Orientations.Vertical &&
						this.props.data !== undefined &&
						this.props.data.length !== 0 &&
						this.props.data.map( ( item, index ) =>
						(
							<rect key={index} x={( this._left_border + index * this._bar_width_or_height )} y={item.value} height={item.height} width="20" rx="0" ry="0" fill="rgba(0,128,255,1)" stroke="rgba(255,255,255,1)" strokeWidth="1" />
						) )
					}
					{
						this.props.orientation === BarChart.defaultProps.Orientations.Horizontal && 
						this.props.data !== undefined &&
						this.props.data.length !== 0 &&
						this.props.data.map( ( item, index ) =>
						(
							<rect key={index} x={( this._left_border + index * this._bar_width_or_height )} y={item.value} height={item.height} width="20" rx="0" ry="0" fill="rgba(0,128,255,1)" stroke="rgba(255,255,255,1)" strokeWidth="1" />
						) )
					}
				</svg>
			</div>
		);
	};
};
