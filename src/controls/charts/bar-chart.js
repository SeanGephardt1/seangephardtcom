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

		for ( let i = 0; i < 25; i++ )
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
		this._box_dimension = 500;

		this.ViewBox = 0;
		this.Height = 0;
		this.Width = 0;
		return;
	};
	ComputeLayout()
	{	//	console.debug( "ComputeLayout", this.props.data.length, this.props.orientation );

		this.Width = ( this.props.data.length * this._bar_width_or_height ) + this._left_border;
		this.Height = this._box_dimension + this._bottom_border;
		this.ViewBox = "0 0 " + this.Width + " " + this.Height;
 		return;
	};
	render()
	{		
		//	V - <rect x="0" y="112" height="400" width="20" rx="0" ry="0" fill="red" stroke="black" strokeWidth="0.2"/>
		//	H - <rect x={this._left_border} y="10" height={ this._bar_width_or_height } width={ 400 } fill="red" stroke="black" strokeWidth="0.2"/>
		// V line - 					<line x1="50" y1="0" x2="50" y2={ this._box_dimension} stroke="red" strokeWidth="1"/>

		this.ComputeLayout();

		return (
			<div className="bar-chart-panel">
				<svg viewBox={ this.ViewBox }  height="100%" width="100%" className="bc-svg-root">
					<rect id="debug-background" fill="rgba(240,250,255,1)" height={this.Height} width={this.Width}></rect>

					<rect id="percentage-column" x="0" y="0" height={this.Height} width={this._left_border} fill="rgba(250,250,250,1)"></rect>
					<rect id="value-row" x="0" y="500" height={this._bottom_border} width={this.Width}  fill="rgba(250,250,250,1)"></rect>


					{/* Percentage column */
						this.props.orientation === BarChart.defaultProps.Orientations.Vertical &&
						<g>
							<text textLength="100%" fontSize="20" textAnchor="start">
								<tspan x="5" y="20">100%</tspan>
								<tspan x="5" y="70">90%</tspan>
								<tspan x="5" y="120">80%</tspan>
								<tspan x="5" y="170">70%</tspan>
								<tspan x="5" y="220">60%</tspan>
								<tspan x="5" y="270">50%</tspan>
								<tspan x="5" y="320">40%</tspan>
								<tspan x="5" y="370">30%</tspan>
								<tspan x="5" y="420">20%</tspan>
								<tspan x="5" y="470">10%</tspan>
								<tspan x="5" y="520">0%</tspan>
							</text>
							<line x1={this._left_border} y1="50" x2={ this.Width} y2="50" stroke="black"  strokeWidth="0.5" />
							<line x1={this._left_border} y1="100" x2={ this.Width} y2="100" stroke="black"  strokeWidth="0.5" />
							<line x1={this._left_border} y1="150" x2={ this.Width} y2="150" stroke="black" strokeWidth="0.5"/>
							<line x1={this._left_border} y1="200" x2={ this.Width} y2="200" stroke="black" strokeWidth="0.5" />
							<line x1={this._left_border} y1="250" x2={ this.Width} y2="250" stroke="black" strokeWidth="0.5" />
							<line x1={this._left_border} y1="300" x2={ this.Width} y2="300" stroke="black" strokeWidth="0.5" />
							<line x1={this._left_border} y1="350" x2={ this.Width} y2="350" stroke="black" strokeWidth="0.5" />
							<line x1={this._left_border} y1="400" x2={ this.Width} y2="400" stroke="black" strokeWidth="0.5"/>
							<line x1={this._left_border} y1="450" x2={ this.Width} y2="450" stroke="black" strokeWidth="0.5"/>
							<line x1={this._left_border} y1="500" x2={ this.Width} y2="500" stroke="black" strokeWidth="0.5"/>
						</g>
					}
					{/* Percentage column */
						this.props.orientation === BarChart.defaultProps.Orientations.Horizontal &&
						<g>
						<text textLength="100%" fontSize="20" textAnchor="start">
							<tspan x="45" y="520">0%</tspan>
							<tspan x="90" y="520">10%</tspan>
							<tspan x="135" y="520">20%</tspan>
							<tspan x="180" y="520">30%</tspan>
							<tspan x="225" y="520">40%</tspan>
							<tspan x="275" y="520">50%</tspan>
							<tspan x="325" y="520">60%</tspan>
							<tspan x="370" y="520">70%</tspan>
							<tspan x="415" y="520">80%</tspan>
							<tspan x="460" y="520">90%</tspan>
							<tspan x="500" y="520">100%</tspan>
							</text>

							<line x1="50" x2="50" y1="0" y2={ this._box_dimension} stroke="black" strokeWidth="0.5"/>
							<line x1="100" x2="100" y1="0" y2={this._box_dimension} stroke="black" strokeWidth="0.5" />
							<line x1="150" x2="150" y1="0" y2={ this._box_dimension} stroke="black" strokeWidth="0.5"/>
							<line x1="200" x2="200" y1="0" y2={ this._box_dimension} stroke="black" strokeWidth="0.5"/>
							<line x1="250" x2="250" y1="0" y2={ this._box_dimension} stroke="black" strokeWidth="0.5"/>
							<line x1="300" x2="300" y1="0" y2={ this._box_dimension} stroke="black" strokeWidth="0.5"/>
							<line x1="350" x2="350" y1="0" y2={ this._box_dimension} stroke="black" strokeWidth="0.5"/>
							<line x1="400" x2="400" y1="0" y2={ this._box_dimension} stroke="black" strokeWidth="0.5"/>
							<line x1="450" x2="450" y1="0" y2={ this._box_dimension} stroke="black" strokeWidth="0.5"/>
							<line x1="500" x2="500" y1="0" y2={ this._box_dimension} stroke="black" strokeWidth="0.5"/>
						</g>
					}


					{
						this.props.orientation === BarChart.defaultProps.Orientations.Vertical &&
						this.props.data.map( ( item, index ) =>
						(
							<rect key={index} x={( this._left_border + index * this._bar_width_or_height )} y={item.value} height={item.height} width={ this._bar_width_or_height } fill="rgba(0,128,255,1)" stroke="rgba(255,255,255,1)" strokeWidth="1" />
						) )
					}

					{
						this.props.orientation === BarChart.defaultProps.Orientations.Horizontal && 
						this.props.data.map( ( item, index ) =>
						(
							<rect key={index} x={this._left_border} y={index * this._bar_width_or_height}  height={ this._bar_width_or_height } width={ item.height } fill="rgba(0,128,255,1)" stroke="rgba(255,255,255,1)" strokeWidth="1"/>
						) )
					}


				</svg>
			</div>
		);
	};
};
