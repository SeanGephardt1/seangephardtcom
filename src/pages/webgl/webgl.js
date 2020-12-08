import React from 'react';
import './webgl.css';

export default class WebGLDemo extends React.Component
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
			CanvasSize: 400
		};

		this.Canvas = React.createRef();
		return;
	};
	componentDidMount() 
	{	//	console.debug( "WebGLDemo.componentDidMount()", this.canvas.current );
		this.ResetCanvas();
		return;
	}
	ResetCanvas()
	{
		//	console.debug( "ResetCanvas", this.Canvas.current );
		//	console.debug( "ResetCanvas()");
		let c = this.Canvas.current.getContext( '2d' );
		c.clearRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );
		c.globalAlpha = 1;
		c.fillStyle = "rgba( 255, 255, 255, 1)";
		c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );
		c.save();
		return c;
	};
	RenderDefaultBoxes()
	{
		let c = this.ResetCanvas();
		c.fillStyle = "rgba( 39, 93, 173, 1)";
		c.fillRect( 0, 0, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		c.fillStyle = "rgba(197, 34, 51, 1)";
		c.fillRect( this.state.CanvasSize / 2, 0, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		c.fillStyle = "rgba(248, 216, 0,1)";
		c.fillRect( 0, this.state.CanvasSize / 2, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		c.fillStyle = "rgba(0,96,0,1)";
		c.fillRect( this.state.CanvasSize / 2, this.state.CanvasSize / 2, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		return;
	};
	BoxesCanvas()
	{	//	console.debug( "DefaultCanvas" );
		let c = this.ResetCanvas();
		this.RenderDefaultBoxes();

		c.fillStyle = "rgba(255,255,255,1)";
		c.globalAlpha = 0.5;

		//	TEST - c.fillRect( 10, 10, this.state.CanvasHeight - 20, this.state.CanvasWidth - 20 );
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
	RandomBoxSizes(ev)
	{	//	console.debug( "RandomBoxSizes" );
		let _random = Math.round( ( Math.random() * 50 ) );
		let _random_alpha = ( Math.random() * 0.9 );

		console.debug( "_random", _random );
		//	console.debug( "_random_alpha", _random_alpha );

		let c = this.ResetCanvas();
		this.RenderDefaultBoxes();
	
		//	TEST ARD
		//c.globalAlpha = 1;
		//c.beginPath();
		//	c.arc(x,y, radius, startingAngle, endingAngle, counterclockwise);
		//c.arc(
		//	this.state.CanvasSize / 2, 
		//	this.state.CanvasSize / 2,
		//	this.state.CanvasSize / 2 - ( i * _random),
		//	_random,
		//	Math.PI,
		//	_cc_bool
		//);
		//c.fill();

		//	TEST RECT- c.fillRect( 10, 10, this.state.CanvasHeight - 20, this.state.CanvasWidth - 20 );
		c.fillStyle = "rgba(255,255,255,1)";
		c.globalAlpha = _random_alpha;
		for ( var i = 0; i < 5; i++ )
		{
			let _cc_bool = ( i % 2 === 0 ) ? true : false;

			c.beginPath();

			c.arc(
				this.state.CanvasSize / 2, 
				this.state.CanvasSize / 2,
				this.state.CanvasSize / 2 - ( i * _random),
				( i * _random),
				Math.PI,
				_cc_bool
			);

			//c.fillRect(
			//	(i * _random) + 10,
			//	(i * _random) + 10,
			//	this.state.CanvasSize - (_random * 2) * i - 20,
			//	this.state.CanvasSize - (_random * 2 ) * i - 20);

			c.fill();
		}

		c.globalAlpha = 1;
		c.save();
		return;
	};
	RandomCirclesAnimated( ev )
	{
		let c = this.ResetCanvas();

		// Create gradients
		const radgrad = c.createRadialGradient(45, 45, 10, 52, 50, 30);
		radgrad.addColorStop(0, '#A7D30C');
		radgrad.addColorStop(0.9, '#019F62');
		radgrad.addColorStop(1, 'rgba(1, 159, 98, 0)');
  
		const radgrad2 = c.createRadialGradient(105, 105, 20, 112, 120, 50);
		radgrad2.addColorStop(0, '#FF5F98');
		radgrad2.addColorStop(0.75, '#FF0188');
		radgrad2.addColorStop(1, 'rgba(255, 1, 136, 0)');

		const radgrad3 = c.createRadialGradient(95, 15, 15, 102, 20, 40);
		radgrad3.addColorStop(0, '#00C9FF');
		radgrad3.addColorStop(0.8, '#00B5E2');
		radgrad3.addColorStop(1, 'rgba(0, 201, 255, 0)');

		const radgrad4 = c.createRadialGradient(0, 150, 50, 0, 140, 90);
		radgrad4.addColorStop(0, '#F4F201');
		radgrad4.addColorStop(0.8, '#E4C700');
		radgrad4.addColorStop(1, 'rgba(228, 199, 0, 0)');
  
		// draw shapes
		c.fillStyle = radgrad4;
		c.fillRect(0, 0, this.state.CanvasSize, this.state.CanvasSize);
		c.fillStyle = radgrad3;
		c.fillRect(0, 0, this.state.CanvasSize, this.state.CanvasSize);
		c.fillStyle = radgrad2;
		c.fillRect(0, 0, this.state.CanvasSize, this.state.CanvasSize);
		c.fillStyle = radgrad;
		c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize);
		return;
	};
    render()
	{
        return (
			<div className="sgcom-page-layout">
				<div className="canvas-demo-header">{this.Title }</div>
				<div className="canvas-demo-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at faucibus felis. Nulla faucibus elit vel mollis finibus. Maecenas metus lacus, consectetur quis turpis ac, sollicitudin dapibus ipsum. Maecenas hendrerit turpis a neque scelerisque rhoncus. Pellentesque lobortis arcu sed mauris porttitor, id accumsan est aliquet. Vivamus congue quam neque, ac fermentum orci rhoncus ac. Quisque in metus eros. Nullam luctus ex urna, sed bibendum metus fringilla sed.</div>
				<div className="canvas-menu">
					<button className="canvas-menu-btn" onClick={ this.ResetCanvas.bind(this)}>Reset</button>
					<button className="canvas-menu-btn" onClick={ this.BoxesCanvas.bind(this)}>Colored boxes</button>
					<button className="canvas-menu-btn" onClick={ this.RandomBoxSizes.bind(this)}>Opaque circle</button>
					<button className="canvas-menu-btn" onClick={ this.RandomCirclesAnimated.bind(this)}>Random circles</button>
				</div>
				<div className="canvas-panel">
					<canvas id="glcanvas" className="canvas-2d" ref={this.Canvas}
						height={this.state.CanvasSize} width={this.state.CanvasSize}></canvas>
				</div>					
			</div>
        );
    }
};