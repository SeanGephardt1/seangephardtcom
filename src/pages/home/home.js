import React from 'react';
import SVG from '../../art/svgs.js';
import './home.css';

export default class Home extends React.Component
{
	static defaultProps = {
		Title: "Sean Gephardt",
		LinkTitle: "Sean Gephardt",
		Href: "/",
		Icon: SVG.AppNavButtons.About
	};
    constructor( props )
    {
        super( props );
        this.state = {};

		this.Title = ( this.props.Title || Home.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Home.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Home.defaultProps.Href );

		document.title = this.Title;

		return;
    };
    render()
    {
        return (
			<div className="home-layout">

				<div className="home-layout-left">



				</div>

				<div className="home-layout-right">

					<div className="home-section">
						<div className="home-section-header">Recent Projects</div>
						<ul className="home-ul-list">
							<li>UX interaction protoyping for <a href="http://portal.azure.com" target="_new" title="Microsoft Azure">Microsoft Azure</a></li>
							<li>Azure IoT theming contribution to <a href="https://www.microsoft.com/design/fluent/#/web" target="_new" title="Microsoft Fluent Design System">Microsoft Fluent Design System</a></li>
						</ul>
					</div>

					<div className="home-section">
						<div className="home-section-header">Interactive Demos</div>
						<ul className="home-ul-list">
							<li>
								<a href="/azure/" target="_new" title="Microsoft Azure">Microsoft Azure</a>
							</li>
							<li>
								<a href="/movieworks/" target="_new" title="MovieWorks Demo">MovieWorks Demo</a>
							</li>
							<li>
								<a href="/guitars/" target="_new" title="GuitarSeller">GuitarSeller Demo</a>
							</li>
							<li>
								<a href="/webgl-demo/" target="_new" title="Web GL Demo">Web GL</a>
							</li>
							<li>
								<a href="/last-fm/" target="_new" title="Last.FM Demo">Last.FM Demo</a>
							</li>
						</ul>
					</div>

				</div>
			</div>
        );
    }
};
