import React from 'react';
import './db-demo.css';

export default class DashboardDemo extends React.Component
{
	static defaultProps = {
		Title: "Dashboard Demo",
		LinkTitle: "Dashboard Demo",
		Href: "/portfolio/dashboard-demo",
		Icon: "" // SVG.AppNavButtons.About
	};
	constructor( props )
  {
		super( props );
		this.Title = DashboardDemo.defaultProps.Title;
		this.LinkTitle = DashboardDemo.defaultProps.LinkTitle;
		this.Href = DashboardDemo.defaultProps.Href;
		this.state = {
			debug: true,
		};

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
			<div className="page-layout">Dashboard Demo</div>
        );
    }
};
