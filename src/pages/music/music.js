import React from 'react';
import './music.css';
//	import SVG from '../../art/svgs.js';

export default class MusicPage extends React.Component
{
  static defaultProps = {
    Title: "Music from Sean Gephardt",
    LinkTitle: "Music",
    Href: "/music",
    Icon: ""//SVG.AppNavButtons.Music
  };
  constructor ( props )
  {
    super( props );

    this.Title = ( this.props.Title || this.defaultProps.Title );
    this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
    this.Href = ( this.props.Href || this.defaultProps.Href );
    document.title = this.Title;

    return;
  };
  render()
  {
    return (
      <div className="page-layout padding30 centered1024">

        {/* BEGIN The Drive Through */ }

        <div className="bd-page-title">The Drive Through</div>
        <div className="music-text-block">Music has been my passion since I was young, and my current project, "The Drive Through" has recorded a few songs available via bandcamp.com. Take a few minutes and give them a listen, we really hope that you'll enjoy our brand of 'Americana Pop Rock'! You can find us via <a href="https://www.facebook.com/TheDriveThroughBand/" title="The Drive Through on FaceBook">FaceBook</a> and <a href="https://www.instagram.com/thedrivethroughband/" title="The Drive Through on Instagram">Instgram</a>, as well as <a href="https://thedrivethrough.bandcamp.com/" title="The Drive Through on BandCamp">BandCamp</a> and <a href="http://thedrivethrough.com/" title="http://thedrivethrough.com/">our own web site</a>.</div>

        <div className="music-logo-block">

          <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 1000 460" >

            <g id="Sign_Background">
              <rect width="1000" height="460" className="tdt-bk" rx="20" />
              <path className="tdt-sign" d="M976.9,451.6H22.6c-6.9,0-12.5-5.6-12.5-12.5V23.6c0-6.9,5.6-12.5,12.5-12.5h954.3c6.9,0,12.5,5.6,12.5,12.5
							v415.5C989.3,446,983.8,451.6,976.9,451.6z"/>
            </g>
            <g id="Through">
              <path className="tdt-text" d="M857.6,176.8v66.6c12.5-9,25.8-13.2,39.8-12.3c14,0.8,25.8,6.2,35.7,16.2c9.9,10.1,14.7,25.8,14.7,47.5v89.6
							h-38.6v-90.8c-0.2-6.3-2.7-12.1-7.4-17.4c-4.7-5.3-10.9-7.9-18.6-7.9c-7.7,0-13.9,2.5-18.6,7.4c-4.7,4.9-7.1,10.7-7.1,17.4v91.4
							h-39.2l-0.3-188.1L857.6,176.8z"/>
              <path className="tdt-text" d="M777.7,234.6h39v130.3c0,26.3-5,44.5-15,54.6c-10.1,10.1-26.4,16.4-49.2,19.1l-14.2-30.6
							c13.4-1.1,23.3-4,29.8-8.5s9.8-13.1,9.8-25.7c-9.9,8.6-21.4,13.1-34.7,13.3c-13.4,0.2-25.7-6.1-37.1-18.9
							c-11.4-12.7-17.3-32.2-17.7-58.1c-0.4-25.9,5.2-45.8,16.8-59.5c11.6-13.8,25.4-20.4,41.3-19.7c15.9,0.6,26.4,4.6,31.6,12.1v-8.3
							H777.7z M777.7,336.6v-56c-9-8.6-17.4-12.7-25.1-12.3c-7.7,0.4-13.7,3.7-18,10.1c-4.3,6.3-6.6,15.8-6.8,28.6
							c-0.2,12.7,2.2,23.2,7.1,31.2c4.9,8,11.6,12,20,11.8C763.4,349.6,771,345.2,777.7,336.6z"/>
              <path className="tdt-text" d="M558.9,234.6h39v83.2c0,9.9,1.7,17.6,5.3,23.3c3.5,5.7,9.8,8.4,18.6,8.2s15.4-3.2,19.7-8.8
							c4.3-5.7,6.5-14.3,6.5-25.7v-80.2h39v149.8h-39v-10.6c-12.2,8.6-24.5,13.1-36.9,13.3s-24.2-4.2-35.4-13.3
							c-11.2-9-16.8-26.9-16.8-53.7L558.9,234.6L558.9,234.6z"/>
              <path className="tdt-text" d="M557,309.4c0,26.3-6.7,45.8-20,58.7c-13.4,12.7-29.3,19-47.8,18.6c-18.5-0.4-34-7.7-46.6-21.8
							c-12.5-14.2-19-33.3-19.1-57.5s6.2-43,19.1-56.3c13-13.4,28.3-20.1,45.9-20.4c17.7-0.2,33.5,6,47.5,18.6
							C550,261.9,557,281.9,557,309.4z M517.5,309.4c0-12.5-2.4-22.3-7.1-29.2s-11.3-10.4-19.7-10.6s-15.2,3.1-20.4,9.8
							c-5.1,6.7-7.7,16.2-7.7,28.6c0,12.4,2.4,22.2,7.1,29.5s11.3,11,19.7,11.2s15.2-3.6,20.4-11.5C514.9,329.3,517.5,320,517.5,309.4z"
              />
              <path className="tdt-text" d="M339.4,384.3V234.6h39v10c8.2-8.6,18-13.1,29.2-13.3c11.2-0.2,21,3.1,29.2,9.8l-11.3,38.9
							c-8.2-6.3-16.1-9.2-23.5-8.8c-7.5,0.4-13.3,2.5-17.4,6.2c-4.1,3.7-6.2,9.4-6.2,16.8v90.2H339.4z"/>
              <path className="tdt-text" d="M247.3,176.8v66.6c12.5-9,25.8-13.2,39.8-12.3c14,0.8,25.8,6.2,35.7,16.2c9.9,10.1,14.7,25.8,14.7,47.5v89.6
							H299v-90.8c-0.2-6.3-2.7-12.1-7.4-17.4c-4.7-5.4-10.9-7.9-18.6-7.9s-13.9,2.5-18.6,7.4c-4.7,4.9-7.1,10.7-7.1,17.4v91.4h-39.2
							l-0.3-188.1L247.3,176.8z"/>
              <path className="tdt-text" d="M52.2,185.1h153.9v39.5h-57.2v159.7h-41.3V224.5H52.2V185.1z" />
            </g>
            <g id="Drive">
              <path className="tdt-text" d="M816.2,203.5c-29.6,30.8-82,33.2-108.6,2.1c-24.4-26-24.1-89.9,1.7-115.2c52-51.7,122.3-2.7,111.6,70.6h-91.6
							c0.4,5.2,2.7,11,6.9,17.3c9.3,14.3,40.4,14.8,51.2-0.6L816.2,203.5z M730.7,131.1h51.5c-2.8-14.5-9-26-25.7-26
							C739.6,104.2,733.3,116.9,730.7,131.1z"/>
              <path className="tdt-text" d="M558.3,73.7h45.5l30.2,98.8l30.5-98.8h43.7l-54.5,152.1h-41.3L558.3,73.7z" />
              <path className="tdt-text" d="M538.7,25.8c28.6-0.7,29.6,47.4,0.1,46.1C508.3,72.4,508.1,25.4,538.7,25.8z M518.3,73.7h39.5v152.1h-39.5
							V73.7z"/>
              <path className="tdt-text" d="M417.9,225.7V73.7h39.5v10.1c15.4-17.2,42.4-17.5,59.3-3.6l-11.4,39.5c-13.3-10.8-30.1-12.2-41.6-2.7
							c-12.5,7.5-3.9,96.2-6.3,108.6L417.9,225.7L417.9,225.7z"/>
              <path className="tdt-text" d="M255.1,23.4c75.1-2.1,163.9-6.1,161.5,98.5c1.2,106.5-85.4,106.7-161.6,103.8L255.1,23.4L255.1,23.4z
							 M295.1,63.5v122.7h32.4c29-2,49.3-27.5,48.4-62.2c2.6-33.7-18.7-57.9-44.8-60.5C331.1,63.5,295.1,63.5,295.1,63.5z"/>
            </g>
            <g id="The">
              <path className="tdt-text" d="M242.8,170.4c-7.9,7.6-16.8,11.3-26.4,11s-17.2-3.6-22.8-10.1c-5.6-6.4-8.2-15.1-8.1-26.1
							c0.1-11,3.1-19.7,9-26c5.8-6.3,13-9.5,21.2-9.5c8.3,0,15.5,3.3,21.5,10c6,6.7,8.6,17.1,7.8,31.5h-41.5c0.2,2.4,1.2,5,3.2,7.8
							c1.9,2.9,5.5,4.5,10.6,4.9c5.2,0.4,9.4-1.3,12.6-5.2L242.8,170.4z M204.1,137.6h23.4c-0.6-3.3-1.6-6-3.3-8.2
							c-1.7-2.3-4.5-3.4-8.2-3.5c-3.8-0.1-6.5,1.1-8.2,3.4C205.8,131.6,204.6,134.3,204.1,137.6z"/>
              <path className="tdt-text" d="M143.3,85v30.6c5.7-4.1,11.9-6,18.3-5.7c6.4,0.4,11.9,2.9,16.4,7.5c4.5,4.6,6.8,11.9,6.8,21.8v41.3h-17.8
							v-41.7c-0.1-2.9-1.2-5.6-3.4-8c-2.2-2.5-5-3.6-8.5-3.6s-6.4,1.1-8.5,3.3c-2.2,2.3-3.3,4.9-3.3,8v42h-18l-0.1-86.5L143.3,85z"/>
              <path className="tdt-text" d="M53.4,88.8h70.8V107H97.9v73.5h-19V107H53.4V88.8z" />
            </g>
          </svg>

        </div>


        <div className="music-block-list">

          <iframe className="bc-frame" title="Perfect Mistake by The Drive Through" src="https://bandcamp.com/EmbeddedPlayer/track=3407648147/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=none/transparent=true/" seamless loading="lazy">
            <a href="https://thedrivethrough.bandcamp.com/track/perfect-mistake">Perfect Mistake by The Drive Through</a>
          </iframe>

          <iframe className="bc-frame" title="Note To Self by The Drive Through" src="https://bandcamp.com/EmbeddedPlayer/track=1468740362/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=none/transparent=true/" seamless loading="lazy">
            <a href="https://thedrivethrough.bandcamp.com/track/note-to-self">Note To Self by The Drive Through</a>
          </iframe>

          <iframe className="bc-frame" title="Alone by The Drive Through" src="https://bandcamp.com/EmbeddedPlayer/track=509448573/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless loading="lazy">
            <a href="http://thedrivethrough.bandcamp.com/track/alone">Alone by The Drive Through</a>
          </iframe>

          <iframe className="bc-frame" title="Alone by The Drive Through" src="https://bandcamp.com/EmbeddedPlayer/track=4278936184/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless loading="lazy">
            <a href="http://thedrivethrough.bandcamp.com/track/its-hard" title="It&#39;s Hard by The Drive Through" >It&#39;s Hard by The Drive Through</a>
          </iframe>

          <iframe className="bc-frame" title="Alone by The Drive Through" src="https://bandcamp.com/EmbeddedPlayer/track=3084652086/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless loading="lazy">
            <a href="http://thedrivethrough.bandcamp.com/track/temporary" title="Temporary by The Drive Through" >Temporary by The Drive Through</a>
          </iframe>

        </div>

        {/* END The Drive Through */ }

        {/* BEGIN Villains Of Yesterday */ }

        <div className="bd-page-title">Villains Of Yesterday</div>

        <div className="music-text-block">Villains Of Yesterday began in a dark studio in Seattle's Georgetown district in January of 2010. The band played about 100 gigs up and down the West Coast including the infamous Viper Room in Los Angeles. During the life of the group, we had the pleasure of sharing the stage with several amazing artists, including but not limited to REO Speedwagon, Michael Schenker Group, My Sister's Machine, Blackboard Jungle and Seattle Grunge Alumni Shawn Smith. The songwriting core of "VOY" made in the transition in 2018 to change the group name to "The Drive Through".</div>

        <div className="music-block-list">

          <iframe className="bc-frame-2" title="One by Villains Of Yesterday" src="https://bandcamp.com/EmbeddedPlayer/album=747801681/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless loading="lazy"><a href="http://villainsofyesterday.bandcamp.com/album/one">One by Villains Of Yesterday</a></iframe>

          <iframe className="bc-frame-2" title="Zero In The Sun by Villains Of Yesterday" src="https://bandcamp.com/EmbeddedPlayer/album=1112045216/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless loading="lazy"><a href="http://villainsofyesterday.bandcamp.com/album/zero-in-the-sun">Zero In The Sun by Villains Of Yesterday</a></iframe>

          <iframe className="bc-frame-2" title="Dead Reckoning by Villains Of Yesterday" src="https://bandcamp.com/EmbeddedPlayer/album=2392563153/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless loading="lazy"><a href="http://villainsofyesterday.bandcamp.com/album/dead-reckoning">Dead Reckoning by Villains Of Yesterday</a></iframe>

        </div>
        {/* END Villains Of Yesterday */ }

      </div>
    );
  };
};