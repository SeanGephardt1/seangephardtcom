import React from 'react';
import StateStore from '../../js/state-store.js';
import './hover-card.css';

export default class HoverCard extends React.Component
{
	static defaultProps = {
		Colors:
		{
			Red: "pi-red",
			Orange: "pi-orange",
			Yellow: "pi-yellow",
			Green: "pi-green",
			Blue: "pi-blue",
			Purple: "pi-purple"
		},
		Placements:
		{
			Top: "hc-place-top",
			Left: "hc-place-left",
			Right: "hc-place-right",
			Bottom: "hc-place-bottom"
		},
		StateKey: Object.freeze( "HoverCardDisplayed" ),
		StateEventKey: undefined,
	};
	constructor( props )
	{	
		super( props );

		this.Color = ( this.props.color || HoverCard.defaultProps.Colors.Red );
		this.Placement = ( this.props.placement || HoverCard.defaultProps.Placements.Right );

		this.Top = undefined;
		this.Left = undefined;

		this.state = {
			changed: null,
		};

		return;
	};
	OnClick_CloseHoverCard( ev )
	{
		//	console.debug( "OnClick_CloseHoverCard", this.state.changed, StateStore.States[HoverCard.defaultProps.StateKey] );
		StateStore.AddState( HoverCard.defaultProps.StateKey, false );
		StateStore.AddState( HoverCard.defaultProps.StateEventKey, undefined );

		this.setState( { changed: false } );
		return;
	};
	HandleLocation()
	{	//	.getBoundingClientRect() 
		//console.debug( "HandleLocation" );
		//console.debug( "StateStore.States[HoverCard.defaultProps.StateKey]",
		//	StateStore.States[HoverCard.defaultProps.StateKey] );
		//	console.debug("StateStore.States[HoverCard.defaultProps.StateEventKey]", StateStore.States[HoverCard.defaultProps.StateEventKey] );
		//	console.debug( "1. this.Top, this.Left", this.Top, this.Left );

		if ( StateStore.States[HoverCard.defaultProps.StateEventKey] !== undefined )
		{
			let _elem = document.querySelector( ".hc-main-panel" );
			let _style = getComputedStyle( _elem );
			let _default_card_width = ( parseInt( _style.width ) / 2 ); 

			let _ev = StateStore.States[HoverCard.defaultProps.StateEventKey];
			//	console.debug( "_ev", _ev);
			//let _x = _ev.x;
			//let _y = _ev.y;
			//let _cx = _ev.clientX;
			//let _cy = _ev.clientY;
			//let _sx = _ev.screenX;
			//let _sy = _ev.screenY;
			//let _px = _ev.pageX;
			//let _py = _ev.pageY;
			console.debug(
				_ev.clientY,
				_ev.layerY,
				_ev.offsetY,
				_ev.pageY,
				_ev.screenY,
				_ev.y,
				_ev.srcElement.offsetTop,
				_ev.srcElement.scrollTop
			);

			let _org_box = _ev.srcElement.getBoundingClientRect();
			//	console.table( "_org_box", _org_box.bottom );

			switch ( this.props.placement )
			{
				case HoverCard.defaultProps.Placements.Top:
					{
						this.Top = + _ev.srcElement.offsetTop + _org_box.height + "px";
						this.Left = _org_box.left + ( _org_box.width / 2 ) - _default_card_width + "px";
						break;
					}
				default:
					{
						//this.Top = (_org_box.height + 4) + _org_box.top + "px";
						//this.Left = _org_box.left + ( _org_box.width / 2 ) - _default_card_width + "px";
						break;
					}
			}
		}
		///	console.debug( "2. this.Top, this.Left", this.Top, this.Left );
		console.debug( "this.Top", this.Top );

		return;
	};
	HandleFadeInOutState()
	{	//	console.debug( "HandleFadeInOutState" );
		//console.debug( "HoverCard.defaultProps.StateKey",StateStore.States[HoverCard.defaultProps.StateKey] );
		//console.debug( "this.state.changed", this.state.changed );

		let _classnames = "hc-main-panel " + this.props.placement;
		let _fade_classname;

		// STATES SET FROM EXTERNAL
		if ( StateStore.States[HoverCard.defaultProps.StateKey] === undefined && this.state.changed === null )
		{
			_fade_classname = "";
		}
		else if ( StateStore.States[HoverCard.defaultProps.StateKey] === true && this.state.changed === null)
		{
			_fade_classname = "hc-displayed";
		}
		else if ( StateStore.States[HoverCard.defaultProps.StateKey] === false && this.state.changed === null )
		{
			_fade_classname = "hc-hidden";
		}
		//	SET FROM INTERNAL
		else if ( StateStore.States[HoverCard.defaultProps.StateKey] === false && this.state.changed === false )
		{
			_fade_classname = "hc-hidden";
		}
		else if ( StateStore.States[HoverCard.defaultProps.StateKey] === true && this.state.changed === false )
		{
			_fade_classname = "hc-displayed";
		}

		_classnames = _classnames + " " + _fade_classname;
		//	console.debug( "_classnames ", _classnames );
		return _classnames;
	};
	render()
	{	
		//	console.debug( "HoverCard.render()",
		//	StateStore.States[HoverCard.defaultProps.StateKey],
		//	StateStore.States[HoverCard.defaultProps.StateEventKey] );

		this.HandleLocation();

		return (
			<div id="text-hover-card" className={this.HandleFadeInOutState()} style={{'top':this.Top, 'left':this.Left}}>

				{ /* PLACEMENT POINTER */ }
				<div className="hc-placement-chevron">
					<div className="hc-pointer">
						<svg viewBox="0 0 24 24" width="100%" height="100%">
							<polygon
								fill="rgba(255,255,255,1)"
								stroke="rgba(0,0,0,1)"
								strokeWidth="0"
								strokeMiterlimit="10"
								points="0,13 12,0 24,13" />
							<line x1="0" y1="12" x2="12" y2="0" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
							<line x1="12" y1="0" x2="24" y2="12" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
						</svg>	
					</div>
				</div>

				{ /* CONTENT PANEL */ }
				<div className="hc-content-panel">

					<div className="hc-header">
						<div className="hc-header-title" title={ this.props.title }>
						{
							this.props.title !== undefined && this.props.title						
						}
						</div>

						<div className="hc-close-button" onClick={this.OnClick_CloseHoverCard.bind(this) }>
							<svg viewBox="0 0 24 24" width="100%" height="100%">
								<circle x="0" y="0" cx="12" cy="12" r="12" strokeWidth="0" stroke="transparent"/>
								<line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="3" />
								<line x1="6" y1="18" x2="18" y2="6" stroke="white" strokeWidth="3" />
							</svg>	
						</div>
					
					</div>

					{
						this.props.children !== undefined &&
						<div className="hc-children-panel">{this.props.children}</div>
					}

				</div>

			</div>
		);
	};
};
