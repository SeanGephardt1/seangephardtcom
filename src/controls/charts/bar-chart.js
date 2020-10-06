import React from 'react';
import './bar-chart.css';

export default class BarChart extends React.Component
{
	static defaultProps = {
		Orientations: {
			Vertical: "bc-vert",
			Horizontal: "bc-horz"
		}
	};
	constructor( props )
	{	
		super( props );
		this.state = {
			displayed: false
		};
		return;
	};
	render()
	{
		return (
			<div className="bar-chart-panel" >Bar Chart</div>
		);
	};
};
