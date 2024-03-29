import React from 'react';
import './home.css';

export default class Home extends React.Component
{
	static defaultProps = {
		Title: "Sean Gephardt, Design, Develop, Deploy",
		LinkTitle: "Sean Gephardt",
		Href: "/",
		Icon: "" // SVG.AppNavButtons.About
	};
    constructor( props )
    {
        super( props );

		this.Title = ( this.props.Title || Home.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Home.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Home.defaultProps.Href );
		document.title = this.Title;

		this.state = { debug: false };
		return;
	};
	componentDidMount()
	{	//	console.debug( "Home.componentDidMount()");
		return;
	}
	componentWillUnmount()
	{	//	console.debug( "Home.componentWillUnmount()" );
		return;
	};
    render()
	{
		return (
			<div className="page-layout">

				{ /* SVG AREA 1 */ }
				<div className="svg-panel" id="svg_panel">
					<svg xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1000 1000"
						imageRendering="optimizeQuality"
						shapeRendering="geometricPrecision">
						<defs>
							<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="70%" fy="70%">
								<stop offset="0%" stopColor="rgba(198, 66, 110, 1)" stopOpacity="1" />
								<stop offset="100%" stopColor="rgba(100, 43, 115, 1)" stopOpacity="1" />
							</radialGradient>
							<linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" stopColor="rgba(190,64,128,1)" stopOpacity="1" />
								<stop offset="100%" stopColor="rgba(100, 43, 115, 1)" stopOpacity="1" />
							</linearGradient>
							<path id="test-path-1" d="M128,241.6c29.2-98.8,191,23.5,294,19c176.7-7.6,413-87,413-20c0,59-292.9,33.8-349,96.4 c-86,96,237.9,84.7,196.8,109.8C330,662,938.6,469.2,845,658c-110.5,74.5-429.3-109.3-359,65c94.3,233.7-398.1-45.2-294-56.4	C383,646,176,553,434,529C571.2,516.2,103.3,325.2,128,241.6z" />

							<path id="test-path-2" d="M202.9,505.8c-1.3-65.6,19-132.1,62.4-188c100.6-129.6,287.3-153.1,416.9-52.4
								s153.2,287.3,52.5,416.9s-287.3,153.1-416.9,52.4c-41.1-31.9-71.5-72.4-90.7-117.1"/>

							<path id="Circle_Path_1" d="M849.6,500c0,193.1-156.5,349.6-349.6,349.6S150.4,693.1,150.4,500S306.9,150.4,500,150.4
								S849.6,306.9,849.6,500z"/>

						</defs>
						{
							this.state.debug === false &&
							<g id="debug">
								<rect width="1000" height="1000" transform="translate(0,0)" fill="url(#grad2)"/>
							</g>
						}
						{ /* inner partial circles */ }
						<g id="inner-circles-1">
							<path id="circle_480" className="inner-circle ic1" d="M649.3,684.3C608.5,717.3,556.6,737,500,737c-131.2,0-237.5-106.1-237.5-237
								S368.8,263,500,263s237.5,106.1,237.5,237c0,41.5-10.7,80.5-29.5,114.4"/>
							<path id="circle_500" className="inner-circle ic2" d="M573.1,736.2c-52.2,16.1-110.1,15.1-164.9-6.8c-126.9-50.7-188.7-194.6-138.1-321.3
								s194.6-188.3,321.6-137.6s188.7,194.6,138.1,321.3c-16.1,40.2-41.5,73.8-72.8,99.4"/>
							<path id="Circle_520"  className="inner-circle ic3" d="M482.1,756.6c-56.7-4-112.5-26.7-157.3-68.5c-104-96.9-109.8-259.6-13-363.5
								S571.3,215,675.2,311.9s109.8,259.6,13,363.5c-30.7,32.9-68,56-107.9,69"/>
							<path id="Circle_540"  className="inner-circle ic4" d="M386.4,741.9c-53.5-25.1-99-68-126.8-125.3c-64.4-132.8-9.1-292.7,123.7-357.1
								s292.6-8.9,357,123.9s9.1,292.7-123.7,357.1c-42.1,20.4-86.9,28.8-130.5,26.5"/>
							<path id="Circle_560"  className="inner-circle ic5" d="M299.2,691.1c-42.2-44.4-70.1-103-75.5-168.8c-12.3-152.6,101.3-286.4,253.9-298.7
								S763.9,325,776.3,477.7c12.3,152.6-101.3,286.4-253.9,298.7c-48.4,3.9-94.8-4.8-136.1-23.5"/>
							<path id="Circle_580"  className="inner-circle ic6" d="M234.9,610.4c-24.4-58.6-29.7-125.6-10.5-191.2C269,267,428.6,179.8,580.8,224.4
								s239.4,204.2,194.8,356.4S571.4,820.2,419.2,775.6c-48.2-14.1-90-39.8-123-73.2"/>
							<path id="Circle_600"  className="inner-circle ic7" d="M202.9,505.8c-1.3-65.6,19-132.1,62.4-188c100.6-129.6,287.3-153.1,416.9-52.4
								s153.2,287.3,52.5,416.9s-287.3,153.1-416.9,52.4c-41.1-31.9-71.5-72.4-90.7-117.1"/>
						</g>

						{ /* Center star */ }
						<polygon id="Star1" className="inner-circle ic8" points="500,412.6 522.2,479.9 594.2,479.9 536,521.6 558.2,588.9 500,547.3 441.8,588.9 464,521.6 405.8,479.9 477.8,479.9 " />

						{ /* random path animation */ }
						<circle r="20"  fill="rgba(32, 96, 190, 1)" stroke="black" strokeWidth="0">
							<animateMotion begin="0s" dur="3s" repeatCount="indefinite" >
								<mpath xlinkHref="#Circle_Path_1"/>
							</animateMotion>
						</circle>


					</svg>
				</div>

				{ /* DESCRIPTION */ }
				<div className="home-content">
					<div className="bd-page-title">What is "UX Design Prototyping"</div>
					<div>Over the past several years, I've been focused on creating high fidelity, interactive prototypes of user experience scenarios utilizing HTML, CSS & JavaScript, that go beyond wireframes and static mock ups. This methodology allows researchers to collect succinct quantitative & qualitative data on expectations from the customers who will be using a product that the experience is designed for. It's also valuable after research has been completed as a way to provide engineering a preliminary code base to integrate and implement the scenario and features. For example, this entire portfolio site is being created using the ReactJs framework & related JavaScript libraries, as well as HTML 5 & CSS 3. 
					</div>	
				</div>

			</div>
        );
    }
};
