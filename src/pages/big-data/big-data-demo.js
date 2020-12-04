import React from 'react';
import './big-data-demo.css';
import SVG from '../../art/svgs.js';

export default class BigDataDemo extends React.Component
{
	static defaultProps = {
		Title: "Big Data Demo",
		LinkTitle: "Big Data Demo",
		Href: "/demos/big-data/",
		Icon: SVG.AppNavButtons.About,
	};
	constructor( props )
	{
		// GENERIC
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		document.title = this.Title;

		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

		this.state = {
			changed: false,
		};

		return;
	};
    render()
	{
		console.debug( "BigDataDemo.render()", this.props, this.state);

        return (
			<div className="big-data-demo-layout">Big Data Demo</div>
        );
    }
};