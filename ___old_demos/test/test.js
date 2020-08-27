import React from 'react';
import './test.css';
import { AppContext } from './../../js/context-app-state.js';

class TestingExtension extends React.Component
{
	static defaultProps = {
		Title: "React Playground",
		LinkTitle: "Playground",
		Href: "/test"
	};
	static contextType = AppContext;
	constructor( props )
	{
		super( props );
		this.Title = ( this.props.Title || TestingExtension.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || TestingExtension.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || TestingExtension.defaultProps.Href );;
		return;
	};
	render()
	{	//	
				//	this.context.Theme = AppThemes.Blue;
		/*
			<div className="page-main">
				<div className="testing-div" style={{
					backgroundColor: this.context.Theme.background,
					textAlign: 'center',
					padding: '20px',
					marginBottom: '20px'
				}}>Testing</div>
				{
					this.context.State.TestPageDropDownDisplayed &&
					<div
						className="testing-dropdown-panel"
						style={{
							backgroundColor: this.context.Theme.background
						}}>Content</div>
				}
				<div className="test-btn-row">
					<button onClick={this.context.ToggleTheme.bind( this )}>Change background color</button>
					<button onClick={this.context.ToggleTestPanel.bind( this )}>Toggle drop down panel</button>
				</div>
		 */
		//	console.debug( "TestingExtension.render()", this.context );

		return (
			<div className="page-main">
				<div className="testing-div"
					style={{ backgroundColor: this.context.Theme.background }}
					onClick={this.context.ToggleTheme.bind(this)}
				>Testing</div>
			</div> 
		);
	};
};
//	TestingExtension.contextType = AppStateContext;
export
{
	TestingExtension as TestExt
};