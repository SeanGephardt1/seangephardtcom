import React from 'react';
import './test.css';
import { ThemeContext } from '../../js/theme-context.js';

export default class TestPage extends React.Component
{
    static contextType = ThemeContext;
	static defaultProps = {
		Title: "React Testing Playground",
		LinkTitle: "Playground",
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
		let _style = {
			backgroundColor: this.context.Theme.Background,
			color: this.context.Theme.Background
		};
		return (
			<div className="page-main">
				<div className="testing-div" style={_style}>Testing</div>
			</div> 
		);
	};
};