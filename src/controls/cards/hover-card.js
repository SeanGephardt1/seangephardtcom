import React from 'react';
import './hover-card.css';

export default class HoverCard extends React.Component
{
	static defaultProps = {
		Colors:
		{
			Red: "pi-red",
			Orange: "pi-orange",
			Yellow: "pi-yellow",
			Green: "pi-green",
			Blue: "pi-blue",
			Purple: "pi-purple"
		},
		Placements:
		{
			Top: "hc-place-top",
			Left: "hc-place-left",
			Right: "hc-place-right",
			Bottom: "hc-place-bottom"
		}
	};
	constructor( props )
	{	
		super( props );

		this.Color = ( this.props.color || HoverCard.defaultProps.Colors.Red );
		this.Placement = ( this.props.placement || HoverCard.defaultProps.Placements.Right );

		return;
	};
	render()
	{
		console.debug( "HoverCard.render()", this.props.placement );

		return (
			<div className="pi-panel">{ this.props.children}</div>
		);
	};
};
