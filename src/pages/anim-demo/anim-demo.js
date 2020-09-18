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

		this._start_text = "Start";
		this._pause_text = "Pause";
		this._stop_text = "Stop";

		this.state = {

			ProgBarButtonText: this._start_text
		};

		document.title = this.Title;

		return;
	};
	OnClick_TestProgressBar( ev )
	{
		console.debug( "OnClick_TestProgressBar" );
		return;
	};
    render()
    {
        return (
			<div className="anim-demo-layout">

				<div className="anim-demo-header">Animations</div>
				<div className="anim-demo-sub-header">Progress Indicators</div>

				<div className="anim-demo-desc">Customers will need to know that something could take longer than expected and that it will eventually be displayed. Progress indicators allow for these types of scenarios and help set customer expectations that the app is 'doing work'.</div>

				<div className="anim-demo-block-panel">

					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">control</div>
						<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time.</div>
					</div>

					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<ProgressSpinnerControl size={ProgressSpinnerControl.defaultProps.Sizes.ExtraLarge} />
						</div>
							<div className="ani-card-text-block">This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. it can be hidden at any time. </div>
					</div>

					<div className="ani-demo-card-1">
						<div className="ani-card-ctrl-block">
							<div className="flex-bottom">
								<ProgressBarControl color={ProgressBarControl.defaultProps.Colors.Orange} />
							</div>
						</div>
						<div className="ani-card-text-block">
							This is an example of what is called an "indefinite" progress indicator, meaning that ti it is displayed for an indefinite amount of time. 
							<button className="prog-bar-btn" onClick={this.OnClick_TestProgressBar.bind( this )}>{this.state.ProgBarButtonText}</button>
						</div>
					</div>


				</div>

			</div>
        );
    }
};
