import React from 'react';
import FrequencyPlayer from '../../controls/audio/freq-player.js';
import './audio-toys.css';

export default class AudioToysDemoPage extends React.Component
{
  static defaultProps = {
    Title: "Audio Toys",
    LinkTitle: "Audio Toys",
    Href: "portfolio/audio-toys",
    Icon: "",
  };
  constructor ( props )
  {
    super( props );
    document.title = this.props.Title;

    //  Frequency	Scientific - string, pitch, notation
    //  1( E )	329.63 Hz	E4
    //  2( B )	246.94 Hz	B3
    //  3( G )	196.00 Hz	G3
    //  4( D )	146.83 Hz	D3
    //  5( A )	110.00 Hz	A2
    //  6( E )	82.41 Hz	E2

    //this._freq_tone_list = [
    //  { name: "E4", value: 329.63 },
    //  { name: "B3", value: 246.94 },
    //  { name: "G3", value: 196.00 },
    //  { name: "D3", value: 148.83 },
    //  { name: "A2", value: 110.00 },
    //  { name: "E2", value: 82.41 },
    //];
    //this._oscillator_types = [ 'square', 'triangle' ];

    //this._default_context_options = {
    //  latencyHint: 0, // 0.147 , 0.294 -- "interactive", // "balanced", "playback"
    //  sampleRate: 3000, // max == 768000
    //};
    //this._audio_context = undefined; // new AudioContext( this._default_context_options );
    //this._oscillator = undefined;
    //this._gainNode = undefined; // audioCtx.createGain();

    //this.state = {
    //  debug: true,
    //  isPlaying: false,
    //  currentPitch: this._freq_tone_list[ 4 ]
    //};
    return;
  };
  //Init_AudioContext()
  //{ //  console.debug( 'Init_AudioContext', this.state.currentPitch.value );
  //  //this._audio_context = new AudioContext( this._default_context_options );
  //  //this._oscillator = this._audio_context.createOscillator();
  //  //this._oscillator.type = 'square';
  //  //this._oscillator.frequency.value = 100;
  //  //this._oscillator.frequency.setValueAtTime( this.state.currentPitch, this._audio_context.currentTime );
  //  //this._gainNode = this._audio_context.createGain();
  //  //  //  this._oscillator.connect( this._audio_context.destination );
  //  //this._oscillator.connect( this._gainNode );
  //  //this._gainNode.connect( this._audio_context.destination );
  //  return;
  //};
  //OnClick_PlayTone( ev )
  //{ //  console.debug( 'OnClick_PlayTone', this._audio_context, this.state );

  //  this._audio_context = new AudioContext( this._default_context_options );

  //  this._oscillator = this._audio_context.createOscillator();
  //  this._oscillator.type = 'square';
  //  this._oscillator.frequency.value = 100;
  //  this._oscillator.frequency.setValueAtTime( parseFloat(this.state.currentPitch.value), this._audio_context.currentTime );

  //  this._gainNode = this._audio_context.createGain();

  //  this._oscillator.connect( this._gainNode );
  //  this._gainNode.connect( this._audio_context.destination );

  //  this._oscillator.start();

  //  this.setState( { isPlaying: true } );
  //  return;
  //};
  //OnClick_StopTone( ev )
  //{ //  console.debug( 'OnClick_StopTone', this.state, this._audio_context );
  //  if ( this._audio_context !== undefined )
  //  {
  //    this._oscillator.stop();
  //    this.setState( { isPlaying: false } );
  //  }
  //  return;
  //};
  //OnChange_SelectFrequencyTone( ev )
  //{ //  console.debug( 'OnChange_SelectFrequencyTone', this._audio_context, this.state.currentPitch, ev.target.value, ev.target.selectedIndex, this._freq_tone_list[ ev.target.selectedIndex ] );

  //  if ( this._audio_context !== undefined )
  //  {
  //    this._oscillator.frequency.setValueAtTime( parseFloat( ev.target.value ), this._audio_context.currentTime );
  //    //   console.debug( 'OnChange_SelectFrequencyTone', this._audio_context );
  //    this.setState( {
  //      currentPitch: this._freq_tone_list[ ev.target.selectedIndex ]
  //    } );
  //  }
  //  else
  //  {
  //    this.setState( {
  //      currentPitch: this._freq_tone_list[ ev.target.selectedIndex ]
  //    } );
  //  }
  //  return;
  //}

  /* REACT LIFECYCLE */
  componentDidMount()
  {	//  console.debug( "componentDidMount()" );
    return;
  }
  componentDidUpdate()
  { //  console.debug( "componentDidUpdate()" );
    return;
  };
  componentWillUnmount()
  { //  console.debug( "componentWillUnmount()" );
    return;
  };
  render()
  {
    return (
      <div className="page-layout padding30">
        <div className="centered header">{ this.props.Title }</div>
        <FrequencyPlayer />
      </div>
    );
  }
};