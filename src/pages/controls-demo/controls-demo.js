import React from './react';
import SVG from '../../art/svgs.js';
import './controls-demo.css';

// controls
import ProgressInfiniteControl from '/../controls/prog-indicators/prog-infinite.js';
import ProgressBarControl from '/../controls/prog-indicators/prog-bar.js';
import ProgressPieControl from '/../controls/prog-indicators/prog-pie.js';

export default class ControlsDemo extends React.Component
{
	static defaultProps = {
		Title: "Demos",
		LinkTitle: "Demos",
		Href: "/demos/",
		Icon: SVG.AppNavButtons.About
	};
	constructor( props )
	{
		// GENERIC
		super( props );
		this.Title = ( this.props.Title || ControlsDemo.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || ControlsDemo.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || ControlsDemo.defaultProps.Href );

		// PROG BAR DEMO OBJECTS 
		this._start_text = "Start";
		this._pause_text = "Pause";
		this._stop_text = "Stop";

		// progress bar
		this._prog_bar_btn_clicked = false;
		this._prog_bar_tbn_text = this._start_text;
		this._prog_bar_value = 0;
		this._prog_bar_interval_handler = undefined;

		// progress pie
		this._prog_pie_btn_clicked = false;
		this._prog_pie_btn_text = this._start_text;
		this._prog_pie_value = 0;
		this._prog_pie_interval_handler = undefined;

		this.state = {
			ProgBarButtonRunning: false,
			ProgPieButtonRunning: false,
			ProgPieSpeed: 100,
			ProgPieStep: 33,
			ProgInfiniteColor: ProgressInfiniteControl.defaultProps.Colors.Red,
			ProgInfiniteSize: ProgressInfiniteControl.defaultProps.Sizes.ExtraLarge
		};

		document.title = this.Title;

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

	ProgBarDemo_StartInterval( scopeObj )
	{	//	console.debug( "ProgBarDemo_StartInterval", scopeObj._prog_bar_value );
		if ( scopeObj._prog_bar_value < 100)
		{
			scopeObj._prog_bar_value++;
			scopeObj._prog_bar_tbn_text = scopeObj._pause_text;
		}
		else if ( scopeObj._prog_bar_value === 100)
		{
			scopeObj._prog_bar_tbn_text = scopeObj._start_text;
			scopeObj._prog_bar_btn_clicked = false;

			window.clearInterval( scopeObj._prog_bar_interval_handler );
			scopeObj._prog_bar_interval_handler = undefined;
		}

		scopeObj.setState({
			ProgBarButtonRunning: !scopeObj.state.ProgBarButtonRunning
		});
		//	console.debug( "scopeObj.state", scopeObj.state );
		return;
	};
	OnClick_TestProgressBar( speed, ev )
	{
		//	console.debug( "OnClick_TestProgressBar", this._prog_bar_btn_clicked );

		if ( this._prog_bar_btn_clicked === false && ( this._prog_bar_value === 0 || this._prog_bar_value === 100) )
		{
			this._prog_bar_value = 0;
			this._prog_bar_btn_clicked = true;
			this._prog_bar_interval_handler = window.setInterval( this.ProgBarDemo_StartInterval, 20, this );
		}
		else if ( this._prog_bar_btn_clicked === false && this._prog_bar_value !== 0)
		{
			this._prog_bar_btn_clicked = true;
			this._prog_bar_interval_handler = window.setInterval( this.ProgBarDemo_StartInterval, 20, this );
		}
		else if ( this._prog_bar_btn_clicked === true )
		{
			this._prog_bar_btn_clicked = false;
			this._prog_bar_tbn_text = this._start_text;

			window.clearInterval( this._prog_bar_interval_handler );
			this._prog_bar_interval_handler = undefined;

			this.setState({
				ProgBarButtonRunning: !this.state.ProgBarButtonRunning
			});
		}

		return;
	};

	// ProgPie
	OnChange_StepProgPie( ev )
	{	//	console.debug( "OnChange_StepProgPie", ev.target.value );
		this.setState( {
			ProgPieStep: ev.target.value,
		} );
		return;
	}
	OnChange_ChangeProgPieSpeed( ev )
	{	//	
		console.debug( "OnChange_ChangeProgPieSpeed", ev.target.value );
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
	OnClick_TestProgressPie( ev )
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

    render()
	{
		//	console.debug( "render", this.state.ProgInfiniteColor );

        return (
			<div className="anim-demo-layout">

				{ /* CONTROL CARD TEMPLATE 
						<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">control</div>
						<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time.</div>
						</div>
				 */}

				{ /* Popup cards  */ }
				<div className="anim-demo-header">Popup cards</div>
				<div className="anim-demo-desc">Customers sometimes need a littel extra information or instruction regarding elements of the user interface that may not be completely intuitive or require additional description. Utilizing customized popup cards in this scenario allow for additional information, specific data entry points or notifications.</div>

				<div className="anim-demo-block-panel">

					{ /* INFINTE PROGRESS INDICATORS */ }
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<ProgressInfiniteControl
								size={this.state.ProgInfiniteSize}
								color={this.state.ProgInfiniteColor}
								style={ProgressInfiniteControl.defaultProps.Styles.Circle}
							/>

						</div>
						<div className="ani-card-text-block">
							<div>An example of an "indefinite" progress indicators, meaning that it is displayed for an indefinite amount of time and can be dsiplayed or hidden at any time.</div>
							<div className="margin-bottom-5"></div>
							<div className="prog-bar-controls">Controls</div>
						</div>
					</div>

					{ /* END */}
				</div>


				{ /* Progress Indicators - COMPLETED */ }
				<div className="anim-demo-header">Progress Indicators</div>
				<div className="anim-demo-desc">Customers will need to know that something could take longer than expected and that it will eventually be displayed. Progress indicators allow for these types of scenarios and help set customer expectations that the app is 'doing work'. Utilizing animation in this scenario provide a key visual indicator to the user that something is happening.</div>

				<div className="anim-demo-block-panel">

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
							<div className="prog-bar-controls">
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

								<div className="margin-bottom-5"></div>
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
							</div>
						</div>
					</div>

					{ /* DEFINITE PROGRESS BAR */ }
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">

							<ProgressBarControl color={ProgressBarControl.defaultProps.Colors.Red} speed={500} />
							<div className="margin-bottom-10"></div>

							<ProgressBarControl color={ProgressBarControl.defaultProps.Colors.Orange} speed={ 1500 } />
							<div className="margin-bottom-10"></div>

							<ProgressBarControl color={ProgressBarControl.defaultProps.Colors.Yellow} speed={ 3000 } />
							<div className="margin-bottom-10"></div>

							<ProgressBarControl color={ProgressBarControl.defaultProps.Colors.Green} speed={ 4500 } />
							<div className="margin-bottom-10"></div>

							<ProgressBarControl
								color={ProgressBarControl.defaultProps.Colors.Blue}
								percentage={this._prog_bar_value} />
						</div>

						<div className="ani-card-text-block">
							<div>This progress bar indicator example can be used with a specific increment value, shown with different timers above. Click the 'Start' button to a pausable demonstration.</div>
							<br/>
							<div className="prog-bar-controls">
								<button className="prog-bar-btn" onClick={this.OnClick_TestProgressBar.bind( this )}>{this._prog_bar_tbn_text}</button>
								{/*
								<span className="prog-bar-value">{this._prog_bar_value}</span>
								 */ }
							</div>
	
						</div>

					</div>

					{ /* PLACEHOLDERS 
						<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">control</div>
						<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time.</div>
						</div>
					 */}

					{ /* DEFINITE PROGRESS PIE 1 */ }
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<ProgressPieControl
								color={ProgressPieControl.defaultProps.Colors.Blue}
								value={ this.state.ProgPieStep } />
						</div>
						<div className="ani-card-text-block">This example of a progress indicator allows for stepping through the progression values, based on a range of 0 - 100.
							<div className="prog-bar-controls-2">
								<label htmlFor="prog_pie_step">Step value: {this.state.ProgPieStep}</label>
								<input type="range"
									id="prog_pie_step" name="prog_pie_step"
									className="input-range-demo"
									min="0" max="100" step="1" value={this.state.ProgPieStep}
									onChange={ this.OnChange_StepProgPie.bind(this) }/>
							</div>
						</div>
					</div>

					{ /* DEFINITE PROGRESS PIE 2 */ }
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<ProgressPieControl
								color={ProgressPieControl.defaultProps.Colors.Purple}
								value={ this._prog_pie_value } />
						</div>
						<div className="ani-card-text-block">Another example of a progress indicator that allows for setting the interval time, to get a feeling for how animation speeds can affect the progression values.
							<div className="prog-bar-controls-2">
								<label htmlFor="prog_pie_speed">Speed (0ms - 1000ms): {this.state.ProgPieSpeed}ms</label>
								<input type="range"
									id="prog_pie_speed" name="prog_pie_speed"
									className="input-range-demo"
									min="0" max="1000" step="50" value={this.state.ProgPieSpeed}
									onChange={ this.OnChange_ChangeProgPieSpeed.bind(this) }/>
							</div>
							<div className="prog-bar-controls">
								<button className="prog-bar-btn" onClick={this.OnClick_TestProgressPie.bind( this )}>{this._prog_pie_btn_text}</button>
							</div>							
						</div>
					</div>


					{ /* END */}
				</div>

			</div>
        );
    }
};