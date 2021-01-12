import React from 'react';
import './home.css';
import HomeSvgData from './home-svg-data.js';

export default class Home extends React.Component
{
	static defaultProps = {
		Title: "Sean Gephardt, Design, Develop, Deploy",
		LinkTitle: "Sean Gephardt",
		Href: "/",
		//	Icon: SVG.AppNavButtons.About
	};
    constructor( props )
    {
        super( props );

		this.Title = ( this.props.Title || Home.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Home.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Home.defaultProps.Href );
		document.title = this.Title;


		this.Ani_ID = undefined;
		//	this.ani_max_count = 1000;
		this.ani_incr_counter = 1000;

		this.state = {
			currentSvgScreen: 0,
			translateLeft: "translate(1000,0)"
		};
		return;
	};
	OnClick_HomeAni_MoveLeft( ev )
	{
		console.debug( "OnClick_HomeAni_MoveLeft", ev );
		return;
	};
	OnClick_HomeAni_MoveRight( ev )
	{
		console.debug( "OnClick_HomeAni_MoveRight", ev );
		return;
	};


	Home_Animation()
	{	//	
		console.debug( "DoLogoAnimation()", this.ani_incr_counter );

		if ( this.ani_incr_counter === 0 )
		{
			console.debug( "DoLogoAnimation - hitting max count" );
			window.cancelAnimationFrame( this.Ani_ID );
			this.ani_incr_counter = 1000;
			this.setState( {
				translateLeft: "translate(0,0)"
			} );
			return;
		}

		this.ani_incr_counter = this.ani_incr_counter - 10;
		this.Ani_ID = window.requestAnimationFrame( () => this.Home_Animation() );
		let _translate_left = "translate(" + this.ani_incr_counter + ",0)";

		this.setState( {
			running: false,
			translateLeft: _translate_left
		} );
		return;
	};
	componentDidMount()
	{	//	console.debug( "AppLoader.componentDidMount()");
		//const _self = this;
		//window.setTimeout( function (_self)
		//{	//	console.debug( "settimeout()" );
		//	_self.Ani_ID = window.requestAnimationFrame( () => _self.Home_Animation() );
		//}, 3000, _self);
		return;
	}
	componentWillUnmount()
	{	//	console.debug( "AppLoader.componentWillUnmount()", this.Ani_ID );
		window.cancelAnimationFrame( this.Ani_ID );
		return;
	};
    render()
    {
        return (
			<div className="page-layout">

				{ /* SVG AREA 1 */ }
				<div className="svg-panel">

					<svg xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1000 800"
						className="design-svg"
						imageRendering="optimizeQuality"
						shapeRendering="geometricPrecision">
						{ /* DEBUG */ }
						<rect
							stroke="transparent"
							x="0" y="0"
							width="1000px" height="800px"
							rx="0"
							fill="rgba(0,0,0,0.1)"/>

						{ /* SCREEN 1 */}
						<g id="home-ani-screen-1" transform="translate(0,0)">
							<rect stroke="transparent" x="0" y="0" width="1000px" height="800px" rx="0" fill="rgba(255,0,0,0.1)"></rect>
						</g>

						{ /* SCREEN 2 transform={this.state.translateLeft} */}
                        <g id="home-ani-screen-2" >
							{HomeSvgData.SVG.TestAnimation}
						</g>

						{ /* SCREEN 3 */}
						<g id="home-ani-screen-3" transform="translate(666,0)">
							<rect stroke="transparent" x="0" y="0" width="1000px" height="800px" rx="0" fill="rgba(0,0,255,0.1)"></rect>
						</g>

						<g id="home-ani-buttons">
							<polygon
								className="home-ani-btn"
								points="248,120 8,248 8,8"
								onClick={this.OnClick_HomeAni_MoveLeft.bind( this )} />
							<polygon
								className="home-ani-btn"
								points="248,120 8,248 8,8"
								onClick={this.OnClick_HomeAni_MoveRight.bind( this )} />
						</g>
					</svg>

				</div>

				{ /* DESCRIPTION */ }
				<div>
					<div className="bd-page-title">What is "UX Design Prototyping"</div>
					<div>Over the past several years, I've been focused on creating high fidelity, interactive prototypes of user experience scenarios utilizing HTML, CSS & JavaScript, that go beyond wireframes and static mock ups. This methodology allows researchers to collect succinct quantitative & qualitative data on expectations from the customers who will be using a product that the experience is designed for. It's also valuable after research has been completed as a way to provide engineering a preliminary code base to integrate and implement the scenario and features. For example, this entire portfolio site is being created using the ReactJs framework & related JavaScript libraries, as well as HTML 5 & CSS 3. 
					</div>	
				</div>

			</div>
        );
    }
};
