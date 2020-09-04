import React from 'react';
import SVG from '../../art/svgs.js';
import './TemplateData/style.css';


export default class UnityDemo extends React.Component
{
	static defaultProps = {
		Title: "Unity WebGL Demo by Sean Gephardt",
		LinkTitle: "Unity WebGL",
		Href: "/unity/",
		Icon: SVG.AppNavButtons.About
	};
    constructor( props )
    {
        super( props );
		this.Title = ( this.props.Title || UnityDemo.defaultProps.Title );
		document.title = this.Title;

		this.LinkTitle = ( this.props.LinkTitle || UnityDemo.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || UnityDemo.defaultProps.Href );

		this.state = {};
		return;
	};
    render()
    {
        return (
            <div id="unity-container" class="unity-desktop">
              <canvas id="unity-canvas"></canvas>
              <div id="unity-loading-bar">
                <div id="unity-logo"></div>
                <div id="unity-progress-bar-empty">
                  <div id="unity-progress-bar-full"></div>
                </div>
              </div>
              <div id="unity-footer">
                <div id="unity-webgl-logo"></div>
                <div id="unity-fullscreen-button"></div>
                <div id="unity-build-title">SeansFirstUnity</div>
              </div>
            </div>
        );
    }
};
