import React from 'react';
import SVG from '../../art/svgs.js';
import './anim-demo.css';
import ProgressSpinnerControl from './progress-spinner.js';

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
		this.state = {};

		document.title = this.Title;

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
						<ProgressSpinnerControl size={ProgressSpinnerControl.defaultProps.Sizes.ExtraLarge} />
					</div>

				</div>


			</div>
        );
    }
};
