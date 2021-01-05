import React from 'react';
import SubNav from '../../controls/nav/sub-nav.js';
import './css-art.css';

export default class CssArtPage extends React.Component
{
	static defaultProps = {
		Title: "CSS 3 animations",
		LinkTitle: "CSS 3 animations",
		// for demos pages, add "/demos/" route/folder path
		Href: "/portfolio/css-demos/",
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

		this.Gradients = [
			"--bg-lg-01",
			"--bg-lg-02",
			"--bg-lg-03",
			"--bg-lg-04",
			"--bg-lg-05"
		];
		this.Animations = [
			//	"AniRotate45",
			"AniScale2",
		];

		this.Bubbles = this.CreateBubbles();

		this.state = {
			changed: false,
			animationRunning: "bubbles",
			aniText: "Animate"
		};

		return;
	};
	RandomNumberRange( min, max )
	{
		const _rv = Math.round(Math.random() * ( max - min ) + min);
		//	console.debug( "_rv", _rv );
		return _rv; 
	}
	CreateBubbles()
	{	//	console.debug( "CreateBubbles" );
		const _px = "px";
		let _return_array = [];

		for ( let i = 0; i < 99; i++)
		{
			let _random_height = this.RandomNumberRange( 0, 128 );
			//	let _random_width = this.RandomNumberRange( 0, 2048 );
			let _top = this.RandomNumberRange( -512, 1024 );
			let _left = this.RandomNumberRange( -512, 512 );
			let _ani_duration = this.RandomNumberRange( 1000, 5000 );

			let _gr_rdn = Math.round( Math.random() * ( this.Gradients.length - 1 ) );
			let _bg_gr = this.Gradients[_gr_rdn];

			let _ani_rnd = Math.round( Math.random() * ( this.Animations.length - 1 ) );
			let _ani_name = this.Animations[_ani_rnd];

			let _s = {
				height: _random_height + _px,
				width: "100%",//_random_width + _px,
				borderRadius: _random_height * 2 + _px,
				top: _top,
				left: _left,
				zIndex: i,
				backgroundImage: "var(" + _bg_gr + ")",
				animationDuration: _ani_duration + "ms",
				animationName: _ani_name,
			};
			//	console.debug( "_s", _s );

			_return_array.push(
				{
					style: _s
				}
			)
		}

		//	console.debug( "_return_array", _return_array );
		return _return_array;
	};
	OnClick_CreateNewPatterns( ev )
	{	//	console.debug( "OnClick_CreateNewPatterns",this.state  );
		let _temp = "";
		let _text = "";
		if ( this.state.changed === false )
		{
			_temp = "bubbles bubbles-running";
			_text = "Pause";
		}
		else if ( this.state.changed === true )
		{
			_temp = "bubbles";
			_text = "Animate";
		}

		this.setState( {
			changed: !this.state.changed,
			animationRunning: _temp,
			aniText: _text
		} );
		return;
	}
	OnClick_NewPatterns( ev )
	{	//	console.debug( "OnClick_NewPatterns", this.state );
		this.Bubbles = this.CreateBubbles();
		this.setState( {
			changed: false,
			animationRunning: "bubbles",
			aniText: "Animate"
		} );
		return;
	};
    render()
	{
		//	console.debug( "SvgArtPage.render()", this.state.changed, this.state.animationRunning );
        return (
			<div className="page-layout">
				<SubNav/>
				<div className="bd-page-title">CSS animation demo</div>

				<div className="input-nav">
					<div className="demo-nav-item" onClick={this.OnClick_NewPatterns.bind( this )}>New pattern</div>
					<div className="demo-nav-item" onClick={this.OnClick_CreateNewPatterns.bind( this )}>{this.state.aniText}</div>
				</div>

				<div className="svg-art-main-panel">

					<div className="svg-art-block-panel" title="Click to create a new pattern">
						{
							this.Bubbles.map( ( item, index ) =>
							(
								<div key={index} className={this.state.animationRunning} style={item.style}></div>
							) )
						}
					</div>

				</div>
			</div>
        );
    }
};