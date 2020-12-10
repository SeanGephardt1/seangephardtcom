import React from 'react';
import './canvas-demo.css';

export default class Html5CanvasDemo extends React.Component
{
	static defaultProps = {
		Title: "HTML5 Canvas Demo",
		LinkTitle: "HTML5 Canvas Demo",
		Href: "/demos/canvas/",
		// Icon: SVG.AppNavButtons.About
	};
	constructor( props )
	{
		// GENERIC
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

		document.title = this.Title;

		this.state = {
			changed: false,
			CanvasSize: 800
		};

		this.Canvas = React.createRef();
		return;
	};
	componentDidMount() 
	{	//	console.debug( "WebGLDemo.componentDidMount()", this.canvas.current );
		this.OnClick_ResetCanvas();
		return;
	}
	OnClick_ResetCanvas()
	{
		//	console.debug( "ResetCanvas", this.Canvas.current );
		//	console.debug( "ResetCanvas()");
		let c = this.Canvas.current.getContext( '2d' );
		c.clearRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );
		c.globalAlpha = 1;
		c.strokeStyle = "rgba(255,0,0,1)";
		c.lineWidth = 1;

		const fillGrad = c.createLinearGradient( 0, 0, 0, this.state.CanvasSize );
		fillGrad.addColorStop("0", "rgba(255,255,255,1)");
		fillGrad.addColorStop( "1", "rgba(0,0,0,1)" );

		c.fillStyle = fillGrad;
		c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );

		c.save();
		return c;
	};
	RenderDefaultBoxes()
	{
		let c = this.OnClick_ResetCanvas();
		c.fillStyle = "rgba( 39, 93, 173, 1)";
		c.fillRect( 0, 0, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		c.fillStyle = "rgba(197, 34, 51, 1)";
		c.fillRect( this.state.CanvasSize / 2, 0, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		c.fillStyle = "rgba(248, 216, 0,1)";
		c.fillRect( 0, this.state.CanvasSize / 2, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		c.fillStyle = "rgba(0,96,0,1)";
		c.fillRect( this.state.CanvasSize / 2, this.state.CanvasSize / 2, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		c.fillStyle = "rgba( 255, 255, 255, 1)";
		return;
	};
	OnClick_CreateScaledRects()
	{	//	console.debug( "DefaultCanvas" );
		let c = this.OnClick_ResetCanvas();
		this.RenderDefaultBoxes();

		c.globalAlpha = 1;
		c.fillStyle = "rgba(255,255,255,1)";
		c.globalAlpha = 0.3;

		for ( var i = 0; i < 5; i++ )
		{
			c.beginPath();

			let _new_i = i + 1;
			c.fillRect(
				_new_i * 20,
				_new_i * 20,
				this.state.CanvasSize - 40 * _new_i,
				this.state.CanvasSize - 40 * _new_i );

			c.fill();
		}

		c.save();
		return;
    }
	OnClick_CreateRandomArcs(ev)
	{	//	console.debug( "RandomBoxSizes" );
		//	TEST ARC
		//	c.arc(x,y, radius, startingAngle, endingAngle, counterclockwise);
		// cap for positive numbers using arc starting angle param is 180

		let _random = Math.round( Math.random() * 360 );
		if ( _random < 1 )
		{
			_random = 33;
		}	//	console.debug( "_random", _random );

		let c = this.OnClick_ResetCanvas();
		this.RenderDefaultBoxes();

		c.globalAlpha = 0.4;	
		c.fillStyle = "rgba(255,255,255,1)";
		c.strokeStyle = "rgba(255,255,255,1)";
		c.lineWidth = 10;

		const fillGrad = c.createLinearGradient( 0, 0, 0, this.state.CanvasSize );
		fillGrad.addColorStop("0.3", "rgba(0,0,0,0)");
		fillGrad.addColorStop("0.4", "rgba(0,0,0,0.9)");
		fillGrad.addColorStop("0.5", "rgba(255,255,255,9)");
		fillGrad.addColorStop("0.6", "rgba(0,0,0,0.9)");
		fillGrad.addColorStop("0.7", "rgba(0,0,0,0)");

		const strokeGrad = c.createLinearGradient( 0, 0, this.state.CanvasSize, 0 );
		strokeGrad.addColorStop("0.3", "rgba(0,0,0,0)");
		strokeGrad.addColorStop("0.4", "rgba(0,0,0,0.9)");
		strokeGrad.addColorStop("0.5", "rgba(255,255,255,9)");
		strokeGrad.addColorStop("0.6", "rgba(0,0,0,0.9)");
		strokeGrad.addColorStop("0.7", "rgba(0,0,0,0)");

		//https://www.w3schools.com/tags/canvas_createradialgradient.asp
		c.fillStyle = fillGrad;
		c.strokeStyle = strokeGrad;

		//c.beginPath();
		//c.arc(
		//	this.state.CanvasSize / 2, 
		//	this.state.CanvasSize / 2,
		//	this.state.CanvasSize / 2 - c.lineWidth,
		//	0,
		//	2 * Math.PI 
		//);
		////	c.fill();
		//c.stroke();

		for ( var i = 0; i < 5; i++ )
		{
			let _size = parseFloat(this.state.CanvasSize / 2 - ( i * 30));

			c.beginPath();
			c.arc(
				this.state.CanvasSize / 2, 
				this.state.CanvasSize / 2,
				_size,
				0,
				2 * Math.PI 
			);
			c.fill();
			c.stroke();
		}

		c.globalAlpha = 1;
		c.save();
		return;
	};
	OnClick_CreateRandomGradientCircles( ev )
	{
		//	Note: Gradient coordinates are global
		//	i.e., relative to the current coordinate space.
		//	When applied to a shape, the coordinates are NOT relative to the shape's coordinates.
		console.clear();

		const debugFillStyle = "rgba(0,0,0,1)";
		const debugStrokeStyle = "rgba(0,0,0,1)";
			
		let c = this.OnClick_ResetCanvas();
		c.globalAlpha = 1;
		c.lineWidth = 1;

		c.shadowColor = "rgba(0,0,0,1)";
		c.shadowBlur = 20;
		c.shadowOffsetX = 0;
		c.shadowOffsetY = 10;

		c.fillStyle = debugFillStyle;
		c.strokeStyle = debugStrokeStyle;

		c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );

		for ( var i = 0; i < 100; i++ )
		{
			let _x = Math.round( Math.random() * ( this.state.CanvasSize ) );
			let _y = Math.round( Math.random() * ( this.state.CanvasSize ) );
			let _r_size = Math.round( Math.random() * ( this.state.CanvasSize / 5 ) );

			let _grad_x1 = _x + ( _r_size / 3 );
			let _grad_y1 = _y - ( _r_size / 3 );

			let _radius1 = 0;

			const _rg = c.createRadialGradient(
				_grad_x1, _grad_y1, _radius1,
				_x, _y, _r_size
			);

			let _r = Math.round( Math.random() * 256 );
			let _g = Math.round( Math.random() * 256 );
			let _b= Math.round( Math.random() * 256 );

			_rg.addColorStop( 0, "rgba(" + _r + "," + _g + "," + _b + ", 1)" );
			_rg.addColorStop( 1, "rgba(" + (_r/5) + "," + (_g/5) + "," + (_b/5) + ", 1)" );

			c.fillStyle = _rg;

			c.beginPath();
			c.arc( _x, _y, _r_size, 0, 2 * Math.PI );

			c.fill();
			c.stroke();
		}

		c.globalAlpha = 1;
		c.save();
		return;
	};
    render()
	{
        return (
			<div className="sgcom-page-layout">
				<div className="canvas-demo-header">{this.Title }</div>
				<div className="canvas-demo-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at faucibus felis. Nulla faucibus elit vel mollis finibus. Maecenas metus lacus, consectetur quis turpis ac, sollicitudin dapibus ipsum. Maecenas hendrerit turpis a neque scelerisque rhoncus. Pellentesque lobortis arcu sed mauris porttitor, id accumsan est aliquet. Vivamus congue quam neque, ac fermentum orci rhoncus ac. Quisque in metus eros. Nullam luctus ex urna, sed bibendum metus fringilla sed.</div>
				<div className="canvas-menu">
					<button className="canvas-menu-btn" onClick={ this.OnClick_CreateScaledRects.bind(this)}>Create scaled opaque boxes</button>
					<button className="canvas-menu-btn" onClick={ this.OnClick_CreateRandomArcs.bind(this)}>Create random arcs</button>
					<button className="canvas-menu-btn" onClick={ this.OnClick_CreateRandomGradientCircles.bind(this)}>Gradient circles</button>
					<button className="canvas-menu-btn" onClick={ this.OnClick_ResetCanvas.bind(this)}>Reset</button>
				</div>
				<div className="canvas-panel">
					<canvas id="glcanvas" className="canvas-2d" ref={this.Canvas}
						height={this.state.CanvasSize} width={this.state.CanvasSize}></canvas>
				</div>					
			</div>
        );
    }
};