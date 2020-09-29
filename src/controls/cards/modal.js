import React from 'react';
import './modal.css';

export default class ModalCard extends React.Component
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
	};
	constructor( props )
	{	
		super( props );

		this.Color = ( this.props.color || ModalCard.defaultProps.Colors.Red );

		this.state = {
			displayed: false
		};
		return;
	};
	OnClick_Close( ev )
	{
		console.debug( "OnClick_Close", this.state.displayed );

		this.setState( {
			displayed: !this.state.displayed
		} );
		return;
	};
	render()
	{
		return (
			<div className="modal-panel">
			</div>
		);
	};
};
