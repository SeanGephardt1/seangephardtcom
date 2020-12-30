import React from 'react';
import './css-art.css';

export default class CssArtPage extends React.Component
{
	static defaultProps = {
		Title: "CSS animations",
		LinkTitle: "CSS animations",
		// for demos pages, add "/demos/" route/folder path
		Href: "/demos/css-art/",
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
				"AniRotate45",
				"AniScale2",
			"AniSomeThing1"
		];

		this.Bubbles = this.CreateBubbles();

		this.state = {
			changed: false,
			animationRunning: "bubbles"
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

		for ( let i = 0; i < 50; i++)
		{
			let _random_height = this.RandomNumberRange( 0, 128 );
			let _random_width = this.RandomNumberRange( 0, 2048 );
			let _top = this.RandomNumberRange( 512, 1024 );
			let _left = this.RandomNumberRange( -256, 256 );
			let _ani_duration = this.RandomNumberRange( 500, 5000 );

			let _gr_rdn = Math.round( Math.random() * ( this.Gradients.length - 1 ) );
			let _bg_gr = this.Gradients[_gr_rdn];

			let _ani_rnd = Math.round( Math.random() * ( this.Animations.length - 1 ) );
			let _ani_name = this.Animations[_ani_rnd];

			let _s = {
				height: _random_height + _px,
				width: _random_width + _px,
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
	{	//	console.debug( "OnClick_CreateNewPatterns" );

		let _temp = "";

		if ( this.state.changed === false )
		{
			_temp = "bubbles bubbles-running";
		}
		else if ( this.state.changed === true )
		{
			_temp = "bubbles";
		}

		this.setState( {
			changed: !this.state.changed,
			animationRunning: _temp
		} );
		return;
	}
    render()
	{
		//	console.debug( "SvgArtPage.render()", this.state.changed, this.state.animationRunning );
        return (
			<div className="page-layout">
				<div className="bd-page-title">CSS animation demo</div>
				<div className="svg-art-main-panel">

					<div className="svg-art-block-panel" title="Click to create a new pattern" onClick={ this.OnClick_CreateNewPatterns.bind(this)}>
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