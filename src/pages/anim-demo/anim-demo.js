import React from 'react';
import SVG from '../../art/svgs.js';
import './anim-demo.css';
import ProgressSpinnerControl from './prog-spinner.js';
import ProgressBarControl from './prog-bar.js';
import ProgressPieControl from './prog-pie.js';


export default class AnimationsDemoExtension extends React.Component
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
		this.Title = ( this.props.Title || AnimationsDemoExtension.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || AnimationsDemoExtension.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || AnimationsDemoExtension.defaultProps.Href );

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
			ProgPieSpeed: 0,
			ProgPieStep: 0
		};

		document.title = this.Title;

		return;
	};

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
		//	console.debug( "render", this._prog_pie_value);
        return (
			<div className="anim-demo-layout">

				<div className="anim-demo-header">Animations</div>
				<div className="anim-demo-sub-header">Progress Indicators</div>

				<div className="anim-demo-desc">Customers will need to know that something could take longer than expected and that it will eventually be displayed. Progress indicators allow for these types of scenarios and help set customer expectations that the app is 'doing work'.</div>

				<div className="anim-demo-block-panel">

					{ /* "FINISHED CONTROLS" */}

					{ /* INDEFINITE PROGRESS SPINNER */ }
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<ProgressSpinnerControl size={ProgressSpinnerControl.defaultProps.Sizes.ExtraLarge} />
							<div className="margin-bottom-10"></div>
						</div>
							<div className="ani-card-text-block">This is an example of an "indefinite" progress indicator, meaning that it is displayed for an indefinite amount of time and can be hidden at any time.</div>
					</div>

					{ /* DEFINITE PROGRESS BAR */ }
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<ProgressBarControl color={ProgressBarControl.defaultProps.Colors.Red} speed={ 500 } />
							<div className="margin-bottom-10"></div>

							<ProgressBarControl color={ProgressBarControl.defaultProps.Colors.Orange} speed={ 1000 } />
							<div className="margin-bottom-10"></div>

							<ProgressBarControl color={ProgressBarControl.defaultProps.Colors.Yellow} speed={ 1500 } />
							<div className="margin-bottom-10"></div>

							<ProgressBarControl color={ProgressBarControl.defaultProps.Colors.Green} speed={ 2000 } />
							<div className="margin-bottom-10"></div>

							<ProgressBarControl
								color={ProgressBarControl.defaultProps.Colors.Green}
								loop={true} />
							<div className="margin-bottom-10"></div>

							<ProgressBarControl
								color={ProgressBarControl.defaultProps.Colors.Purple}
								percentage={this._prog_bar_value} />

						</div>

						<div className="ani-card-text-block">
							<div>This progress indicator can be in two scenarios, with a specific increment value or with out.</div>
							<div className="prog-bar-controls">
								<button className="prog-bar-btn" onClick={this.OnClick_TestProgressBar.bind( this )}>{this._prog_bar_tbn_text}</button>
								<span className="prog-bar-value">{this._prog_bar_value}</span>
							</div>
	
						</div>

					</div>

					{ /* PLACEHOLDERS 
						<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">control</div>
						<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time.</div>
						</div>
					 */}

					{ /* DEFINITE PROGRESS PIE
					 * 
					 * 
					 * 							<ProgressPieControl
								color={ProgressPieControl.defaultProps.Colors.Red}
								value={ this._prog_pie_value } />
					 * 
					 * */ }
					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<ProgressPieControl
								color={ProgressPieControl.defaultProps.Colors.Red}
								value={ this.state.ProgPieStep } />
						</div>
						<div className="ani-card-text-block">This is an example of progress indicator that display a numeric value as it changes, and is displayed or hidden for a specific length of time.
							<div className="prog-bar-controls-2">
								<label htmlFor="prog_pie_step">Step test: {this.state.ProgPieStep}</label>
								<input type="range"
									id="prog_pie_step" name="prog_pie_step"
									className="input-range-demo"
									min="0" max="100" step="1" value={this.state.ProgPieStep}
									onChange={ this.OnChange_StepProgPie.bind(this) }/>
							</div>
							<div className="prog-bar-controls-2">
								<label htmlFor="prog_pie_speed">Speed (between 50ms and 1000ms)</label>
								<input type="range"
									id="prog_pie_speed" name="prog_pie_speed"
									className="input-range-demo"
									min="0" max="1000" step="50" value={this.state.ProgPieSpeed}
									onChange={ this.OnChange_ChangeProgPieSpeed.bind(this) }/>
							</div>
							<div className="prog-bar-controls">
								<button className="prog-bar-btn" onClick={this.OnClick_TestProgressPie.bind( this )}>{this._prog_pie_btn_text}</button>
							</div>							
							<div className="prog-bar-controls">
								<span className="prog-bar-value">speed: {this.state.ProgPieSpeed}, count: {this._prog_pie_value}</span>
							</div>
						</div>
					</div>


					{ /* END */}
				</div>

			</div>
        );
    }
};
