import React from 'react';
import HomeSvg from '../../controls/home-svg/home-svg.js';
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
		this.state = { debug: true };

		document.title = this.Title;
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
				{ /* SVG ANIMATION */}
				<HomeSvg />

				{ /* DESCRIPTION */ }
				{/*<div className="home-content">*/}
				{/*	<div className="bd-page-title">What is "UX Design Prototyping"?</div>*/}
				{/*	<div>Over the past several years, I've been focused on creating high fidelity, interactive prototypes of user experience scenarios utilizing HTML, SVG, CSS & JavaScript, that go beyond wireframes and static mock ups. This methodology allows researchers to collect succinct quantitative & qualitative data on expectations from the customers who will be using a product that the experience is designed for. It's also valuable after research has been completed as a way to provide engineering a preliminary code base to integrate and implement the scenario and features. For example, this entire portfolio site is being created using the ReactJs framework & related JavaScript libraries, as well as HTML 5 & CSS 3. */}
				{/*	</div>	*/}
				{/*</div>*/}

			</div>
        );
    }
};
