import React from 'react';
import './modal.css';
import IgGuitarPic from './ig-guitars.jpg';

export default class ModalOverlay extends React.Component
{
	constructor( props )
	{	
		super( props );

		this.Close = this.props.closeEvent.bind( this );

		this.state = {
			displayed: false
		};
		return;
	};
	render()
	{
		return (
			<div className="modal-full-panel" >
				<div className="model-inner-panel">
					<div className="modal-test-image">
						<img src={IgGuitarPic}  alt="Fender Telecaster Cabronita" />
					</div>
					<div className="modal-controls-panel">
						<div tabIndex="0" className="hc-test-button" onClick={this.Close}>Click to close</div>
					</div>
				</div>
			</div>
		);
	};
};
