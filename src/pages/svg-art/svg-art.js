import React from 'react';
import './svg-art.css';

export default class SvgArtPage extends React.Component
{
	static defaultProps = {
		Title: "SVG art page",
		LinkTitle: "SVG art",
		// for demos pages, add "/demos/" route/folder path
		Href: "/demos/svg-art/",
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
			changed: false
		};

		this.Gradients = [
			"--bg-lg-01",
			"--bg-lg-02",
			"--bg-lg-03",
			"--bg-lg-04",
			"--bg-lg-05"
		];
		this.Bubbles = this.CreateBubbles();

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

		for ( let i = 0; i < 10; i++)
		{
			let _random_height = this.RandomNumberRange( 0, 128 );
			let _random_width = this.RandomNumberRange( 0, 2048 );
			let _top = this.RandomNumberRange( 512, 1024 );
			let _left = this.RandomNumberRange( -256, 256 );
			let _gr_rdn = Math.round( Math.random() * (this.Gradients.length - 1));
			let _bg_gr = this.Gradients[_gr_rdn];
			//	console.debug( "_bg_gr", _bg_gr );
			let _ani_duration = this.RandomNumberRange( 1000, 6000 );
			//	let _ani_iteration = this.RandomNumberRange( 3, 10 );

			let _s = {
				className: "bubbles",
				height: _random_height + _px,
				width: _random_width + _px,
				borderRadius: _random_height * 2 + _px,
				top: _top,
				left: _left,
				zIndex: i,
				backgroundImage: "var(" + _bg_gr + ")",
				animationDelay: "1000ms",
				animationDirection:"normal",
				animationFillMode:"both",
				animationTimingFunction:"ease-in-out",
				animationDuration: _ani_duration + "ms",
				animationIterationCount: 1,//_ani_iteration ,
				animationPlayState: "running",
				animationName: "RedBallAni",
			};
			//	console.debug( "_s", _s );

			_return_array.push(
				{
					style: _s
				}
			)
		}

		console.debug( "_return_array", _return_array );
		return _return_array;
	};
	OnClick_CreateNewPatterns( ev )
	{	//	console.debug( "OnClick_CreateNewPatterns" );
		this.Bubbles = this.CreateBubbles();
		this.setState( { changed: !this.state.changed } );
		return;
	}
    render()
	{
		console.debug( "SvgArtPage.render()", this.state.changed );

        return (
			<div className="page-layout">
				<div className="svg-art-main-panel">

					<div className="svg-art-block-panel" title="Click to create a new pattern" onClick={ this.OnClick_CreateNewPatterns.bind(this)}>
						{
							this.Bubbles.map( ( item, index ) =>
							(
								<div key={index} className={item.className} style={item.style}></div>
							) )
						}
					</div>

				</div>
			</div>
        );
    }
};