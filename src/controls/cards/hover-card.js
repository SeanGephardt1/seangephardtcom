import React from 'react';
import StateStore from '../../js/state-store.js';
import './hover-card.css';

export default class HoverCard extends React.Component
{
	static defaultProps = {
		StateKey: Object.freeze( "HoverCardDisplayed" ),

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
		}
	};
	constructor( props )
	{	
		super( props );

		this.Color = ( this.props.color || HoverCard.defaultProps.Colors.Red );
		this.Placement = ( this.props.placement || HoverCard.defaultProps.Placements.Right );

		this.state = {
			changed: false
		};
		return;
	};
	OnClick_CloseHoverCard( ev )
	{
		//	console.debug( "OnClick_CloseHoverCard", this.state.changed, StateStore.States[HoverCard.defaultProps.StateKey] );
		StateStore.AddState( HoverCard.defaultProps.StateKey, undefined );
		this.setState( { changed: !this.state.changed } );
		return;
	};
	render()
	{
		//	console.debug( this.state.displayed );
		console.debug( "HoverCard.render()", this.state.changed, StateStore.States[HoverCard.defaultProps.StateKey] );

		let _placement_direction_classname;// = "hc-main-panel " + this.props.placement + " hc-displayed";
		//	console.debug( _placement_direction_classname );

		if ( StateStore.States[HoverCard.defaultProps.StateKey] === true )
		{
			_placement_direction_classname = "hc-main-panel " + this.props.placement + " hc-displayed";
		}
		else if ( StateStore.States[HoverCard.defaultProps.StateKey] === false ||
			StateStore.States[HoverCard.defaultProps.StateKey] === undefined )
		{
			_placement_direction_classname = "hc-main-panel " + this.props.placement + " hc-hidden";
		}
		console.debug( "_placement_direction_classname", _placement_direction_classname );

		return (
			<div className={_placement_direction_classname}>

				{ /* PLACEMENT POINTER */ }
				<div className="hc-placement-chevron">
					<div className="hc-pointer"></div>
				</div>

				{ /* CONTENT PANEL */ }
				<div className="hc-content-panel">

					<div className="hc-header">
						{
							this.props.title !== undefined &&
							<div className="hc-header-title" title={ this.props.title }>{this.props.title}</div>						
						}

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
