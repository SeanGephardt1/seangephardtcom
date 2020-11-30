import React from 'react';
import './test2.css';


export default class TestPage extends React.Component
{
	static defaultProps = {
		Title: "Testing 2",
		LinkTitle: "Test 2",
		Href: "/test2"
	};
	constructor( props )
	{
		super( props );
		this.Title = ( this.props.Title || TestPage.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || TestPage.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || TestPage.defaultProps.Href );
		document.title = this.Title;

		this.state = {
			X1: 50,
			X2: 50,
			deg1: "180deg",
			deg2: "90deg"
		};
		return;
	};
	OnMouseMove_Animatie_Background( ev )
	{
		//	console.debug(ev.target.id );
		//	console.debug( ev.clientX, ev.clientY );
		//	console.debug( ev.target.getBoundingClientRect() );
		//	ev.cancelBubble();

		let _ev_target = undefined;
		if ( ev.target.id === "fluent-button" )
		{
			_ev_target = ev.target.parentElement;
		}
		else
		{
			_ev_target = document.getElementById( "fluent-backdrop" );
		}

		let _mouse_x1 = parseInt( ev.clientY - _ev_target.getBoundingClientRect().y );
		let _mouse_x2 = parseInt( ev.clientX - _ev_target.getBoundingClientRect().x );
		//	console.debug( "_mouse_x1", _mouse_x1, "_mouse_x2", _mouse_x2 );
		//	console.debug( "deg1", this.state.deg1, "deg2", this.state.deg2 );

		this.setState( {
			X1: _mouse_x1,
			X2: _mouse_x2
		} );

		return;
	};
	render()
	{	
		//	console.debug( "render", this.state.X1, this.state.X2);

		//const _one = `linear-gradient(${this.state.deg1}, var(--black) 0px, transparent ${this.state.X1}px, var(--black) 100%)`;
		//const _two = `linear-gradient(${this.state.deg2}, var(--black) 0px, transparent ${this.state.X2}px, var(--black) 100%)`;
		//const _new_bg = { "backgroundImage": _one + "," + _two };
		////console.debug( "_new_bg", _new_bg );


		//	background: radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%);
		const _one = `radial-gradient(circle at 50%, transparent, #333 ${this.state.X1}px, #eee ${this.state.X2}px, #333 ${this.state.X1-this.state.X2}px)`;
		const _new_bg = { "backgroundImage": _one };

		return (
			<div className="test2-layout">
				<div className="bg-flow-panel">
					<div
						id="fluent-backdrop"
						className="bg-flow-element"
						style={ _new_bg }
						onMouseMove={this.OnMouseMove_Animatie_Background.bind( this )}>
						<div id="fluent-button" className="fluent-test">
							<span>Click Me!</span>
						</div>
					</div>
				</div>
			</div> 
		);
	};
};