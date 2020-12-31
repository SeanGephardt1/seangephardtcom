//	Note: Gradient coordinates are global
//	i.e., relative to the current coordinate space.
//	When applied to a shape, the coordinates are NOT relative to the shape's coordinates.

import React from 'react';
import SubNav from '../../controls/nav/sub-nav.js';
import './canvas-demo.css';

export default class Html5CanvasDemo extends React.Component
{
	static defaultProps = {
		Title: "HTML5 Canvas demos",
		LinkTitle: "HTML5 Canvas demos",
		Href: "/demos/canvas-demos/",
		// Icon: SVG.AppNavButtons.About
	};
	constructor( props )
	{
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

		document.title = this.Title;

		this.AnimationsList = [
			"Gradients (default)",
			"Branding Boxes",
			"EVH 5150 graphics",
			"Random Circles",
			"Random shapes",
			"Eye Strain (warning)",
			"WebGL example"
		];

		this.Canvas = React.createRef();
		this.CanvasContext = undefined;

		this.AnimationID = undefined;
		this.AniCounter = 0;
		this.AniMax = 100;
		this.selectedAnimation = this.RenderAnimation_DefaultGradient.bind(this);

		this.state = {
			changed: false,
			CanvasSize: 1000,
			isAnimating: false,
			AniBtnText: "Start",
			animationSelected: this.AnimationsList[0]
		};

		this.DefaultGrad_Coords = {};
		return;
	};
	componentDidMount() 
	{	//	console.debug( "WebGLDemo.componentDidMount()", this.canvas.current );
		this.CanvasContext = this.Canvas.current.getContext( "2d" );
		this.Render_DefaultGradient( this.CanvasContext );
		//	this.Render_EyeStrain( this.CanvasContext );
		return;
	}
	componentWillUnmount()
	{	//console.debug( "AppLoader.componentWillUnmount()", this.AnimationID );
		window.cancelAnimationFrame( this.AnimationID );
		this.AnimationID = undefined;
		return;
	}

	// UTILITY METHODS
	DefaultCanvasReset( c )
	{
		//	console.debug( "DefaultCanvasReset", c );
		c.globalAlpha = 1;
		c.imageSmoothingQuality = "high";
		c.lineWidth = 1;
		c.fillStyle = "rgba(0,0,0,1)";
		c.strokeStyle = "rgba(0,0,0,1)";
		c.shadowColor = "rgba(0,0,0,1)";
		c.shadowBlur = 0;
		c.shadowOffsetX = 0;
		c.shadowOffsetY = 0;
		c.setTransform( 1, 0, 0, 1, 0, 0 );
		c.clearRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );
		c.save();
		return;
	};
	DefaultGradientColorStops( fillGrad )
	
	{
		fillGrad.addColorStop( "0", "rgba(39, 93, 173, 1)" );
		fillGrad.addColorStop( "0.3", "rgba(197, 34, 51, 1)" );
		fillGrad.addColorStop( "0.7", "rgba(248, 216, 0, 1)" );
		fillGrad.addColorStop( "1", "rgba(0,96,0, 1)" );
		return;
	}

	// EVENT SETUP METHODS
	OnChange_SelectAnimationFromList( ev )
	{	//	console.debug( "OnChange_SelectAnimationFromList", ev.target.value );
		//this.AnimationsList = [
		//	0	"Gradients (default)",
		//	1	"Branding Boxes",
		//	2	"EVH 5150 graphics",
		//	3	"Random Circles",
		//	4	"Random shapes",
		//	5	"Eye Strain",
		//	6	"WebGL example"
		//];
		switch ( parseInt( ev.target.value ) )
		{
			case 0: {
				this.Render_DefaultGradient( this.CanvasContext );
				this.selectedAnimation = this.RenderAnimation_DefaultGradient;
				break;
			}
			case 1: {
				this.Render_Boxes( this.CanvasContext );
				this.selectedAnimation = this.RenderAnimation_Boxes;
				break;
			}
			case 2: {
				this.Render_EVHTribute( this.CanvasContext );
				this.selectedAnimation = this.RenderAnimation_EVHTribute;
				break;
			}
			case 3: {
				this.Render_RandomCircles( this.CanvasContext );
				this.selectedAnimation = this.RenderAnimation_RandomCircles;
				break;
			}
			case 4: {
				this.Render_RandomShapes( this.CanvasContext );
				this.selectedAnimation = this.RenderAnimation_RandomShapes;
				break;
			}
			case 5: {
				this.Render_EyeStrain( this.CanvasContext );
				this.selectedAnimation = this.RenderAnimation_EyeStrain;
				break;
			}
			case 6: {
				this.Render_WebGL_Sample_1( this.CanvasContext );
				this.selectedAnimation = this.RenderAnimation_WebGL_Sample_1;
				break;
			}
			default: {
				this.Render_DefaultGradient( this.CanvasContext );
				this.selectedAnimation = this.RenderAnimation_DefaultGradient;
				break;
			}
		}
		return;
	};

	OnClick_RenderAnimationCanvas( ev )
	{
		//	https://blog-en.openalfa.com/how-to-draw-with-the-mouse-in-a-html5-canvas
		//	https://bearnithi.com/2019/12/12/understanding-canvas-draw-a-line-in-canvas-using-mouse-and-touch-events-in-javascript/
		//	console.debug( "this.state.isAnimating", this.state.isAnimating );
		//	console.debug( "OnClick_RenderAnimationCanvas" );
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
	{	//	console.debug( "1. StartAnimation", this.AnimationID, this.AniCounter, this.CanvasContext, this.state.animationSelected );
		console.debug( "StartAnimation", this.state.animationSelected, this.CanvasContext );

		if ( this.CanvasContext === undefined )
		{
			this.CanvasContext = this.Canvas.current.getContext( "2d" );
			this.CanvasContext.clearRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );
		}

		this.AnimationID = window.requestAnimationFrame( () => this.selectedAnimation( this.CanvasContext) );

		this.setState( {
			isAnimating: true,
			AniBtnText: "Stop"
		} );

		//	console.debug( "2. StartAnimation", this.AnimationID, this.AniCounter );
		return;
	};
	StopAnimation()
	{	//	
		console.debug( "StopAnimation", this.AnimationID, this.CanvasContext );
		this.AnimationID = window.cancelAnimationFrame( this.AnimationID );
		this.setState( {
			isAnimating: false,
			AniBtnText: "Start"
		} );
		//	console.debug( "2. StopAnimation", this.AnimationID );
		return;
	}

	// RENDERS &  ANIMATIONS
	Render_DefaultGradient( c )
	{	//	console.debug( "Render_DefaultGradient", c );
		this.DefaultCanvasReset( c );

		this.DefaultGrad_Coords = {
			x0: this.state.CanvasSize / 2,
			y0: this.state.CanvasSize / 2,
			r0: this.state.CanvasSize / 8,
			x1: this.state.CanvasSize / 2,
			y1: this.state.CanvasSize / 2,
			r1: this.state.CanvasSize / 1.5
		}

		let radialGrad = c.createRadialGradient(
			this.DefaultGrad_Coords.x0,
			this.DefaultGrad_Coords.y0,
			this.DefaultGrad_Coords.r0,
			this.DefaultGrad_Coords.x1,
			this.DefaultGrad_Coords.y1,
			this.DefaultGrad_Coords.r1
		);
		this.DefaultGradientColorStops( radialGrad );

		c.fillStyle = radialGrad;
		c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );
		c.fillStyle = "rgba(255,255,255,1)";
		c.save();
		return;
	};
	RenderAnimation_DefaultGradient( c )
	{
		console.debug( "Render_GradientAnimation", this.AniCounter);

		if ( this.AniCounter < this.AniMax )
		{
			this.AniCounter++;

			console.debug( "this.DefaultGrad_Coords", this.DefaultGrad_Coords );

			let radialGrad = c.createRadialGradient(
				this.state.CanvasSize / 2,
				this.state.CanvasSize / 2,
				this.state.CanvasSize / 8 + this.AniCounter,
				this.state.CanvasSize / 2,
				this.state.CanvasSize / 2,
				this.state.CanvasSize /1.5 + this.AniCounter
			);
			this.DefaultGradientColorStops( radialGrad );

			c.fillStyle = radialGrad;
			c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );
			c.fillStyle = "rgba(255,255,255,1)";
			c.save();

			this.AnimationID = window.requestAnimationFrame( () => this.RenderAnimation_DefaultGradient( c ) );
		}
		else if ( this.AniCounter === this.AniMax )
		{
			this.AniCounter = 0;
			this.StopAnimation();
		}
		return;
	};

	Render_Boxes(c)
	{
		console.debug( "Render_Boxes",c );
		this.DefaultCanvasReset( c );

		c.fillStyle = "rgba( 39, 93, 173, 1)";
		c.fillRect( 0, 0, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		c.fillStyle = "rgba(197, 34, 51, 1)";
		c.fillRect( this.state.CanvasSize / 2, 0, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		c.fillStyle = "rgba(248, 216, 0,1)";
		c.fillRect( 0, this.state.CanvasSize / 2, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );
		c.fillStyle = "rgba(0,96,0,1)";
		c.fillRect( this.state.CanvasSize / 2, this.state.CanvasSize / 2, this.state.CanvasSize / 2, this.state.CanvasSize / 2 );

		for ( var i = 0; i < 10; i++ )
		{
			let _new_i = i + 1;

			c.beginPath();
			c.globalAlpha = 0.25;
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
	};
	RenderAnimation_Boxes(c)
	{
		console.debug( "Render_GradientAnimation", c, this.CanvasContext );
	};

	Render_EVHTribute( c )
	{
		console.debug( "Render_EVHTribute",c );
		this.DefaultCanvasReset( c );

		const _fill_red = "rgba(255,0,0,1)";
		const _fill_white = "rgba(255,255,255,1)";
		const _fill_black = "rgba(0,0,0,1)";

		c.fillStyle = _fill_red;
		c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );

		// Math.random() < 0.5 ? -1 : 1;
		for ( let i = 0; i < 100; i++ )
		{
			let _r = Math.round( Math.random() * 3 );
			switch ( _r )
			{
				case 0: {
					c.fillStyle = _fill_red;
					break;
				}
				case 1: {
					c.fillStyle = _fill_white;
					break;
				}
				case 2: {
					c.fillStyle = _fill_black;
					break;
				}
				default: {
					c.fillStyle = _fill_red;
					break;
				}
			}

			let x = Math.round( Math.random() * ( this.state.CanvasSize * 2 ) );
			let y = Math.round( Math.random() * ( this.state.CanvasSize * 2 ) );
			let w = ( this.state.CanvasSize * 2 );
			let h = Math.round( Math.random() * 100 );
			let _rot = Math.round( ( Math.random() * 720 ) );

			c.beginPath();
			//	c.globalAlpha = Math.random();
			c.rotate( _rot );
			c.fillRect( -x, -y, w, h );
			c.closePath();
		}

		c.save();
		return;
	}
	RenderAnimation_EVHTribute(c)
	{	//	
		console.debug( "Render_EVHTribute_Animation", c );
		return;
	};

	Render_RandomCircles( c )
	{
		console.debug( "Render_RandomCircles",c);
		this.DefaultCanvasReset( c );

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
			let _b = Math.round( Math.random() * 256 );

			_rg.addColorStop( 0, "rgba(" + _r + "," + _g + "," + _b + ", 1)" );
			_rg.addColorStop( 1, "rgba(" + ( _r / 5 ) + "," + ( _g / 5 ) + "," + ( _b / 5 ) + ", 1)" );

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
	RenderAnimation_RandomCircles( c )
	{	//	
		console.debug( "RenderAnimation_RandomCircles", c );
		return;
	};

	Render_RandomShapes( c )
	{
		console.debug( "Render_RandomShapes" );
		this.DefaultCanvasReset( c );

		c.fillStyle = "rgba(0,0,0,1)";
		c.shadowBlur = 20;
		c.shadowOffsetY = 10;
		c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );

		for ( var i = 0; i < 200; i++ )
		{
			const _x = Math.round( Math.random() * ( this.state.CanvasSize ) );
			const _y = Math.round( Math.random() * ( this.state.CanvasSize ) );
			const _size = Math.round( Math.random() * ( this.state.CanvasSize / 5 ) );
			const _r = Math.round( Math.random() * 256 );
			const _g = Math.round( Math.random() * 256 );
			const _b = Math.round( Math.random() * 256 );
			const _rad = 0;

			let _switch = Math.round( ( Math.random() * 6 ) );
			//	cd..console.debug( "_switch", _switch, _x, _y, _r_size );
			//	_switch = 6;

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
					this.Render_PerfectRect( c, _x, _y, _size, _r, _g, _b );
					break;
				}
				case 4: {
					this.Render_LeftSkewRect( c, _x, _y, _size, _r, _g, _b );
					break;
				}
				case 5: {
					this.Render_RightSkewRect( c, _x, _y, _size, _r, _g, _b );
					break;
				}
				default: { break; }
			}
		}

		c.save();
		return;
	}
	RenderAnimation_RandomShapes( c )
	{	//	
		console.debug( "RenderAnimation_RandomShapes", c );
		return;
	};

	Render_EyeStrain( c )
	{
		console.debug( "Render_EyeStrain" );
		this.DefaultCanvasReset( c );

		c.beginPath();

		c.fillStyle = "rgba(255,0,0,1)";
		c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );

		c.fillStyle = "rgba(0,0,255,1)";
		c.arc( this.state.CanvasSize/2, this.state.CanvasSize/2, this.state.CanvasSize / 4, 0, 2 * Math.PI );
		c.fill();

		c.closePath();
		c.save();
		return;
	}
	RenderAnimation_EyeStrain( c )
	{	//	
		console.debug( "RenderAnimation_EyeStrain", c );
		return;
	};

	Render_WebGL_Sample_1( c )
	{
		console.debug( "Render_WebGL_Sample_1" );
		this.DefaultCanvasReset( c );

		let linGrad = c.createLinearGradient( 0, 0, 0, this.state.CanvasSize );
		this.DefaultGradientColorStops( linGrad );

		c.fillStyle = linGrad;
		c.fillRect( 0, 0, this.state.CanvasSize, this.state.CanvasSize );

		c.fillStyle = "rgba(255,255,255,1)";
		c.save();
		return;
	}
	RenderAnimation_WebGL_Sample_1( c )
	{	//	
		console.debug( "RenderAnimation_WebGL_Sample_1", c );
		return;
	};


	//	ANIMATION - RANDOM SHAPES
	//	TO BE REUSED
	RenderFractalAnimation( c )
	{	//	console.debug( "1. RenderFractalAnimation", this.AnimationID, this.AniCounter );
		if ( this.AniCounter < this.AniMax )
		{
			this.DrawFractal( c );
			this.AniCounter++;
			this.AnimationID = window.requestAnimationFrame( () => this.RenderFractalAnimation( c ) );
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
		const _b = Math.round( Math.random() * 256 );
		const _rad = 0;

		let _switch = Math.round( ( Math.random() * 6 ) );
		//	cd..console.debug( "_switch", _switch, _x, _y, _r_size );
		//	_switch = 6;

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
				this.Render_PerfectRect( c, _x, _y, _size, _r, _g, _b );
				break;
			}
			case 4: {
				this.Render_LeftSkewRect( c, _x, _y, _size, _r, _g, _b );
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
		//	<div className="demo-nav-item" onClick={this.OnClick_CreateScaledRects.bind( this )}>Render scaled opaque boxes</div>
		//	<div className="demo-nav-item" onClick={this.OnClick_EVHTribute.bind( this )}>EVH Tribute</div>
		//	<div className="demo-nav-item" onClick={this.OnClick_CreateRandomGradientCircles.bind( this )}>Render gradient circles</div>
		//	<div className="demo-nav-item" onClick={this.OnClick_ResetCanvas.bind( this )}>Reset</div>

        return (
			<div className="page-layout">
				<SubNav />

				<div className="canvas-demo-header">{this.Title}</div>

				<div className="canvas-demo-desc">The <a href="https://en.wikipedia.org/wiki/Canvas_element" target="_new" title="HTML canvas element">Canvas</a> provides a great way to creating dynamically generated graphics using browser based scripting languages such as JavaScript.</div>

				<div className="input-nav">
					<label htmlFor="svg_list" className="select-svg-list">
						<span>Select a graphic animation:</span>
						<select
							defaultValue={this.state.animationSelected}
							onChange={this.OnChange_SelectAnimationFromList.bind( this )}>
							{
								this.AnimationsList.map( ( item, index ) => (
									<option key={index} value={ index }>{ item }</option>
								))
							}
						</select>
					</label>

					<div className="demo-nav-item" onClick={this.OnClick_RenderAnimationCanvas.bind( this )}>{this.state.AniBtnText}</div>

				</div>
				<div className="canvas-panel">
					<canvas id="html-5-canvas" className="canvas-2d" ref={this.Canvas}
						height={this.state.CanvasSize} width={this.state.CanvasSize}></canvas>
				</div>					
			</div>
        );
    }
};