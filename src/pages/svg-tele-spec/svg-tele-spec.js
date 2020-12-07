//	https://raw.githubusercontent.com/petercollingridge/code-for-blog/master/svg-interaction/pan_and_zoom/pan_and_zoom.svg

import React from 'react';
import './svg-tele-spec.css';
import TelecasterSvg from "./tele-svg.js";

export default class TeleSpecDemo extends React.Component
{
	static defaultProps = {
		Title: "SVG Telecaster Spec Demo",
		LinkTitle: "SVG Telecaster Demo",
		Href: "/demos/svg-tele/",
		//Icon: SVG.AppNavButtons.About,
	};
	constructor( props )
	{
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		document.title = this.Title;

		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

		this.state = {
			changed: false,
			zoomMatrix: [1, 0, 0, 1, 0, 0],
			transformMatrix: "matrix(1, 0, 0, 1, 0, 0)",
			viewBoxValues: [1250, 1250],
			IsDragging: false,
			prevX: 0,
			prevY:0
		};

		this.ViewBox = "0 0 1250 1250";

		//	this.DragElement = null;
		return;
	};
	OnClick_ResetZoom( ev )
	{	//	console.debug( "OnClick_ResetZoom" );
		console.clear();
		this.setState( {
			zoomMatrix: [1, 0, 0, 1, 0, 0],
			transformMatrix: "matrix(1, 0, 0, 1, 0, 0)"
		} );
		return;
	}
	Zoom( scale )
	{
		let _matrix_vals = this.state.zoomMatrix;
		let _centerX = parseFloat( this.state.viewBoxValues[0] ) / 2;
		let _centerY = parseFloat( this.state.viewBoxValues[1] ) / 2;

		for ( var i = 0; i < 6; i++ )
		{
			_matrix_vals[i] = _matrix_vals[i] * scale;
		}

		_matrix_vals[4] += Math.round( ( ( 1 - scale ) * _centerX ) );
		_matrix_vals[5] += Math.round( ( ( 1 - scale ) * _centerY ) );

		let _t_matrix = "matrix(" + _matrix_vals.join( "," ) + ")";

		this.setState( {
			zoomMatrix: _matrix_vals,
			transformMatrix: _t_matrix
		} );
	};
	OnClick_ZoomIn( ev )
	{	//	console.debug( "OnClick_ZoomIn", ev );
		this.Zoom( 1.1 );
		return;
	};
	OnClick_ZoomOut( ev )
	{	//	console.debug( "OnClick_ZoomIn", ev );
		this.Zoom( 0.9 );
		return;
	};
	OnWheel_Zoom( ev )
	{	//	console.debug( "OnWheel_Zoom", ev);
		ev.stopPropagation();

		if ( ev.shiftKey === true )
		{
			let _scale_val = 0;

			if ( ev.deltaY === 100 )
			{
				_scale_val = 0.9;
			}
			else if ( ev.deltaY === -100 )
			{
				_scale_val = 1.1;
			}
			this.Zoom( _scale_val );
		}

		return false;
	};

	SVG_OnMouseDown( ev )
	{	//	console.debug( "SVG_OnMouseDown" );
		this.setState( { IsDragging: true } );
		ev.preventDefault();
		return false;
	};
	SVG_OnMouseUp( ev )
	{	//	console.debug( "SVG_OnMouseUp");
		this.setState( { IsDragging: false } );
		ev.preventDefault();
		return false;
	};
	SVG_OnMouseMove( ev)
	{	//	transformMatrix[4] += dx;
		//	transformMatrix[5] += dy;
		//	console.debug( "SVG_OnMouseMove", ev.pageX, ev.pageY, params );

		if ( this.state.IsDragging === true )
		{	//	console.debug( "SVG_OnMouseMove", this.state.IsDragging );
			//console.debug( "ev.pageX", ev.pageX, this.state.prevX );
			//console.debug( "ev.pageY", ev.pageY, this.state.prevY );

			let _matrix = this.state.zoomMatrix;
			console.debug( "_matrix[0]", _matrix[0] );

			const _incr_multiplier = 3;
			let _incr_val = 1;

			_incr_val = _matrix[0]  * _incr_multiplier;
			console.debug( "_incr_val", _incr_val );


			if ( ev.pageX > this.state.prevX )
			{
				_matrix[4] = _matrix[4] + _incr_val;
			}
			else if ( ev.pageX < this.state.prevX )
			{
				_matrix[4] = _matrix[4] - _incr_val;
			}

			if ( ev.pageY > this.state.prevY )
			{
				_matrix[5] = _matrix[5] + _incr_val;
			}
			else if ( ev.pageY < this.state.prevY )
			{
				_matrix[5] = _matrix[5] - _incr_val;
			}

			let _new_matrix = "matrix(" + _matrix.join( "," ) + ")";
			//	console.debug( "_new_matrix ", _new_matrix );

			this.setState( {
				prevX: ev.pageX,
				prevY: ev.pageY,
				zoomMatrix: _matrix,
				transformMatrix: _new_matrix
			} );
			ev.preventDefault();
		}
		return false;
	};
    render()
	{
		//	console.debug( "BigDataDemo.render()", this.state.transformMatrix );
		//	onMouseMove={this.SVG_OnMouseMove.bind( this )}

        return (
			<div className="big-data-demo-layout">
				<div className="bd-page-title">Fender Telecaster Spec SVG Zoom Demo</div>
				<div className="bd-page-trademark">"Fender" & "Telecaster" are registered trademarks of Fender Musical Instrument Company.</div>
				<div className="bd-menu">
					<div className="bd-menu-item" onClick={ this.OnClick_ZoomIn.bind(this)}>Zoom In</div>
					<div className="bd-menu-item" onClick={ this.OnClick_ZoomOut.bind(this)}>Zoom out</div>
					<div className="bd-menu-item" onClick={ this.OnClick_ResetZoom.bind(this)}>Reset</div>
				</div>
				<div className="bd-menu">
					Hold the "shift" key to zoom in & out using the mouse
				</div>
				<svg id="root-svg" className="bg-svg-container" x="0px" y="0px"
					viewBox={this.ViewBox}
					draggable="true"
					onWheel={this.OnWheel_Zoom.bind( this )}
					onMouseDown={this.SVG_OnMouseDown.bind( this )}
					onMouseMove={this.SVG_OnMouseMove.bind( this )}
					onMouseUp={this.SVG_OnMouseUp.bind( this )}
					onMouseLeave={this.SVG_OnMouseUp.bind( this )}
				>

					{ /* debug rect - remove when done */}
					<rect id="debugRect" x="0" y="0" height={this.state.viewBoxValues[0]} width={this.state.viewBoxValues[0]} />
					{ /* content */}

					<g id="SvgChildDraggable1" draggable="true" transform={this.state.transformMatrix}>
						<TelecasterSvg />
					</g>
				</svg>
			</div>
        );
    }
};