import React from 'react';
import { AppAudioPageContext } from './audio-context.js';
import
  {
    GuitarTunerTones,
    BassGuitarTunerTones,
    Oscillators
  } from './freq-data.js';
import './audio.css';

export default class TunersControl extends React.Component
{
  static contextType = AppAudioPageContext;
  static defaultProps = {
    Title: "Guitar & Bass Tuners",
    LinkTitle: "Guitar & Bass Tuners",
    Href: "portfolio/tuners",
    Description: "Easy to use standard tuners for guitar & bass.",
    Icon: "",
  };
  constructor ( props )
  {
    super( props );

    this._guitar_tone_list = GuitarTunerTones;
    this._bass_guitar_tone_list = BassGuitarTunerTones;
    this._play_times = [ 1, 2, 3, 4, 5 ];

    this._default_context_options = {
      latencyHint: 0, // 0.147 , 0.294 -- "interactive", // "balanced", "playback"
      sampleRate: 3000, // max == 768000
    };
    this._audio_context = undefined; // new AudioContext( this._default_context_options );
    this._oscillator = undefined;
    this._gainNode = undefined; // audioCtx.createGain();

    this.state = {
      currentOscillatorType: Oscillators.Triangle,
      currentPlaytime: this._play_times[0],
      isPlaying: false,
      currentPitch: undefined,
    };
    return;
  };

  // SELECT FUNCTION FOR CHANGING OSCILLATOR TYPES
  OnChange_Select_ChangeOscillatorType( ev )
  { //  console.debug( 'OnChange_Select_ChangeOscillatorType', ev.target.value, this._oscillator);
    this.setState( {
      currentOscillatorType: ev.target.value
    } );
    return;
  };
  OnChange_Select_ChangePlaybackTime( ev )
  { //  console.debug( 'OnChange_Select_ChangePlaybackTime', ev.target.value );
    this.setState( { currentPlaytime: parseInt( ev.target.value ) } );
    return;
  };

  // GUITAR TUNER BUTTONS
  OnClick_PlaySingleTone( toneArray, ev )
  { //  console.debug( 'OnClick_PlaySingleTone', ev.target.value, toneArray );
    const _self = this;
    let _pitch = toneArray[ ev.target.value ];
    //  console.debug( '_pitch', _pitch );

    this._audio_context = new AudioContext( this._default_context_options );
    this._oscillator = this._audio_context.createOscillator();
    this._oscillator.type = this.state.currentOscillatorType;
    this._oscillator.frequency.value = 100;
    this._oscillator.frequency.setValueAtTime( parseFloat( _pitch.value ), this._audio_context.currentTime );

    this._gainNode = this._audio_context.createGain();

    this._oscillator.connect( this._gainNode );
    this._gainNode.connect( this._audio_context.destination );

    this._oscillator.start();

    this.context.TogglePlaying();
    this.setState( {
      currentPitch: _pitch,
      isPlaying: this.context.isAudioPlaying
    } );

    window.setTimeout( () =>
    { //  console.debug( "PLAYBACK TIMEOUT", _self.context );
      _self.context.TogglePlaying();
      _self._oscillator.stop();
      _self.setState( {
        currentPitch: undefined,
        isPlaying: false
      } );
      return;
    }, this.state.currentPlaytime * 1000 , _self );
    return;
  };

  componentDidMount()
  {	//	console.debug( "componentDidMount()");
    return;
  }
  componentWillUnmount()
  {	//	console.debug( "componentWillUnmount()", this._audio_context );
    if ( this._audio_context !== undefined )
    {
      this._audio_context.close();
    }
    return;
  };
  render()
  { //  console.debug( 'TunersControl.render()', this.context.isAudioPlaying );
    return (
      <div className="tuner-panel">
        <div className="tuner-panel-header">{ this.props.Title }</div>
        <div className="tuner-panel-sub-header">{ this.props.Description }</div>

        <div className="tuner-panel-sub-header">Select from the list of oscillator types available in your browser, and select the length of time in seconds to play a pitch.</div>
        <div className="tuner-panel-layout">
          <select
            tabIndex="0"
            title="Select from the list of oscillator types."
            className="select-pitch-range"
            defaultValue={ this.state.currentOscillatorType }
            onChange={ this.OnChange_Select_ChangeOscillatorType.bind( this ) }
            disabled={ this.context.isAudioPlaying }>
            {
              Object.entries( Oscillators ).map( ( [ key, val ] ) =>
                <option key={ key } title={ key } value={ val }>{ key }</option>
              ) 
            }
          </select>
          <select
            tabIndex="0"
            title="Select from the list of oscillator types."
            className="select-pitch-range"
            defaultValue={ this._play_times[ 0 ] }
            onChange={ this.OnChange_Select_ChangePlaybackTime.bind( this ) }
            disabled={ this.context.isAudioPlaying }>
            {
              this._play_times.map( ( item, idx ) => (
                <option key={ idx } title={ item } value={ item }>{ item } { item === 1 ? 'second' : 'seconds' }</option>
              ) )
            }
          </select>
        </div>

        <div className="tuner-panel-sub-header">Select standard guitar tuning pitches</div>
        <div className="tuner-panel-layout">
          {
            this._guitar_tone_list.map( ( item, idx ) => (
              <button
                key={ idx }
                value={ idx }
                tabIndex="0"
                type="button"
                className="app-btn"
                title={ 'Play ' + item.name + item.octave }
                onClick={ this.OnClick_PlaySingleTone.bind( this, this._guitar_tone_list ) }
                onKeyPress={ this.OnClick_PlaySingleTone.bind( this, this._guitar_tone_list ) }
                disabled={ this.context.isAudioPlaying }>{ item.name }{ item.octave }</button>
            ) )
          }
        </div>

        <div className="tuner-panel-sub-header">Select standard bass guitar tuning pitches</div>
        <div className="tuner-panel-layout">
          {
            this._bass_guitar_tone_list.map( ( item, idx ) => (
              <button
                key={ idx }
                value={ idx }
                tabIndex="0"
                type="button"
                title={ 'Play ' + item.name + item.octave }
                className="app-btn"
                onClick={ this.OnClick_PlaySingleTone.bind( this, this._bass_guitar_tone_list ) }
                onKeyPress={ this.OnClick_PlaySingleTone.bind( this, this._bass_guitar_tone_list ) }
                disabled={ this.context.isAudioPlaying }>{ item.name }{ item.octave }</button>
            ) )
          }
        </div>

        </div>

    );
  }
};