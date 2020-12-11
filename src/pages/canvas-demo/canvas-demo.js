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
			CanvasSize: 1000,
			isAnimating: false,
			AniBtnText: "Start"
		};

		this.Canvas = React.createRef();
		this.AnimationID = undefined;
		this.AniCounter = 0;
		this.AniMax = 500;
		this.CanvasContext = undefined;
		return;
	};
	componentDidMount() 
	{	//	console.debug( "WebGLDemo.componentDidMount()", this.canvas.current );
		this.OnClick_ResetCanvas();
		return;
	}
	componentWillUnmount()
	{	//console.debug( "AppLoader.componentWillUnmount()", this.AnimationID );
		window.cancelAnimationFrame( this.AnimationID );
		this.AnimationID = undefined;
		return;
	}

	OnClick_ResetCanvas()
	{
		//	console.debug( "ResetCanvas", this.Canvas.current );
		this.AniCounter = 0;
		this.CanvasContext = undefined;
		this.StopAnimation();

		let c = this.Canvas.current.getContext( "2d" );

		c.globalAlpha = 1;
		c.imageSmoothingQuality = "high";
		c.lineWidth = 1;
		c.fillStyle = "rgba(0,0,0,1)";
		c.strokeStyle = "rgba(0,0,0,1)";
		c.shadowColor = "rgba(0,0,0,1)";
		c.shadowBlur = 0;
		c.shadowOffsetX = 0;
		c.shadowOffsetY = 0;
		c.setTransform(1, 0, 0, 1, 0, 0);

		c.clearRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );

		const fillGrad = c.createLinearGradient( 0, 0, 0, this.state.CanvasSize );
		fillGrad.addColorStop("0", "rgba(248, 216, 0,0.6)");
		fillGrad.addColorStop( "1", "rgba(0,0,0,1)" );

		c.fillStyle = fillGrad;
		c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );

		c.fillStyle = "rgba(255,255,255,1)";

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
		c.save();
		return;
	};

	OnClick_CreateScaledRects()
	{	//	console.debug( "DefaultCanvas" );
		let c = this.OnClick_ResetCanvas();
		this.RenderDefaultBoxes();

		for ( var i = 0; i < 10; i++ )
		{
			let _new_i = i + 1;

			c.beginPath();
			c.globalAlpha = 0.2;
			c.fillStyle = "rgba(255,255,255,1)";
			c.fillRect(
				_new_i * 40,
				_new_i * 40,
				this.state.CanvasSize - 80 * _new_i,
				this.state.CanvasSize - 80 * _new_i );
			c.closePath();
		}

		c.save();
		return;
    }
	OnClick_CreateRandomGradientCircles( ev )
	{
		//	Note: Gradient coordinates are global
		//	i.e., relative to the current coordinate space.
		//	When applied to a shape, the coordinates are NOT relative to the shape's coordinates.
		let c = this.OnClick_ResetCanvas();
		//	this.RenderDefaultBoxes();

		c.fillStyle = "rgba(0,0,0,1)";
		c.shadowBlur = 20;
		c.shadowOffsetY = 10;

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
			c.closePath();
		}

		c.save();
		return;
	};

	OnClick_RenderAnimationCanvas( ev )
	{	//	console.debug( "RandomBoxSizes" );
		//	https://blog-en.openalfa.com/how-to-draw-with-the-mouse-in-a-html5-canvas
		//	https://bearnithi.com/2019/12/12/understanding-canvas-draw-a-line-in-canvas-using-mouse-and-touch-events-in-javascript/
		//	console.debug( "this.state.isAnimating", this.state.isAnimating );
		if ( this.state.isAnimating === false )
		{
			this.StartAnimation();
		}
		else if ( this.state.isAnimating === true )
		{
			this.StopAnimation();
		}
		return;
	};
	StartAnimation()
	{	//	console.debug( "1. StartAnimation", this.AnimationID, this.AniCounter, this.CanvasContext );
		if ( this.CanvasContext === undefined )
		{
			this.CanvasContext = this.OnClick_ResetCanvas();
			this.CanvasContext.clearRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );
		}

		this.AnimationID = window.requestAnimationFrame( () => this.RenderFractalAnimation( this.CanvasContext ) );
		this.setState( {
				isAnimating: true,
				AniBtnText: "Stop"
		} );
		//	console.debug( "2. StartAnimation", this.AnimationID, this.AniCounter );
		return;
	};
	StopAnimation()
	{	//	console.debug( "1. StopAnimation", this.AnimationID, this.CanvasContext );
		this.AnimationID = window.cancelAnimationFrame( this.AnimationID );
		this.setState( {
			isAnimating: false,
			AniBtnText: "Start"
		} );
		//	console.debug( "2. StopAnimation", this.AnimationID );
		return;
	}
	RenderFractalAnimation( c )
	{	//	console.debug( "1. RenderFractalAnimation", this.AnimationID, this.AniCounter );
		if ( this.AniCounter < this.AniMax )
		{
			this.DrawFractal( c );
			this.AniCounter++;
			this.AnimationID = window.requestAnimationFrame(() => this.RenderFractalAnimation( c ));
		}
		else if ( this.AniCounter === this.AniMax )
		{
			this.AniCounter = 0;
			this.CanvasContext = undefined;
			this.StopAnimation();
		}
		return;
	};
	DrawFractal( c )
	{	//	console.debug( "DrawFractal()", this.AniCounter);
		//	c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );
		const _x = Math.round( Math.random() * ( this.state.CanvasSize ) );
		const _y = Math.round( Math.random() * ( this.state.CanvasSize ) );
		const _size = Math.round( Math.random() * ( this.state.CanvasSize / 5 ) );
		const _r = Math.round( Math.random() * 256 );
		const _g = Math.round( Math.random() * 256 );
		const _b= Math.round( Math.random() * 256 );
		const _rad = 0;

		let _switch = Math.round(( Math.random() * 6 ));
		//	console.debug( "_switch", _switch, _x, _y, _r_size );
		//	_switch = 5;

		switch ( _switch )
		{
			case 0: {
				this.Render_PerfectCircle( c, _x, _y, _size, _rad, _r, _g, _b );
				break;
			}
			case 1: {
				this.Render_LeftSkewCircle( c, _x, _y, _size, _rad, _r, _g, _b );
				break;
			}
			case 2: {
				this.Render_RightSkewCircle( c, _x, _y, _size, _rad, _r, _g, _b );
				break;
			}
			case 3: {
				this.Render_PerfectRect( c, _x, _y, _size,  _r, _g, _b );
				break;
			}
			case 4: {
				this.Render_LeftSkewRect( c, _x, _y, _size,  _r, _g, _b );
				break;
			}
			case 5: {
				this.Render_RightSkewRect( c, _x, _y, _size, _r, _g, _b );
				break;
			}
			default: { break; }
		}
		return;
	};

	Render_PerfectCircle( c, x, y, size, rad, r, g, b )
	{
		c.globalAlpha = 1;
		c.lineWidth = 0.5;
		c.strokeStyle = "rgba(0,0,0,1)";
		c.fillStyle = "rgba(0,0,0,1)";
		c.shadowBlur = 20;
		c.shadowOffsetY = 10;
		c.setTransform(1, 0, 0, 1, 0, 0);
		c.beginPath();

		const _grad_x1 = x + ( size / 3 );
		const _grad_y1 = y - ( size / 3 );
		const _rg = c.createRadialGradient(
			_grad_x1, _grad_y1, rad,
			x, y, size
		);
		_rg.addColorStop( 0, "rgba(" + r + "," + g + "," + b + ", 1)" );
		_rg.addColorStop( 1, "rgba(" + ( r / 2 ) + "," + ( g / 2 ) + "," + ( b / 2 ) + ", 1)" );

		c.fillStyle = _rg;
		c.arc( x, y, size, 0, 2 * Math.PI );
		c.stroke();
		c.fill();
		c.closePath();
		c.setTransform(1, 0, 0, 1, 0, 0);
		c.save();
		return;
	};
	Render_LeftSkewCircle( c, x, y, size, rad, r, g, b )
	{
		c.globalAlpha = 1;
		c.lineWidth = 0.5;
		c.strokeStyle = "rgba(0,0,0,1)";
		c.fillStyle = "rgba(0,0,0,1)";
		c.shadowBlur = 20;
		c.shadowOffsetY = 10;
		c.setTransform(1, 0, 0, 1, 0, 0);
		c.beginPath();

		const _grad_x1 = x + ( size / 3 );
		const _grad_y1 = y - ( size / 3 );
		const _rg = c.createRadialGradient(
			_grad_x1, _grad_y1, rad,
			x, y, size
		);
		_rg.addColorStop( 0, "rgba(" + r + "," + g + "," + b + ", 1)" );
		_rg.addColorStop( 1, "rgba(" + ( r / 2 ) + "," + ( g / 2 ) + "," + ( b / 2 ) + ", 1)" );

		c.fillStyle = _rg;
		c.setTransform( 1, 0.3, 0, 1, 0, 0 );
		c.arc( x, y, size, 0, 2 * Math.PI );
		c.stroke();
		c.fill();
		c.closePath();
		c.setTransform(1, 0, 0, 1, 0, 0);
		c.save();
		return;
	};
	Render_RightSkewCircle( c, x, y, size, rad, r, g, b )
	{
		c.globalAlpha = 1;
		c.lineWidth = 0.5;
		c.strokeStyle = "rgba(0,0,0,1)";
		c.fillStyle = "rgba(0,0,0,1)";
		c.shadowBlur = 20;
		c.shadowOffsetY = 10;
		c.setTransform(1, 0, 0, 1, 0, 0);
		c.beginPath();

		const _grad_x1 = x + ( size / 3 );
		const _grad_y1 = y - ( size / 3 );
		const _rg = c.createRadialGradient(
			_grad_x1, _grad_y1, rad,
			x, y, size
		);
		_rg.addColorStop( 0, "rgba(" + r + "," + g + "," + b + ", 1)" );
		_rg.addColorStop( 1, "rgba(" + ( r / 2 ) + "," + ( g / 2 ) + "," + ( b / 2 ) + ", 1)" );

		c.fillStyle = _rg;
		c.setTransform( 1, -0.3, 0, 1, 0, 0 );
		c.arc( x, y, size, 0, 2 * Math.PI );
		c.stroke();
		c.fill();
		c.closePath();
		c.setTransform(1, 0, 0, 1, 0, 0);
		c.save();
		return;
	};

	Render_PerfectRect( c, x, y, size, r, g, b )
	{
		c.globalAlpha = 1;
		c.lineWidth = 1;
		c.strokeStyle = "rgba(0,0,0,1)";
		c.fillStyle = "rgba(0,0,0,1)";
		c.shadowBlur = 20;
		c.shadowOffsetY = 10;
		c.beginPath();

		const _lg = c.createLinearGradient( x, 0, x + (size * 2), 0 );
		_lg.addColorStop( 0, "rgba(" + r + "," + g + "," + b + ", 1)" );
		_lg.addColorStop( 1, "rgba(" + (r/2) + "," + (g/2) + "," + (b/2) + ", 1)" );

		c.fillStyle = _lg;
		c.setTransform(1, 0, 0, 1, 0, 0);
		c.strokeRect( x, y, ( size * 2 ), size );
		c.fillRect( x, y, ( size * 2 ),  size );
		c.closePath();
		c.save();
		return;
	};
	Render_LeftSkewRect( c, x, y, size, r, g, b )
	{
		c.globalAlpha = 1;
		c.lineWidth = 1;
		c.strokeStyle = "rgba(0,0,0,1)";
		c.fillStyle = "rgba(0,0,0,1)";
		c.shadowBlur = 20;
		c.shadowOffsetY = 10;
		c.beginPath();

		const _lg = c.createLinearGradient( x, 0, x + (size * 2), 0 );
		_lg.addColorStop( 0, "rgba(" + r + "," + g + "," + b + ", 1)" );
		_lg.addColorStop( 1, "rgba(" + (r/2) + "," + (g/2) + "," + (b/2) + ", 1)" );

		c.fillStyle = _lg;
		c.setTransform( 1, 0, -1, 1, 0, ( y / 2 ) );
		c.strokeRect( x, y, ( size * 2 ), size );
		c.fillRect( x, y, ( size * 2 ),  size );
		c.closePath();
		c.save();
		return;
	};
	Render_RightSkewRect( c, x, y, size, r, g, b )
	{
		c.globalAlpha = 1;
		c.lineWidth = 1;
		c.strokeStyle = "rgba(0,0,0,1)";
		c.fillStyle = "rgba(0,0,0,1)";
		c.shadowBlur = 20;
		c.shadowOffsetY = 10;
		c.beginPath();

		const _lg = c.createLinearGradient( x, 0, x + (size * 2), 0 );
		_lg.addColorStop( 0, "rgba(" + r + "," + g + "," + b + ", 1)" );
		_lg.addColorStop( 1, "rgba(" + (r/2) + "," + (g/2) + "," + (b/2) + ", 1)" );

		c.fillStyle = _lg;
		c.setTransform( 1, -1, 0, 1, 0, ( y / 2 ) );
		c.strokeRect( x, y, ( size * 2 ), size );
		c.fillRect( x, y, ( size * 2 ),  size );
		c.closePath();
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
					<button className="canvas-menu-btn" onClick={ this.OnClick_CreateScaledRects.bind(this)}>Render scaled opaque boxes</button>
					<button className="canvas-menu-btn" onClick={ this.OnClick_CreateRandomGradientCircles.bind(this)}>Render gradient circles</button>
					<button className="canvas-menu-btn" onClick={ this.OnClick_RenderAnimationCanvas.bind( this )}>{ this.state.AniBtnText}</button>
					<button className="canvas-menu-btn" onClick={ this.OnClick_ResetCanvas.bind(this)}>Reset</button>
				</div>
				<div className="canvas-panel">
					<canvas id="html-5-canvas" className="canvas-2d" ref={this.Canvas}
						height={this.state.CanvasSize} width={this.state.CanvasSize}></canvas>
				</div>					
			</div>
        );
    }
};