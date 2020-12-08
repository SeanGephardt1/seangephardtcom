import React from './react';
//import { Engine, Scene } from '@babylonjs/core'
import './webgl.css';

export default class WebGLDemo extends React.Component
{
	static defaultProps = {
		Title: "WebGL Demos",
		LinkTitle: "WebGL Demos",
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
		console.debug( "WebGL.render()" );
		//					<canvas ref={reactCanvas} {...rest} />
        return (
			<div className="sgcom-page-layout">
				<div>WebGL demo</div>
				<div>

				</div>					
			</div>
        );
    }
};