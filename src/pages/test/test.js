import React from 'react';
import './test.css';
import LorumContent from '../../controls/content/lorum-ipsum.js';

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
		this.Title = ( this.props.Title || this.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );
		document.title = this.Title;
		return;
	};
	render()
	{	
		return (
			<div className="page-layout">
				<LorumContent content={LorumContent.defaultProps.SimpleContent} />
				<LorumContent content={LorumContent.defaultProps.NirvanaAboutAGirl} />
				<LorumContent content={LorumContent.defaultProps.ComplexContent} />
				<LorumContent content={LorumContent.defaultProps.DeclarationOfIndependence} />
			</div> 
		);
	};
};