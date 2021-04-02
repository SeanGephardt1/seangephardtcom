//	https://raw.githubusercontent.com/petercollingridge/code-for-blog/master/svg-interaction/pan_and_zoom/pan_and_zoom.svg

import React from 'react';
import './svg-zoom.css';
import ArtSVGs from "./svg-zoom-data.js";

export default class SvgZoomDemo extends React.Component
{
	static defaultProps = {
		Title: "SVG demos",
		LinkTitle: "SVG demos",
		Href: "/portfolio/svg-demos/",
		Icon: ""//SVG.AppNavButtons.About,
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
			dragClassName: "bg-svg-container",
			rangeZoom: 5,
			rangeValue: 1,
			currentSvg: ArtSVGs.Art[0].name
		};

		this.SVG = ArtSVGs.Art[0].svg;

		this.ViewBox = "0 0 " + this.state.viewBoxValues[0] + " " + this.state.viewBoxValues[1];
		return;
	};

	OnChange_SVG_SelectedItem( ev )
	{	//	console.debug( "OnChange_SVG_SelectedItem", ev.target.value, GuitarSVGs.Guitars[ev.target.value].name);
		this.SVG = ArtSVGs.Art[ev.target.value].svg;
		this.setState( {
			currentSvg: ArtSVGs.Art[ev.target.value].name
		} );
		return;
	}

	OnClick_ResetZoom( ev )
	{	
		this.setState( {
			viewBoxValues: [1250, 1000],
			matrixValues: [1, 0, 0, 1, 0, 0],
			translateValues: [0,0],
			transform: this._default_matrix + " " + this._default_translate,
			IsDragging: false,
			dragClassName: "bg-svg-container",
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
		let _scales = [0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5, 6];
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
		this.Zoom( parseInt(ev.target.value) );
		return false;
	}

	// dragging/panning
	SVG_OnMouseDown( ev )
	{	//	console.debug( "SVG_OnMouseDown", ev );

		this.setState( {
			IsDragging: true,
			dragClassName: "bg-svg-container-grabbing",
		} );
		ev.preventDefault();
		return false;
	};
	SVG_OnMouseUp( ev )
	{	//	console.debug( "SVG_OnMouseUp", this.state.IsDragging );
		ev.preventDefault();
		if ( this.state.IsDragging === true )
		{
			this.setState( {
				IsDragging: false,
				dragClassName: "bg-svg-container",
			} );
		}
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
		//	console.debug( "render.this.currentSvg", this.state.currentSvg );
		//	console.debug( "BigDataDemo.render()", this.state.transformMatrix );
        return (
			<div className="page-layout">
				<div className="bd-page-title">SVG (Scalable Vector Graphics) zoom & pan demo</div>

				<div className="bd-page-description"><a href="https://en.wikipedia.org/wiki/Scalable_Vector_Graphics" target="new" title="SVG (Scalable Vector Graphics)">SVG (Scalable Vector Graphics)</a> is a great, performant and web browser standards compliant format that allows for creating and using vector based programs such as Adobe Illiustrator.<br/><br/>Select from a variety of SVG illistrations. Hold the "shift" key to zoom in & out using the mouse wheel or using the slider control. Click and hold with a mouse to pan.</div>

				<div className="input-nav">

					<label htmlFor="svg_list" className="select-svg-list">
						<span>Select a SVG:</span>
						<select
							defaultValue={this.state.currentSvg}
							onChange={this.OnChange_SVG_SelectedItem.bind( this )}>
							{
								ArtSVGs.Art.map( ( item, index ) => (
									<option key={index} value={ index }>{ item.name }</option>
								))
							}
						</select>
					</label>

					<label htmlFor="zoom_range" className="zoom-range">
							<span>Select a size:</span>
							<span>{this.state.rangeValue}</span>
							<input type="range" id="zoom_range" name="zoom_range"
							min="1" max="10" step="1"
							value={this.state.rangeZoom}
							onChange={this.OnChangeRange_Zoom.bind( this )} />
						</label>

					<div className="demo-nav-item" onClick={this.OnClick_ZoomIn.bind( this )}>Zoom In</div>
					<div className="demo-nav-item" onClick={this.OnClick_ZoomOut.bind( this )}>Zoom out</div>
					<div className="demo-nav-item" onClick={this.OnClick_ResetZoom.bind( this )}>Reset</div>

				</div>

				{/*<div className="bd-menu">this.state.transform</div>*/}		
				<svg id="root-svg"
					x="0px" y="0px"
					className={this.state.dragClassName}
					viewBox={this.ViewBox}
					onWheel={this.OnWheel_Zoom.bind( this )}
					onMouseDown={this.SVG_OnMouseDown.bind( this )}
					onMouseMove={this.SVG_OnMouseMove.bind( this )}
					onMouseUp={this.SVG_OnMouseUp.bind( this )}
					onMouseLeave={this.SVG_OnMouseUp.bind( this )}
					onTouchStart={this.SVG_OnMouseDown.bind( this )}
					onTouchMove={this.SVG_OnMouseMove.bind( this )}
					onTouchEnd={ this.SVG_OnMouseUp.bind( this )}
				>

					{ /* debug rect - remove when done */}
					<rect id="debugRect" x="0" y="0" height={this.state.viewBoxValues[0]} width={this.state.viewBoxValues[0]} />
					{ /* content */}

					<g id="SvgChildDraggable1" draggable="true" transform={this.state.transform}>
						{this.SVG}
					</g>
				</svg>

				<div className="bd-page-trademark">"Adobe Illustrator", "Fender" & "Telecaster" are registered trademarks of thier respective companies.</div>
			</div>
        );
    }
};