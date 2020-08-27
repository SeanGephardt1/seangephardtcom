import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';

import './home.css';
import SVG from '../../art/svgs.js';

import SeanG from './sean.jpg';
import SeanGuitar from './sean-guitar-lucky.jpg';
//	import SeanGuitar2 from './sean-guitar-2.jpg';

import SeattleStarBucks from './seattle.jpg';

export default class Home extends React.Component
{
    static contextType = ThemeContext;
	static defaultProps = {
		Title: "Sean Gephardt",
		LinkTitle: "Sean Gephardt",
		Href: "/",
		Icon: SVG.AppNavButtons.About
	};
    constructor( props )
    {
        super( props );
        this.state = {};

		this.Title = ( this.props.Title || Home.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Home.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Home.defaultProps.Href );

		document.title = this.Title;

		return;
    };
    render()
    {	//  console.debug( "Home.render", this.context.theme);
        let _style = {
			//backgroundColor: this.context.Theme.Background,
			//color: this.context.Theme.Foreground
		};
        return (
			<div className="page-main" style={_style}>
				<div className="page-block">
					<div className="page-block-col-left">
						<img src={SeanG} className="sean-guitar-pic" title="Sean Gephardt" alt="Sean Gephardt"/>
					</div>
					<div className="page-block-col-right">
						<div className="steal-quotes">"There is no 'I' in 'team'" -  Anonymous</div>
						<article className="about-me">There is one phrase that can summarize my philosophy in a nut shell, that would have to be "passion". I bring this to everything I'm involved in, from software design and development to my musical and artistic projects. If something is worth spending time on, it's worth it to give 110% of your effort. The human race has survived all this time utilizing collaboration, and without that sense of teamwork and companionship, it's my opinion that a person isn't realizing thier full potential. 
						</article>
						<article className="about-me">I have been fortunate to have worked at Microsoft throughout most of my career, and have seen the software industry grow beyond everyone's wildest dreams. Technology as a mechanism for progress has given companies the ability to build products that not only streamline the processes and routines of business, but also strive for solving large scale humanitarian issues. It has also given individuals the power to create & share content by the simple press of a button, from just about anywhere in the world and beyond.
						</article>
					</div>
				</div>
				<div className="page-block">
					<div className="page-block-col-left">
						<img src={SeattleStarBucks} className="sean-guitar-pic" title="First Avenue South, Seattle" alt="First Avenue South, Seattle"/>
					</div>
					<div className="page-block-col-right">
						<article className="about-me">Seattle and the Pacific Northwest is where I call home, and I truly admire the beauty of it's environment, from the jagged coastlines and to rugged mountain scapes, from it's rural plateaus to the ultra-modern city scapes. I find it to be a wonderful cornucopia of progressive ideals, common sense practicalities and a fanastic representation of the "Melting Pot" ideal that makes my country so strong. I've had the chance to meet people from literally every corner of the world, and I'm blessed to call some of these people my close friends. 
						</article>
					</div>
				</div>
				<div className="page-block">
					<div className="page-block-col-left">
						<img src={SeanGuitar} className="sean-guitar-pic" title="Sean Gephardt playing guitar" alt="Sean Gephardt playing guitar" />
					</div>
					<div className="page-block-col-right">
						<div className="steal-quotes">"Take your work seriously, but don't take yourself seriously” - Clint Eastwood</div>
						<article className="about-me">Music is one of my core personal passions. I've been playing music since i was a child and it has afforded me both many lasting freindships and one-of-a-kind experiences. There is a specific chemistry that happens when playing music with a group of people, and everything is firing on all cylinders. Again this is reliant on teamwork, and something I require in each artistic project I take part in.
						</article>
					</div>
				</div>
			</div>
        );
    }
};
