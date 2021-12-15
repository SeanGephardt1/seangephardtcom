import React from './react';
//	import { NavLink } from 'react-router-dom';
import StateStore from '../../js/state-store.js';
//	import { PagesList } from '../../pages/pages.js';
//	import SVG from '../../art/svgs.js';
import './portfolio.css';

// controls
import ProgressInfiniteControl from '../../controls/progress-controls/prog-infinite.js';
//	import ProgressBarControl from '../../controls/progress-controls/prog-bar.js';
import ProgressPieControl from '../../controls/progress-controls/prog-pie.js';

import ContextPanel from '../../controls/cards/context-panel.js';
import ModalOverlay from '../../controls/cards/modal.js';
import DialogCard from '../../controls/cards/dialog-card.js';

import BarChart from '../../controls/charts/bar-chart.js';

import LorumContent from '../../controls/content/lorum-ipsum.js';

export default class PortfolioPage extends React.Component
{
	static defaultProps = {
		Title: "Portfolio and prototypes",
		LinkTitle: "Portfolio",
		Href: "/portfolio/",
		//Icon: SVG.AppNavButtons.About
	};
	constructor( props )
	{
		// GENERIC
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );

		// PROG BAR DEMO OBJECTS 
		this._start_text = "Start";
		this._pause_text = "Pause";
		this._stop_text = "Stop";

		// progress pie
		this._prog_pie_btn_clicked = false;
		this._prog_pie_btn_text = this._start_text;
		this._prog_pie_value = 0;
		this._prog_pie_interval_handler = undefined;

		// dialogcard content selection enum
		this.DialogCardContentEnum = ["None","Small","Large"];

		this.TestForm =  ( <div className="test-content-panel">
			<h1>Header level 1</h1>
			<h2>Header Level 2</h2>
			<h3>Header Level 3</h3>
			<h4>Header Level 4</h4>
			<h5>Header Level 5</h5>
			<h6>Header Level 6</h6>
			<br />
			<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href='https://portal.azure.com'>Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
			<br />
			<table className='demo-table' cellPadding='0' cellSpacing='0'>
				<thead>
					<tr><td>Name&uarr;&darr;</td><td>Name&uarr;&darr;</td><td>Name&uarr;&darr;</td><td>Name&uarr;&darr;</td><td>Name&uarr;&darr;</td></tr></thead>
				<tbody><tr><td>Value</td><td>Value</td><td>Value</td><td>Value</td><td>Value</td></tr><tr><td>Value</td><td>Value</td><td>Value</td><td>Value</td><td>Value</td></tr><tr><td>Value</td><td>Value</td><td>Value</td><td>Value</td><td>Value</td></tr><tr><td>Value</td><td>Value</td><td>Value</td><td>Value</td><td>Value</td></tr><tr><td>Value</td><td>Value</td><td>Value</td><td>Value</td><td>Value</td></tr></tbody>
			</table>
			<br/>
			<ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Aliquam tincidunt mauris eu risus.</li><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Aliquam tincidunt mauris eu risus.</li><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Aliquam tincidunt mauris eu risus.</li></ul></ul></ul>
		</div> );
	
		this.state = {
			changed: false,

			ProgInfiniteColor: ProgressInfiniteControl.defaultProps.Colors.Red,
			ProgInfiniteSize: ProgressInfiniteControl.defaultProps.Sizes.ExtraLarge,

			ProgBarButtonRunning: false,

			ProgPie1Size: ProgressPieControl.defaultProps.Sizes.ExtraLarge,
			ProgPie1Color: ProgressPieControl.defaultProps.Colors.Orange,
			ProgPie1Step: 33,

			ProgPieButtonRunning: false,
			ProgPieSpeed: 0,

			hoverCardPlacementSelected: DialogCard.defaultProps.Placements.Bottom,
			hoverCardEventType: undefined,
			hoverCardContentSelected: this.DialogCardContentEnum[2],
			hoverCardContent: this.TestForm,

			modalOverlayDisplayed: false,

			contextPanelDisplayed: false,
			contextPanelPlacement: ContextPanel.defaultProps.Placements.Right,

			verticalBarChartAnimate: false,

			barChartOrientation: BarChart.defaultProps.Orientations.Horizontal,
			barChartData: BarChart.GenerateBarChartData(4)
		};

		document.title = this.Title;
		return;
	};

	// Modal Overlay
	OnClick_DisplayModalOverlay( ev )
	{	//	console.debug( "OnClick_DisplayModalOverlay" );
		this.setState( { modalOverlayDisplayed: true } );
		return;
	};
	OnClick_HideModalOverlay( ev )
	{	//	console.debug( "OnClick_HideModalOverlay", this.state.modalOverlayDisplayed );
		this.setState( { modalOverlayDisplayed: false } );
		return;
	};

	// Context Panel
	OnChange_ContextPanel_Placement( ev )
	{	//	console.debug( "OnChange_ContextPanel_Placement", ev.target.value );
		this.setState( { contextPanelPlacement:  ev.target.value } );
		return;
	}
	OnClick_DisplayContextPanel( ev )
	{	//	console.debug( "OnClick_DisplayContextPanel" );
		this.setState( { contextPanelDisplayed: !this.state.contextPanelDisplayed } );
		return;
	};
	OnClick_HideContextPanel( ev )
	{	//	console.debug( "OnClick_HideContextPanel", this.state.modalOverlayDisplayed );
		this.setState( { contextPanelDisplayed: false } );
		return;
	};

	// DialogCard
	OnChange_HoverCardPlacement( ev )
	{	//	console.debug( "OnChange_HoverCardPlacement", ev.target.value );
		this.setState( { hoverCardPlacementSelected: ev.target.value } );
		return;
	};
	OnChange_HoverCardContentSelection( ev )
	{	//	console.debug( "OnChange_HoverCardContentSelection", ev.target.value );
		let _content = undefined;
		if ( ev.target.value=== this.DialogCardContentEnum[0] )
		{
			_content = undefined;
		}
		else if ( ev.target.value === this.DialogCardContentEnum[1] )
		{
			_content = LorumContent.defaultProps.SimpleContent;
		}
		else if ( ev.target.value === this.DialogCardContentEnum[2] )
		{
			_content = this.TestForm;
		}

		this.setState( {
			hoverCardContentSelected: ev.target.value,
			hoverCardContent: _content
		} );
		return;
	};
	OnClick_ToggleHoverCard( ev )
	{	//	console.debug( "OnClick_ToggleHoverCard", StateStore.States[DialogCard.defaultProps.StateKey]);
		if ( StateStore.States[DialogCard.defaultProps.StateKey] === undefined ||
			StateStore.States[DialogCard.defaultProps.StateKey] === false )
		{
			StateStore.AddState( DialogCard.defaultProps.StateKey, true );
			StateStore.AddState( DialogCard.defaultProps.StateEventKey, ev.nativeEvent );
		}
		else if ( StateStore.States[DialogCard.defaultProps.StateKey] === true )
		{
			StateStore.AddState( DialogCard.defaultProps.StateKey, false );
			StateStore.AddState( DialogCard.defaultProps.StateEventKey, undefined );
		}
		//	console.debug( "OnClick_ToggleHoverCard", StateStore.States[HoverCard.defaultProps.StateKey] );
		this.setState( {
			changed: !this.state.changed,
			hoverCardEventType: DialogCard.defaultProps.StateEventKey,
		} );
		return;
	};

	// ProgInfinite
	OnChange_ProgInfinite_Colors( ev )
	{	//	console.debug( "OnChange_ProgInfinite_Colors", ev.target.value, ProgressInfiniteControl.defaultProps.Colors[ev.target.value] );
		this.setState( { ProgInfiniteColor:  ev.target.value } );
		return;
	}
	OnChange_ProgInfinite_Sizes( ev )
	{	//	console.debug( "OnChange_ProgInfinite_Sizes", ev.target.value );
		this.setState( { ProgInfiniteSize: ev.target.value } );
		return;
	}

	// ProgPie1
	OnChange_ProgPie1_Steps( ev )
	{	//	console.debug( "OnChange_ProgPie1_Steps", ev.target.value );
		this.setState( {
			ProgPie1Step: ev.target.value,
		} );
		return;
	}
	OnChange_ProgPie1_Colors( ev )
	{	//	console.debug( "OnChange_ProgPie1_Colors", ev.target.value, ProgressInfiniteControl.defaultProps.Colors[ev.target.value] );
		this.setState( { ProgPie1Color:  ev.target.value } );
		return;
	}
	OnChange_ProgPie1_Sizes( ev )
	{	//	console.debug( "OnChange_ProgPie1_Sizes", ev.target.value );
		this.setState( { ProgPie1Size: ev.target.value } );
		return;
	}

	// ProgPie2
	OnChange_ChangeProgPie2Speed( ev )
	{	//	console.debug( "OnChange_ChangeProgPieSpeed", ev.target.value );
		this._prog_pie_btn_clicked = false;
		this._prog_pie_btn_text = this._start_text;

		window.clearInterval( this._prog_pie_interval_handler );
		this._prog_pie_interval_handler = undefined;

		this.setState( {
			ProgPieSpeed: ev.target.value,
			ProgPieButtonRunning: false
		} );
		return;
	}
	OnClick_TestProgressPie2( ev )
	{	
		//	console.debug( "OnClick_TestProgressPie", this._prog_pie_btn_clicked );
		if ( this._prog_pie_btn_clicked === false && this._prog_pie_value === 100 )
		{
			this._prog_pie_value = 0;
			this._prog_pie_btn_clicked = true;
			this._prog_pie_interval_handler = window.setInterval( this.ProgPie_StartInterval, this.state.ProgPieSpeed, this );
		}
		else if ( this._prog_pie_btn_clicked === false && this._prog_pie_value === 0 )
		{
			this._prog_pie_value = 0;
			this._prog_pie_btn_clicked = true;
			this._prog_pie_interval_handler = window.setInterval( this.ProgPie_StartInterval, this.state.ProgPieSpeed, this );
		}
		else if ( this._prog_pie_btn_clicked === false && this._prog_pie_value !== 0)
		{
			this._prog_pie_btn_clicked = true;
			this._prog_pie_interval_handler = window.setInterval( this.ProgPie_StartInterval, this.state.ProgPieSpeed, this );
		}
		else if ( this._prog_pie_btn_clicked === true )
		{
			this._prog_pie_btn_clicked = false;
			this._prog_pie_btn_text  = this._start_text;

			window.clearInterval( this._prog_pie_interval_handler );
			this._prog_pie_interval_handler = undefined;
		}
		return;
	};
	ProgPie_StartInterval( scopeObj )
	{	
		//	console.debug( "ProgPieDemo_StartInterval", scopeObj._prog_pie_value);
		if ( scopeObj._prog_pie_value === 0 )
		{
			scopeObj._prog_pie_value++;
			scopeObj._prog_pie_btn_text = scopeObj._pause_text;
			scopeObj.setState({ ProgPieButtonRunning: !scopeObj.state.ProgPieButtonRunning });
		}
		else if ( scopeObj._prog_pie_value < 100 )
		{
			scopeObj._prog_pie_value++;
			scopeObj._prog_pie_btn_text = scopeObj._pause_text;
			scopeObj.setState({ ProgPieButtonRunning: !scopeObj.state.ProgPieButtonRunning });	
		}
		else if ( scopeObj._prog_pie_value === 100)
		{
			scopeObj._prog_pie_value = 0;
			scopeObj._prog_pie_btn_text  = scopeObj._start_text;
			scopeObj._prog_pie_btn_clicked = false;

			window.clearInterval( scopeObj._prog_pie_interval_handler );
			scopeObj._prog_pie_interval_handler = undefined;
		}
		return;
	};

	// Bar Chart
	OnChange_BarChart_Orientations( ev )
	{
		//	console.debug( "OnChange_BarChart_Orientations", ev.target.value);
		this.setState( {
			barChartOrientation: ev.target.value
		} )
		return;
	};
	OnClick_Start_VbarChart( ev )
	{
		//	console.debug( "OnClick_Start_VbarChart" );
		this.setState( {
			barChartData: BarChart.GenerateBarChartData()
		} )
		return;
	};

    render()
	{
		//	console.debug( "ControlsDemo.render()", this.state.hoverCardContentSelected, this.DialogCardContentEnum);
		//	console.debug( "StateStore.States[DialogCard.defaultProps.StateKey]", StateStore.States[DialogCard.defaultProps.StateKey] );		
		//	StateStore.States[DialogCard.defaultProps.StateKey] = true;

		/* CONTROL CARD TEMPLATE 
			<div className="ani-demo-card-1">
			<div className="ani-card-ctrl-block">control</div>
			<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time.</div>
			</div>
				<div className="demo-nav">
				{
					PagesList[2].routes.map( ( item, index ) => (
						<NavLink
						key={index}	
						exact={true}
						className="demo-nav-item"
						to={item.path}
						title={item.component.defaultProps.Title}
					>{item.component.defaultProps.LinkTitle}</NavLink>
					))
				}
				</div>
		*/

		return (

				<div className="page-layout">

				{/* change this */
					this.state.modalOverlayDisplayed === true &&
					<ModalOverlay closeEvent={ this.OnClick_HideModalOverlay.bind(this) }></ModalOverlay>
				}

				<ContextPanel
					displayed={ this.state.contextPanelDisplayed }
					closeEvent={this.OnClick_HideContextPanel.bind( this )}
					title="About a girl by Nirvana"
					placement={this.state.contextPanelPlacement}
				></ContextPanel>

				<DialogCard
					title="How to use a dialog box, and this text should be getting cut off."
					placement={this.state.hoverCardPlacementSelected}>{this.state.hoverCardContent}
				</DialogCard>

				{/* OTHER DEMOS */}
				<div className="bd-page-title">Demos and examples</div>

				{ /*  CONTROLS  */ }
				<div className="anim-demo-sub-header">Controls</div>
				<div className="anim-demo-desc">Customers sometimes need a little extra information or instruction regarding elements of the user interface that may not be completely intuitive or require additional description and/or functionality. Utilizing customized tooltips, dialogs and modal dialog in this scenario allow for additional information, specific data entry points or notifications.</div>

				{ /*  OVERLAYS */ }
				<div className="anim-demo-sub-header">Overlays</div>

				<div className="anim-demo-block-panel">

					{ /* Panel Card */}
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<div className="prog-bar-controls-2">
								<h3>Context panel</h3>
								<div className="margin-bottom-5"></div>
								<div>Select placement</div>
								<select
									className="prog-infinites"
									value={this.state.contextPanelPlacement}
									onChange={this.OnChange_ContextPanel_Placement.bind( this )}>
									{
										Object.entries( ContextPanel.defaultProps.Placements ).map( ( item, index ) => (
											<option key={index} value={item[1]}>{ item[0] }</option>
										))
									}
								</select>
							</div>
						</div>
						<div className="ani-card-text-block">
							<div className="prog-bar-controls-2">
								<div className="demo-nav-item"
								onClick={this.OnClick_DisplayContextPanel.bind( this )}
								>Click here</div>
							</div>
						</div>
					</div>

					{ /* DialogCard  */ }
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<div className="prog-bar-controls-2">
								<h3>Dialog card</h3>
								<div className="margin-bottom-5"></div>
								<div>Select placement</div>
								<select
									className="prog-infinites"
									value={this.state.hoverCardPlacementSelected}
									onChange={this.OnChange_HoverCardPlacement.bind( this )}>
									{
										Object.entries( DialogCard.defaultProps.Placements ).map( ( item, index ) => (
											<option key={index} value={item[1]}>{ item[0] }</option>
										))
									}
								</select>
								<div className="margin-bottom-5"></div>
								<div>Select content</div>
								<select
									className="prog-infinites"
									value={this.state.hoverCardContentSelected}
									onChange={this.OnChange_HoverCardContentSelection.bind( this )}>
									{
										this.DialogCardContentEnum.map( ( item, index ) => (
											<option key={index} value={item}>{ item }</option>
										))
									}
								</select>
							</div>
						</div>
						<div className="ani-card-text-block">
							<div className="prog-bar-controls-2">
							<div className="demo-nav-item"
								onClick={this.OnClick_ToggleHoverCard.bind( this )}
								>Click here</div>
							</div>
						</div>

					</div>

					{ /* Modal Card */}
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<div className="prog-bar-controls-2">
								<h3>Modal overlay</h3>
							</div>
						</div>
						<div className="ani-card-text-block">
							<div className="prog-bar-controls-2">
							<div className="demo-nav-item"
								onClick={this.OnClick_DisplayModalOverlay.bind( this )}
								>Click here</div>
							</div>
						</div>
					</div>

					{ /* END */}
				</div>


				{ /* PROGRESS INDICATORS */ }
				<div className="anim-demo-sub-header">Progress Indicators</div>

				<div className="anim-demo-block-panel">

					{ /* PLACEHOLDERS 
						<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">control</div>
						<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time.</div>
						</div>
					 */}
					{ /* "FINISHED CONTROLS" */}

					{ /* INFINTE PROGRESS INDICATORS */ }
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<ProgressInfiniteControl
								size={this.state.ProgInfiniteSize}
								color={this.state.ProgInfiniteColor}
								style={ProgressInfiniteControl.defaultProps.Styles.Circle}
							/>
							<div className="margin-bottom-10"></div>
							<ProgressInfiniteControl
								size={this.state.ProgInfiniteSize}
								color={this.state.ProgInfiniteColor}
								style={ProgressInfiniteControl.defaultProps.Styles.Bar} />
						</div>
						<div className="ani-card-text-block">
							<div>An example of an "indefinite" progress indicators, meaning that it is displayed for an indefinite amount of time and can be dsiplayed or hidden at any time.</div>
							<div className="margin-bottom-5"></div>
							<div className="prog-bar-controls-2">

								<div>Select size</div>
								<select
									className="prog-infinites"
									value={this.state.ProgInfiniteSize}
									onChange={this.OnChange_ProgInfinite_Sizes.bind( this )}>
									{
										Object.entries( ProgressInfiniteControl.defaultProps.Sizes ).map( ( item, index ) => (
											<option key={index} value={item[1]}>{ item[0] }</option>
										))
									}
								</select>
	
								<div className="margin-bottom-5"></div>
								<div>Select color</div>
								<select
									className="prog-infinites"
									value={this.state.ProgInfiniteColor}
									onChange={this.OnChange_ProgInfinite_Colors.bind( this )}>
									{
										Object.entries( ProgressInfiniteControl.defaultProps.Colors ).map( ( item, index ) => (
											<option key={index} value={item[1]}>{ item[0] }</option>
										))
									}
								</select>

							</div>
						</div>
					</div>

					{ /* DEFINITE PROGRESS PIE 1 */ }
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<ProgressPieControl
								style={ProgressPieControl.defaultProps.Styles.Circle}
								color={this.state.ProgPie1Color}
								size={this.state.ProgPie1Size}
								value={this.state.ProgPie1Step} />
							<div className="margin-bottom-10"></div>

							<ProgressPieControl
								style={ProgressPieControl.defaultProps.Styles.Bar}
								color={this.state.ProgPie1Color}
								size={this.state.ProgPie1Size}
								value={this.state.ProgPie1Step} />
						</div>
						<div className="ani-card-text-block">This example of a progress indicator allows for stepping through the progression values, based on a range of 0 - 100.
							<div className="prog-bar-controls-2">
								<div className="margin-bottom-5"></div>
								<label htmlFor="prog_pie_step">Step value: {this.state.ProgPie1Step}</label>
								<input type="range"
									id="prog_pie_step" name="prog_pie_step"
									className="input-range-demo"
									min="0" max="100" step="1" value={this.state.ProgPie1Step}
									onChange={this.OnChange_ProgPie1_Steps.bind( this )} />
								<div className="margin-bottom-5">Select size</div>
								<select
									className="prog-infinites"
									value={this.state.ProgPie1Size}
									onChange={this.OnChange_ProgPie1_Sizes.bind( this )}>
									{
										Object.entries( ProgressPieControl.defaultProps.Sizes ).map( ( item, index ) => (
											<option key={index} value={item[1]}>{ item[0] }</option>
										))
									}
								</select>
								<div className="margin-bottom-5">Select color</div>
								<select
									className="prog-infinites"
									value={this.state.ProgPie1Color}
									onChange={this.OnChange_ProgPie1_Colors.bind( this )}>
									{
										Object.entries( ProgressPieControl.defaultProps.Colors ).map( ( item, index ) => (
											<option key={index} value={item[1]}>{ item[0] }</option>
										))
									}
								</select>
							</div>
						</div>
					</div>

					{ /* DEFINITE PROGRESS PIE 2 */ }
					<div className="ani-demo-card-1">
							<div className="ani-card-ctrl-block">
								<ProgressPieControl
								style={ProgressPieControl.defaultProps.Styles.Circle}
								color={ProgressPieControl.defaultProps.Colors.Yellow}
								size={ProgressPieControl.defaultProps.Sizes.ExtraLarge}
								value={this._prog_pie_value} />

								<div className="margin-bottom-10"></div>

								<ProgressPieControl
								style={ProgressPieControl.defaultProps.Styles.Bar}
								color={ProgressPieControl.defaultProps.Colors.Yellow}
								size={ProgressPieControl.defaultProps.Sizes.ExtraLarge}
								value={this._prog_pie_value} />
							</div>
							<div className="ani-card-text-block">Another example of a progress indicator that allows for setting the interval time, to get a feeling for how animation speeds can affect the progression values.
								<div className="prog-bar-controls-2">
									<div className="margin-bottom-5"></div>
									<label htmlFor="prog_pie_speed">Speed (0ms - 1000ms): {this.state.ProgPieSpeed}ms</label>
									<input type="range"
										id="prog_pie_speed" name="prog_pie_speed"
										className="input-range-demo"
										min="0" max="1000" step="50" value={this.state.ProgPieSpeed}
										onChange={ this.OnChange_ChangeProgPie2Speed.bind(this) }/>
									<div className="demo-nav-item" onClick={this.OnClick_TestProgressPie2.bind( this )}>{this._prog_pie_btn_text}</div>
								</div>							
							</div>
						</div> 


					{ /* END */}
				</div>

				</div>
        );
    }
};