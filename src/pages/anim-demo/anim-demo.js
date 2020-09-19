import React from 'react';
import SVG from '../../art/svgs.js';
import './anim-demo.css';
import ProgressSpinnerControl from './prog-spinner.js';
import ProgressBarControl from './prog-bar.js';


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

		this._prog_bar_btn_clicked = false;
		this._prog_bar_tbn_text = this._start_text;
		this._prog_bar_value = 0;
		this._prog_bar_interval_handler = undefined;

		this.state = {
			ProgBarButtonRunning: false
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
    render()
	{
		//	console.debug( "render", this.state.ProgBarStatus );

        return (
			<div className="anim-demo-layout">

				<div className="anim-demo-header">Animations</div>
				<div className="anim-demo-sub-header">Progress Indicators</div>

				<div className="anim-demo-desc">Customers will need to know that something could take longer than expected and that it will eventually be displayed. Progress indicators allow for these types of scenarios and help set customer expectations that the app is 'doing work'.</div>

				<div className="anim-demo-block-panel">

					{ /* "FINISHED CONTROLS" */}

					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<ProgressSpinnerControl size={ProgressSpinnerControl.defaultProps.Sizes.ExtraLarge} />
							<div className="margin-bottom-10"></div>
							<ProgressBarControl
								color={ProgressBarControl.defaultProps.Colors.Green}
								loop={true} />

						</div>
							<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time. </div>
					</div>

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

							<ProgressBarControl color={ProgressBarControl.defaultProps.Colors.Blue} speed={ 2500 } />
							<div className="margin-bottom-10"></div>

							<ProgressBarControl
								color={ProgressBarControl.defaultProps.Colors.Purple}
								percentage={this._prog_bar_value} />

						</div>

						<div className="ani-card-text-block">
							<div>This progress indicator can be used with a specific increment value.</div>
							<div className="prog-bar-controls">
								<button className="prog-bar-btn" onClick={this.OnClick_TestProgressBar.bind( this )}>{this._prog_bar_tbn_text}</button>
								<span className="prog-bar-value">{this._prog_bar_value}</span>
							</div>
	
						</div>

					</div>

					{ /* PLACEHOLDERS */}

					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">control</div>
						<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time.</div>
					</div>

					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">control</div>
						<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time.</div>
					</div>

					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">control</div>
						<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time.</div>
					</div>




					{ /* END */}
				</div>

			</div>
        );
    }
};
