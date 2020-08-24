import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';

import './home.css';
import SVG from '../../art/svgs.js';

export default class Home extends React.Component
{
    static contextType = ThemeContext;
	static defaultProps = {
		Title: "About Sean Gephardt",
		LinkTitle: "About",
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
		//	let _style = {
		//	//backgroundColor: this.context.Theme.Background,
		//	//color: this.context.Theme.Foreground
		//};
        return (
			<div className="page-main">Home</div>
        );
    }
};
