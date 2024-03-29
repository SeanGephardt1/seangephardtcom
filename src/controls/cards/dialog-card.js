import React from 'react';
import StateStore from '../../js/state-store.js';
import './dialog-card.min.css';

export default class DialogCard extends React.Component
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
		StateKey: Object.freeze( "DialogCardDisplayed" ),
		StateEventKey: undefined,
	};
	constructor( props )
	{	
		super( props );

		this.Color = ( this.props.color || DialogCard.defaultProps.Colors.Red );
		this.Placement = ( this.props.placement || DialogCard.defaultProps.Placements.Bottom );

		// VERTICAL, HORIZONTAL
		//	this.Location = { top: "50%", left: 'calc(50% - 150px)' };
			this.Location = {
				top: "auto",
				left: "auto",
				right: "auto",
				bottom: "auto"
			};

		this.state = {
			changed: null,
		};

		return;
	};
	OnClick_CloseHoverCard( ev )
	{
		//	console.debug( "OnClick_CloseHoverCard", this, ev );
		//ev.preventDefault();
		//ev.stopPropagation();
		//	ev.nativeEvent.stopImmediatePropagation();
		//	console.debug( "OnClick_CloseHoverCard", this.state.changed, StateStore.States[DialogCard.defaultProps.StateKey] );

		StateStore.AddState( DialogCard.defaultProps.StateKey, false );
		StateStore.AddState( DialogCard.defaultProps.StateEventKey, undefined );

		this.setState( { changed: false } );
		return;
	};
	HandleLocation()
	{	
		//	console.debug( "HandleLocation" );
		if ( StateStore.States[DialogCard.defaultProps.StateEventKey] !== undefined )
		{	// see ".hc-main-panel" in CSS
			let _default_card_width = parseInt( 300 ); 
			let _default_card_half_width = ( parseInt( _default_card_width ) / 2 ); 
			let _ev = StateStore.States[DialogCard.defaultProps.StateEventKey];
			//	console.debug( "_ev", _ev);

			//console.debug(
			//	_ev.clientY,
			//	_ev.layerY,
			//	_ev.offsetY,
			//	_ev.pageY,
			//	_ev.screenY,
			//	_ev.y,
			//	_ev.srcElement.offsetTop,
			//	_ev.srcElement.scrollTop
			//);

			let _org_box = _ev.srcElement.getBoundingClientRect();
			//	console.debug( "_org_box", _org_box);

			this.Location = {
				top: "auto",
				left: "auto",
				right: "auto",
				bottom: "auto"
			};

			switch ( this.props.placement )
			{
				case DialogCard.defaultProps.Placements.Top:
					{
						let _temp_vert =  "calc(100% - " + ( _ev.srcElement.offsetTop ) + "px)";
						let _temp_horiz = ( _org_box.left + ( _org_box.width / 2 ) - _default_card_half_width ) + "px";

						this.Location.left = _temp_horiz;
						this.Location.bottom = _temp_vert;
						break;
					}
				case DialogCard.defaultProps.Placements.Bottom:
					{
						//	let _temp_vert = ( _org_box.top + _org_box.height ) + "px";

						let _temp_vert =  ( _ev.srcElement.offsetTop +  _org_box.height) + "px";

						let _temp_horiz = ( _org_box.left + ( _org_box.width / 2 ) - _default_card_half_width ) + "px";

						this.Location.top = _temp_vert;
						this.Location.left = _temp_horiz;
						break;
					}
				case DialogCard.defaultProps.Placements.Left:
					{
						let _default_vertical = "calc(" +  (_ev.srcElement.offsetTop + 10 ) +  "px)";
						let _default_horizontal = ( _ev.srcElement.offsetLeft - _default_card_width ) + "px";

						this.Location = {
							top: _default_vertical,
							left: _default_horizontal,
							right: "auto",
							bottom: "auto",
						};
						break;
					}
				case DialogCard.defaultProps.Placements.Right:
					{
						let _default_vertical = "calc(" + ( _ev.srcElement.offsetTop + 10 )+ "px)";
						let _default_horizontal = ( _org_box.right) + "px";

						this.Location = {
							top: _default_vertical,
							left: _default_horizontal,
							right: "auto",
							bottom: "auto"
						};
						break;
					}
				default:
					{
						this.Location = {
							top: undefined,
							left: undefined,
							right: undefined,
							bottom: undefined
						};
						break;
					}
			}
		}
		//	console.debug( "This.Location", this.Location );
		return;
	};
	HandleFadeInOutState()
	{	//	console.debug( "HandleFadeInOutState" );
		//console.debug( "HoverCard.defaultProps.StateKey",StateStore.States[HoverCard.defaultProps.StateKey] );
		//console.debug( "this.state.changed", this.state.changed );

		let _classnames = "hc-main-panel " + this.props.placement;
		let _fade_classname;

		// STATES SET FROM EXTERNAL
		if ( StateStore.States[DialogCard.defaultProps.StateKey] === undefined && this.state.changed === null )
		{
			_fade_classname = "";
		}
		else if ( StateStore.States[DialogCard.defaultProps.StateKey] === true && this.state.changed === null)
		{
			_fade_classname = "hc-displayed";
		}
		else if ( StateStore.States[DialogCard.defaultProps.StateKey] === false && this.state.changed === null )
		{
			_fade_classname = "hc-hidden";
		}
		//	SET FROM INTERNAL
		else if ( StateStore.States[DialogCard.defaultProps.StateKey] === false && this.state.changed === false )
		{
			_fade_classname = "hc-hidden";
		}
		else if ( StateStore.States[DialogCard.defaultProps.StateKey] === true && this.state.changed === false )
		{
			_fade_classname = "hc-displayed";
		}

		_classnames = _classnames + " " + _fade_classname;
		//	console.debug( "_classnames ", _classnames );
		return _classnames;
	};

	render()
	{	
		//	console.debug( "DialogCard.render()", this.props.children);
		//	StateStore.States[DialogCard.defaultProps.StateKey],
		//	StateStore.States[DialogCard.defaultProps.StateEventKey] );

		this.HandleLocation();

		return (
			<div id="text-hover-card" className={this.HandleFadeInOutState()} style={this.Location}>

				{ /* PLACEMENT POINTER */ }
				<div className="hc-placement-chevron">
					<div className="hc-pointer">
						<svg viewBox="0 0 24 12" width="100%" height="100%">
							<polygon
								fill="rgba(255,255,255,1)"
								stroke="rgba(0,0,0,1)"
								strokeWidth="0"
								strokeMiterlimit="10"
								points="0,12 12,0 24,12" />
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