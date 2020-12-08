//	https://raw.githubusercontent.com/petercollingridge/code-for-blog/master/svg-interaction/pan_and_zoom/pan_and_zoom.svg

import React from 'react';
import './svg-tele-spec.css';
import TelecasterSvg from "./tele-svg.js";

export default class TeleSpecDemo extends React.Component
{
	static defaultProps = {
		Title: "SVG Fender Telecaster Spec Demo",
		LinkTitle: "SVG Guitar Spec Demo",
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

		this._default_matrix = "matrix(1, 0, 0, 1, 0, 0)";
		this._default_translate = "translate(0,0)";

		this.state = {
			viewBoxValues: [1250, 1000],
			matrixValues: [1, 0, 0, 1, 0, 0],
			translateValues: [0,0],
			transform: this._default_matrix + " " + this._default_translate,
			IsDragging: false,
			rangeZoom: 5,
			rangeValue: 1
		};

		this.ViewBox = "0 0 " + this.state.viewBoxValues[0] + " " + this.state.viewBoxValues[1];
		return;
	};
	OnClick_ResetZoom( ev )
	{	
		this.setState( {
			viewBoxValues: [1250, 1000],
			matrixValues: [1, 0, 0, 1, 0, 0],
			translateValues: [0,0],
			transform: this._default_matrix + " " + this._default_translate,
			IsDragging: false,
			rangeZoom: 5,
			rangeValue: 1
		} );
		return;
	}
	// FIX ZOOM to be equal both ways
	//ORIGINAL
	//for ( var i = 0; i < 6; i++ )
	//{
	//	_matrix_vals[i] = _matrix_vals[i] * _new_scale;
	//	//	console.debug(i,  _matrix_vals[i] );
	//}
	//_matrix_vals[4] += Math.round( ( ( 1 - _new_scale ) * _centerX ) );
	//_matrix_vals[5] += Math.round( ( ( 1 - _new_scale ) * _centerY ) );
	Zoom( scale )
	{
		let _matrix_vals = this.state.matrixValues;
		let _centerX = parseInt( this.state.viewBoxValues[0] ) / 2;
		let _centerY = parseInt( this.state.viewBoxValues[1] ) / 2;
		let _scales = [0.6, 0.7, 0.8, 0.9, 1, 1.5, 3, 4.5, 6, 7.5];
		let _new_scale = _scales[scale-1];

		_matrix_vals[0] = _new_scale;
		_matrix_vals[3] = _new_scale;
		_matrix_vals[4] = Math.round( ( ( 1 - _new_scale ) * _centerX ) );
		_matrix_vals[5] = Math.round( ( ( 1 - _new_scale ) * _centerY ) );

		let _t_matrix = "matrix(" + _matrix_vals.join( "," ) + ") translate(" + this.state.translateValues[0] + " " + this.state.translateValues[1] +")";

		this.setState( {
			rangeZoom: scale,
			rangeValue: _new_scale,
			matrixValues: _matrix_vals,
			transform: _t_matrix
		} );
	};
	OnClick_ZoomIn( ev )
	{	//	console.debug( "OnClick_ZoomIn", this.state.rangeZoom );
		let _in = this.state.rangeZoom + 1;
		if ( _in > 10 )
		{
			_in = 10;
		}
		this.Zoom( _in );
		return;
	};
	OnClick_ZoomOut( ev )
	{	//	console.debug( "OnClick_ZoomIn", this.state.rangeZoom );
		let _out = this.state.rangeZoom - 1;
		if ( _out < 1 )
		{
			_out = 1;
		}
		this.Zoom( _out );
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
				_scale_val = this.state.rangeZoom - 1;
			}
			else if ( ev.deltaY === -100 )
			{
				_scale_val = this.state.rangeZoom + 1;
			}

			if ( _scale_val < 1 )
			{
				_scale_val = 1;
			}
			else if ( _scale_val > 10 )
			{
				_scale_val = 10;
			}

			this.Zoom( _scale_val );
		}

		return false;
	};
	OnChangeRange_Zoom( ev )
	{
		//	console.debug( "OnChangeRange_Zoom" );
		this.Zoom( ev.target.value );
		return false;
	}

	// dragging/panning
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
	SVG_OnMouseMove( ev )
	{	//	console.debug( "SVG_OnMouseMove", ev );
		if ( this.state.IsDragging === true )
		{
			let _x = this.state.translateValues[0] + ev.movementX;
			let _y = this.state.translateValues[1] + ev.movementY;
			let _new_transform = "matrix(" + this.state.matrixValues.join( "," ) + ") translate(" + _x + " " + _y +")";

			this.setState( {
				translateValues: [_x, _y],
				matrixValues: this.state.matrixValues,
				transform: _new_transform
			} );
			ev.preventDefault();
		}
		return false;
	};
    render()
	{
		//	console.debug( "BigDataDemo.render()", this.state.transformMatrix );
		//		<div>
		//	<input type="file" id="myfile" name="myfile" />
		//</div>

        return (
			<div className="big-data-demo-layout">
				<div className="bd-page-title">Fender Telecaster Spec SVG Zoom Demo</div>
				<div className="bd-page-trademark">"Fender" & "Telecaster" are registered trademarks of Fender Musical Instrument Company.</div>
				<div className="bd-menu">
					<div>
						<label htmlFor="zoom_range">Select a size: { this.state.rangeValue }</label>
						<input type="range" id="zoom_range" name="zoom_range" min="1" max="10" step="1"
							value={this.state.rangeZoom}
							onChange={this.OnChangeRange_Zoom.bind( this )} />
					</div>
					<div className="bd-menu-item" onClick={ this.OnClick_ZoomIn.bind(this)}>Zoom In</div>
					<div className="bd-menu-item" onClick={ this.OnClick_ZoomOut.bind(this)}>Zoom out</div>
					<div className="bd-menu-item" onClick={ this.OnClick_ResetZoom.bind(this)}>Reset</div>
				</div>
				<div className="bd-menu">
					Hold the "shift" key to zoom in & out using the mouse
				</div>
				<div className="bd-menu">
					{this.state.transform}
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

					<g id="SvgChildDraggable1" draggable="true" transform={this.state.transform}>
						<TelecasterSvg />
					</g>
				</svg>
			</div>
        );
    }
};