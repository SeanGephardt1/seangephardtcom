import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';
//import './resume.css';
import SVG from '../../art/svgs.js';

export default class Resume extends React.Component
{
	static contextType = ThemeContext;
	static defaultProps = {
		Title: "Resume for Sean Gephardt",
		LinkTitle: "Resume",
		Href: "/resume/",
		Icon: SVG.AppNavButtons.Resume
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || Resume.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Resume.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Resume.defaultProps.Href );
		document.title = this.Title;
		return;
	};
	render()
	{	//	console.debug("ResumeExtension.render()", this.Title);	
		return (
			<div className="page-main">Resume</div>
		);
	};
};