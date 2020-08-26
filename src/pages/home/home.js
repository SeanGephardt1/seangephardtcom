import React from 'react';
//	import { ThemeContext } from '../../js/theme-context.js';
import SVG from '../../art/svgs.js';
import LorumContextPanel from '../../controls/lorum-ipsum.js';

import './home.css';

export default class Home extends React.Component
{
    //	static contextType = ThemeContext;
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
    {	//  console.debug( "Home.render", this.context.theme);
        return (
			<div className="home-layout">
				<div className="home-layout-left">
					<LorumContextPanel />
				</div>
				<div className="home-layout-right">
					<div>Recent Projects</div>
					<div>
						<ul>
							<li>Responsive design for http://portal.azure.com</li>
							<li>Contribution to Microsoft Fluent Design System</li>
						</ul>
					</div>
				</div>
			</div>
        );
    }
};
