import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';
import SVG from '../../art/svgs.js';
import LorumContextPanel from '../../controls/lorum-ipsum.js';

import SeanG from './sean.jpg';
import SeanGuitar from './sean-guitar-lucky.jpg';

import './home.css';

export default class Home extends React.Component
{
    static contextType = ThemeContext;
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
        let _style = {
			//backgroundColor: this.context.Theme.Background,
			//color: this.context.Theme.Foreground
		};
        return (
			<div className="home-layout">
				<div className="home-layout-left">
					<LorumContextPanel />
					<img src={SeanG} className="sean-guitar-pic" title="Sean Gephardt" alt="Sean Gephardt"/>
				</div>
				<div className="home-layout-right">
					<img src={SeanGuitar} className="sean-guitar-pic" title="Sean Gephardt playing guitar" alt="Sean Gephardt playing guitar" />
				</div>
			</div>
        );
    }
};
