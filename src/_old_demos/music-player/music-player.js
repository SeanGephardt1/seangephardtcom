// https://github.com/mdn/webaudio-examples

import React from 'react';
import WavCanvasComponent from '../../controls/canvas-wav/canvas-wav.js';
import VizCanvasComponent from '../../controls/canvas-viz/canvas-viz.js';
import './music-player.css';
import Hell from './mp3/hell-high-water.mp3';
import Love from './mp3/love-song.mp3';
import AllRight from './mp3/all-right.mp3';

export class MusicPlayerExtension extends React.Component
{
	static defaultProps = {
		Title: "Web Audio API demo",
		LinkTitle: "Music player demo",
		Href: "/music-player/"
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || MusicPlayerExtension.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || MusicPlayerExtension.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || MusicPlayerExtension.defaultProps.Href );

		this.Tracks = [
			{ songname: "Hell or High Water", band: "Villains Of Yesterday", file: Hell },
			{ songname: "Love Song", band: "Villains Of Yesterday", file: Love },
			{ songname: "It's All Right", band: "Villains Of Yesterday", file: AllRight },
		];

		this.state = {
			selectedTrackValue: 0,
			currentTrack: this.Tracks[0].file,
			moreGainValue: 0.0,
			panningValue: 0,
			mounted: false
		};

		this.CurrentAudioFile = this.Tracks[0].file;
		return;
	};
	OnChange_Select_Track( se )
	{
		console.debug( "OnChange_Select_Track", se.target.value, this.Tracks );
		this.setState( {
			selectedTrackValue: se.target.value,
			currentTrack: this.Tracks[se.target.value].file
		} );
		return;
	};
	OnChange_AdjustGain( se )
	{	// console.debug( "OnChange_AdjustGain", se.target.value );
		this.setState( {
			moreGainValue: se.target.value
		} );
		return;
	};
	OnChange_AdjustPanning( se )
	{	//	console.debug( "OnChange_AdjustPanning", se.target.value );
		this.setState( {	panningValue: se.target.value } );
		return;
	};
	render()
	{	//	console.debug( "MusicPlayerExtension.render()" );	
		return (
			<div className="page-main">
				<div className="page-block flex-column-spacer">
					<h1 className="this-demo">Web audio API demo</h1>

					{/* controls panel */}
					<div className="page-block-col-left">

						{/* song selection */}
						<div className="audio-tweaks-box">
							<div >Select a song from the list below</div>
							<div>
								<select className="music-list-select" name="song-list"
							onChange={this.OnChange_Select_Track.bind( this )}
							value={this.state.selectedTrackValue}>
							{
								this.Tracks.map( ( item, index ) => (
									<option key={index} value={index}>{item.songname} by {item.band}</option>
								))
							}
								</select>
							</div>
						</div>

						{/* gain tweaks */}
						<div className="audio-tweaks-box">
							<div >Adjust the overall gain: {this.state.moreGainValue}</div>
							<div>
								<input type="range" id="more-gain" name="more-gain"
								min="-1" max="1" step="0.1" defaultValue={this.state.moreGainValue}
								onChange={this.OnChange_AdjustGain.bind(this)}
								/>
							</div>
						</div>

						{/* panning */}
						<div className="audio-tweaks-box">
							<div>Adjust the panning from left to right: {this.state.panningValue}</div>
							<div>
								<input type="range" id="panning-input" name="panning-input"
								min="-90" max="90" step="5" defaultValue={this.state.panningValue}
								onChange={this.OnChange_AdjustPanning.bind(this)}
								/>
							</div>
						</div>

					</div>

					{/* audio & video elements */}
					<div className="page-block-col-right">

						{/* audio player */}
						<div className="audio-player-panel ">
							<audio controls
							autoPlay={this.state.IsPlaying}
							loop={false}
							className="audio-player-element"
								src={this.state.currentTrack} />
						</div>

						{/* WAV format */}
						<div className="audio-tweaks-box">
							<div>Canvas WAV form visualization</div>
							<div>
								<WavCanvasComponent line={this.state.moreGainValue} />
							</div>
						</div>

						{/* visualization */}
						<div className="audio-tweaks-box">
							<div>Canvas Countdown visualization</div>
							<div>
								<VizCanvasComponent Iterations={7} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
};