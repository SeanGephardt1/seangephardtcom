//	https://raw.githubusercontent.com/petercollingridge/code-for-blog/master/svg-interaction/pan_and_zoom/pan_and_zoom.svg

import React from 'react';
import './big-data-demo.css';
import TelecasterSvg from "./tele-svg.js";

export default class BigDataDemo extends React.Component
{
	static defaultProps = {
		Title: "Big Data Demo",
		LinkTitle: "Big Data Demo",
		Href: "/demos/big-data/",
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
		};

		this.ViewBox = "0 0 1250 1250";

		return;
	};
	OnClick_ResetZoom( ev )
	{	//	console.debug( "OnClick_ResetZoom" );
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
		this.Zoom( 0.9 );
		return;
	};
	OnClick_ZoomOut( ev )
	{	//	console.debug( "OnClick_ZoomIn", ev );
		this.Zoom( 1.1 );
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
    render()
	{
		//	console.debug( "BigDataDemo.render()", this.state.transformMatrix );
        return (
			<div className="big-data-demo-layout">
				<div className="bd-page-title">Big Data SVG Zoom App</div>
				<div className="bd-menu">
					<div className="bd-menu-item" onClick={ this.OnClick_ZoomIn.bind(this)}>Zoom In</div>
					<div className="bd-menu-item" onClick={ this.OnClick_ZoomOut.bind(this)}>Zoom out</div>
					<div className="bd-menu-item" onClick={ this.OnClick_ResetZoom.bind(this)}>Reset</div>
				</div>
				<div className="bd-menu">
					Hold the "shift" key to zoom in & out using the mouse
				</div>
				<svg className="bg-svg-container" x="0px" y="0px" viewBox={this.ViewBox} onWheel={ this.OnWheel_Zoom.bind(this)}>
					<rect id="debugRect"
						fill="rgba(0,0,255,0.01)" 
                        x="0"
                        y="0"
						height={this._vb_height}
						width={this._vb_width} />
					{ /* content */}

					<g transform={this.state.transformMatrix}>
						<TelecasterSvg/>
					</g>
				</svg>
			</div>
        );
    }
};