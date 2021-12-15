import React from './react';
import './_template.css';

export default class PageTemplate extends React.Component
{
	static defaultProps = {
		Title: "WebGL Demos",
		LinkTitle: "WebGL Demos",
		// for demos pages, add "/demos/" route/folder path
		Href: "/demos/webgl/",
		// Icon: SVG.AppNavButtons.About
	};
	constructor( props )
	{
		// GENERIC
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

		document.title = this.Title;

		this.state = {
			changed: false,
		};

		return;
	};
    render()
	{
		console.debug( "PageTemplate.render()" );
        return (
			<div className="page-layout">Page Template</div>
        );
    }
};