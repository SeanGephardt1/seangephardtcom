import React from 'react';
import './test.css';
import GuitarsSvg from './guitars-svg.js';

export default class TestPage extends React.Component
{
	static defaultProps = {
		Title: "Testing",
		LinkTitle: "Test",
		Href: "/test"
	};
constructor( props )
	{
		super( props );
		this.Title = ( this.props.Title || TestPage.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || TestPage.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || TestPage.defaultProps.Href );
		document.title = this.Title;
		return;
	};
	render()
	{	
		return (
			<div className="test-layout">
				<GuitarsSvg icon={GuitarsSvg.Fender.TelecasterDeluxe1972} name="1972 Fender Telecaster Deluxe"/>
			</div> 
		);
	};
};