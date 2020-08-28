import React from 'react';
import SVG from '../../art/svgs.js';
import './home.css';
import BtnImage1 from './ms-azure-button-image-1.png';
import BtnImage2 from './ms-azure-button-image-1.png';
import BtnImage3 from './ms-azure-button-image-1.png';

import LinkedInIcon from '../../art/img/linkedin.png';
import InstaGramLogo from '../../art/img/instagram.png';

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

				<div className="home-layout-head">

					<div className="home-layout-left">

						<div className="home-blurb-header">Designing UX prototypes</div>
						<div className="home-blurb">My passion is using modern technology to design and develop fantastic user experiences. With this in mind, I rely on my eye for detail and creativity to drive the highest possible quality into every product I work on. I live in the agile lifestyle, using constant expirementation and iteration to fine-tune any expereince my team building.</div>

						<div className="home-layout-body">
							<div className="pf-block" style={{ backgroundImage: `url(${BtnImage1})` }} >

								<a className="pf-block-overlay" href="/azure1/" title="Microsodt Azure">Responsive design for the Microsoft Azure Portal</a>
							</div>

							<div className="pf-block" style={{ backgroundImage: `url(${BtnImage2})` }} >
								<a className="pf-block-overlay" href="/azure1/" title="Microsodt Azure">Portfolio Example 1</a>
							</div>

							<div className="pf-block" style={{ backgroundImage: `url(${BtnImage3})` }} >
								<a className="pf-block-overlay" href="/azure1/" title="Microsodt Azure">Portfolio Example 1</a>
							</div>

							<div className="pf-block" style={{ backgroundImage: `url(${BtnImage3})` }} >
								<a className="pf-block-overlay" href="/azure1/" title="Microsodt Azure">Portfolio Example 1</a>
							</div>

						</div>


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
									<a href="/azure/" target="_new" title="Microsoft Azure">Microsoft Azure Responsive Demo</a>
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

						<div className="home-section">
							<div className="home-section-header">Related Links</div>
							<div className="home-related-link-block">
								<a className="home-related-link" href="https://www.linkedin.com/in/seangephardt/" title="Sean Gephardt on LinkedIn">
									<img src={LinkedInIcon} alt="Sean Gephardt on LinkedIn"  />
									<span>LinkedIn</span>
								</a>
								<a className="home-related-link" href="https://github.com/SeanGephardt1" title="Sean Gephardt on Gitub">
									{SVG.Brands.GitHub}
									<span>GitHub</span>
								</a>
								<a className="home-related-link" href="https://github.com/SeanGephardt1" title="Sean Gephardt on Instagram">
									<img src={InstaGramLogo} alt="Sean Gephardt on InstaGram" />
									<span>InstaGram</span>
								</a>
							</div>
						</div>

					</div>

				</div>




			</div>
        );
    }
};
