import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';
import './music.css';
import SVG from '../../art/svgs.js';

export default class Music extends React.Component
{
	static contextType = ThemeContext;
	static defaultProps = {
		Title: "Music from Sean Gephardt",
		LinkTitle: "Music",
		Href: "/music/",
		Icon: SVG.AppNavButtons.Music
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || Music.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Music.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Music.defaultProps.Href );
		document.title = this.Title;

		return;
	};
	render()
	{	//	console.debug( "AboutExtension.render()", this.Title );	
		//	add voy - https://villainsofyesterday.bandcamp.com/

		//let _border_style = {
		//	boxShadow: "0px 0px 20px 0px " + this.context.Theme.Background,
		//};

		return (
			<div className="page-main">

				{/* BEGIN The Drive Through */}
				<div className="page-block">

					<div className="tdt-svg-logo-panel">
						<a href="http://thedrivethrough.com" className="tdt-link">
						<svg xmlns="http://www.w3.org/2000/svg" className="tdt-svg-logo"
						 viewBox="0 0 1000 500" imageRendering="optimizeQuality" shapeRendering="geometricPrecision">
						<rect className="tdt-svg-green-bg" x="0" y="0"  width="1000px" height="500px" rx="20"></rect>
						<rect fill="rgba(255,255,255,0)" x="20" y="20"  width="960px" height="460px" rx="2" strokeWidth="14px" stroke="rgba(255,255,255,1)"></rect>

						<text fontSize="128px" y="220">
							<tspan x="64">T</tspan>
							<tspan x="128">h</tspan>
							<tspan x="190">e</tspan>
						</text>

						<text fontSize="280px" y="260">
							<tspan x="236">D</tspan>
							<tspan x="390">r</tspan>
							<tspan x="484">i</tspan>
							<tspan x="536">v</tspan>
							<tspan x="654">e</tspan>
						</text>

						<text fontSize="280px" y="408">
							<tspan x="60">T</tspan>
							<tspan x="200">h</tspan>
							<tspan x="324">r</tspan>
							<tspan x="414">o</tspan>
							<tspan x="530">u</tspan>
							<tspan x="662">g</tspan>
							<tspan x="776">h</tspan>
						</text>
							</svg>
						</a>
					</div>

					<div className="marg-top-10">Music has been my passion since I was young, and my current project, "The Drive Through" has recorded a few songs available via bandcamp.com. Take a few minutes and give them a listen, we really hope that you'll enjoy our brand of 'Americana Pop Rock'! You can find us via <a href="https://www.facebook.com/TheDriveThroughBand/" title="The Drive Through on FaceBook">FaceBook</a> and <a href="https://www.instagram.com/thedrivethroughband/"  title="The Drive Through on Instagram">Instgram</a>, as well as <a href="https://thedrivethrough.bandcamp.com/"  title="The Drive Through on BandCamp">BandCamp</a> and <a href="http://thedrivethrough.com/"  title="http://thedrivethrough.com/">our own web site</a>.</div>

					<div className="music-block-list marg-top-10 ">
						<iframe className="bc-frame" title="Alone by The Drive Through" src="https://bandcamp.com/EmbeddedPlayer/track=509448573/size=large/bgcol=333333/linkcol=2ebd35/tracklist=false/transparent=true/" seamless>
							<a href="http://thedrivethrough.bandcamp.com/track/alone" title="Alone by The Drive Through" >Alone by The Drive Through</a>
						</iframe>
						<iframe className="bc-frame" title="It&#39;s Hard by The Drive Through" src="https://bandcamp.com/EmbeddedPlayer/track=4278936184/size=large/bgcol=333333/linkcol=2ebd35/tracklist=false/transparent=true/" seamless >
							<a href="http://thedrivethrough.bandcamp.com/track/its-hard" title="It&#39;s Hard by The Drive Through" >It&#39;s Hard by The Drive Through</a>
						</iframe>
						<iframe className="bc-frame" title="Temporary by The Drive Through" src="https://bandcamp.com/EmbeddedPlayer/track=3084652086/size=large/bgcol=333333/linkcol=2ebd35/tracklist=false/transparent=true/" seamless>
							<a href="http://thedrivethrough.bandcamp.com/track/temporary" title="Temporary by The Drive Through" >Temporary by The Drive Through</a>
						</iframe>
					</div>

				</div>
				{/* END The Drive Through */}

				{/* BEGIN Villains Of Yesterday */}
				<div className="page-block">

					<div className="tdt-svg-logo-panel marg-top-10">
						<svg xmlns="http://www.w3.org/2000/svg" className="voy-svg-logo"
							viewBox="0 0 1000 360" imageRendering="optimizeQuality" shapeRendering="geometricPrecision">
							<filter xmlns="http://www.w3.org/2000/svg" id="dropshadow" height="120%">
							  <feGaussianBlur in="SourceAlpha" stdDeviation="2"/> 
							  <feOffset dx="6" dy="10" result="offsetblur"/>
							  <feComponentTransfer>
								<feFuncA type="linear" slope="0.2"/>
							  </feComponentTransfer>
							  <feMerge> 
								<feMergeNode/>
								<feMergeNode in="SourceGraphic"/> 
							  </feMerge>
							</filter>

							<rect className="voy-bg" x="0" y="0"  width="1000px" height="360px" rx="4"></rect>

							<g transform="translate(100,140)" filter="url(#dropshadow)">
								<text fontSize="128px">
									<tspan x="0">V</tspan>
									<tspan x="110">I</tspan>
									<tspan x="180">L</tspan>
									<tspan x="280">L</tspan>
									<tspan x="360">A</tspan>
									<tspan x="480">I</tspan>
									<tspan x="562">N</tspan>
									<tspan x="680">S</tspan>
								</text>
							</g>

							<g transform="translate(400,220)" filter="url(#dropshadow)">
								<text fontSize="64px">
									<tspan x="0">O</tspan>
									<tspan x="62">F</tspan>
								</text>
							</g>

							<g transform="translate(30,330)" filter="url(#dropshadow)">
								<text fontSize="128px">
									<tspan x="0">Y</tspan>
									<tspan x="100">E</tspan>
									<tspan x="210">S</tspan>
									<tspan x="310">T</tspan>
									<tspan x="400">E</tspan>
									<tspan x="510">R</tspan>
									<tspan x="620">D</tspan>
									<tspan x="740">A</tspan>
									<tspan x="840">Y</tspan>
								</text>
							</g>


							</svg>
					</div>

					<div className="marg-top-10">Villains Of Yesterday began in a dark studio in Seattle's Georgetown district in January of 2010. The band played about 100 gigs up and down the West Coast including the infamous Viper Room in Los Angeles. During the life of the group, we had the pleasure of sharing the stage with several amazing artists, including but not limited to REO Speedwagon, Michael Schenker Group, My Sister's Machine, Blackboard Jungle and Seattle Grunge Alumni Shawn Smith. The songwriting core of "VOY" made in the transition in 2018 to change the group name to "The Drive Through".</div>

					<div className="music-block-list marg-top-10 ">
						<iframe className="bc-frame" title="One by Villains Of Yesterday" src="https://bandcamp.com/EmbeddedPlayer/album=747801681/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="http://villainsofyesterday.bandcamp.com/album/one">One by Villains Of Yesterday</a></iframe>

						<iframe className="bc-frame" title="Zero In The Sun by Villains Of Yesterday" src="https://bandcamp.com/EmbeddedPlayer/album=1112045216/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="http://villainsofyesterday.bandcamp.com/album/zero-in-the-sun">Zero In The Sun by Villains Of Yesterday</a></iframe>

						<iframe  className="bc-frame" title="Dead Reckoning by Villains Of Yesterday" src="https://bandcamp.com/EmbeddedPlayer/album=2392563153/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="http://villainsofyesterday.bandcamp.com/album/dead-reckoning">Dead Reckoning by Villains Of Yesterday</a></iframe>

					</div>

				</div>
				{/* END Villains Of Yesterday */}

			</div>
		);
	};
};