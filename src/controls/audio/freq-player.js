import React from 'react';
import { GuitarTunerTones } from './freq-data.js';
import './audio.css';

export default class FrequencyPlayer extends React.Component
{
  static defaultProps = {
    Title: "Frequency Player",
    LinkTitle: "Frequency Player",
    Href: "portfolio/freq-player",
    Description: "Select a value from the drop down list to hear the specific audio frequency. Tones are described by both thier musical pitch and audio frequency.",
    Icon: "",
  };
  constructor ( props )
  {
    super( props );

    this._freq_tone_list = GuitarTunerTones;
    this._default_context_options = {
      latencyHint: 0, // 0.147 , 0.294 -- "interactive", // "balanced", "playback"
      sampleRate: 3000, // max == 768000
    };
    this._audio_context = undefined; // new AudioContext( this._default_context_options );
    this._oscillator = undefined;
    this._gainNode = undefined; // audioCtx.createGain();

    this.state = {
      isPlaying: false,
      currentPitch: this._freq_tone_list[ 0 ],
      isRangePlaying: false,
      rangeCurrentPitch: this._freq_tone_list[ 0 ]
    };
    return;
  };

  // SELECT DROP DOWN SECTION METHODS 
  OnClick_Select_PlayTone( ev )
  { //  console.debug( 'OnClick_PlayTone', this._audio_context, this.state );

    this._audio_context = new AudioContext( this._default_context_options );

    this._oscillator = this._audio_context.createOscillator();
    this._oscillator.type = 'square';
    this._oscillator.frequency.value = 100;
    this._oscillator.frequency.setValueAtTime( parseFloat( this.state.currentPitch.value ), this._audio_context.currentTime );

    this._gainNode = this._audio_context.createGain();

    this._oscillator.connect( this._gainNode );
    this._gainNode.connect( this._audio_context.destination );

    this._oscillator.start();

    this.setState( { isPlaying: true } );
    return;
  };
  OnClick_Select_StopTone( ev )
  { //  console.debug( 'OnClick_StopTone', this.state, this._audio_context );
    if ( this._audio_context !== undefined )
    {
      this._oscillator.stop();
      this.setState( { isPlaying: false } );
    }
    return;
  };
  OnChange_Select_ChangeTone( ev )
  { //  console.debug( 'OnChange_SelectFrequencyTone', this._audio_context, this.state.currentPitch, ev.target.value, ev.target.selectedIndex, this._freq_tone_list[ ev.target.selectedIndex ] );

    if ( this._audio_context !== undefined )
    {
      this._oscillator.frequency.setValueAtTime( parseFloat( ev.target.value ), this._audio_context.currentTime );
      //   console.debug( 'OnChange_SelectFrequencyTone', this._audio_context );
      this.setState( {
        currentPitch: this._freq_tone_list[ ev.target.selectedIndex ]
      } );
    }
    else
    {
      this.setState( {
        currentPitch: this._freq_tone_list[ ev.target.selectedIndex ]
      } );
    }
    return;
  }

  // INPUT RANGE SECTION METHODS
  OnClick_Range_PlayTone( ev )
  { //  
    console.debug( 'OnClick_PlayTone', this._audio_context, this.state.rangeCurrentPitch.value );

    this._audio_context = new AudioContext( this._default_context_options );

    this._oscillator = this._audio_context.createOscillator();
    this._oscillator.type = 'square';
    this._oscillator.frequency.value = 100;
    this._oscillator.frequency.setValueAtTime( parseFloat( this.state.rangeCurrentPitch.value ), this._audio_context.currentTime );

    this._gainNode = this._audio_context.createGain();

    this._oscillator.connect( this._gainNode );
    this._gainNode.connect( this._audio_context.destination );

    this._oscillator.start();

    this.setState( { isRangePlaying: true } );
    return;
  };
  OnClick_Range_StopTone( ev )
  { //  console.debug( 'OnClick_StopTone', this.state, this._audio_context );
    if ( this._audio_context !== undefined )
    {
      this._oscillator.stop();
      this.setState( { isRangePlaying: false } );
    }
    return;
  };
  OnChange_Range_ChangeTone( ev )
  {
    console.debug( 'OnChange_Slider_ChangeTone', ev.target.value, this._audio_context );

    let _current_slider_pitch = this._freq_tone_list[ parseInt( ev.target.value ) ];
    console.debug( '_current_slider_pitch', _current_slider_pitch );

    if ( this._audio_context !== undefined )
    {
      this._oscillator.frequency.setValueAtTime( parseFloat( _current_slider_pitch.value ), this._audio_context.currentTime );
    }

    this.setState( {
      rangeCurrentPitch: _current_slider_pitch
    } );

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
  {
    return (
      <div className="tuner-panel">
        <div className="tuner-panel-header">{ this.props.Title }</div>
        <div className="tuner-panel-sub-header">{ this.props.Description }</div>

        <div className="tuner-panel-layout">
          <select
            tabIndex="0"
            title="Select from the full range of tones."
            className="tuner-selected"
            defaultValue={ this.state.currentPitch.value }
            onChange={ this.OnChange_Select_ChangeTone.bind( this ) }>
            {
              this._freq_tone_list.map( ( item, idx ) => (
                <option
                  key={ idx }
                  title={ item.name + ' -> ' + item.value.toString() }
                  value={ item.value }>{ item.name } &rarr; { item.value.toString() } { item.hertz.toString() }</option>
              ) )
            }
          </select>
          <button
            tabIndex="0"
            type="button"
            title="Click to begin playing the selected sound."
            className="app-btn"
            onClick={ this.OnClick_Select_PlayTone.bind( this ) }
            disabled={ this.state.isPlaying }>Play</button>
          <button
            tabIndex="0"
            type="button"
            title="Click to stop playing the selected sound."
            className="app-btn"
            onClick={ this.OnClick_Select_StopTone.bind( this ) }
            disabled={ !this.state.isPlaying }>Stop</button>
        </div>

        <div className="tuner-panel-layout">
          <span
            className="range-text">
            { this.state.rangeCurrentPitch.name } &rarr; { this.state.rangeCurrentPitch.value.toString() } { this.state.rangeCurrentPitch.hertz.toString() }</span>
          <datalist id="range-slider-pitches">
            {
              this._freq_tone_list.map( ( item, idx ) => (
                <option
                  key={ idx }
                  value={ idx }/ >
              ) )
            }
          </datalist>
          <input
            type="range"
            id="tonesrange"
            name="tonesrange"
            title="Select from the range of pitches"
            className="range-slider"
            list="range-slider-pitches"
            step="1"
            min="0"
            defaultValue="0"
            max={ this._freq_tone_list.length - 1}
            onChange={ this.OnChange_Range_ChangeTone.bind( this ) }></input>
          <button
            tabIndex="0"
            type="button"
            title="Click to begin playing the selected sound."
            className="app-btn"
            onClick={ this.OnClick_Range_PlayTone.bind( this ) }
            disabled={ this.state.isRangePlaying }>Play</button>
          <button
            tabIndex="0"
            type="button"
            title="Click to stop playing the selected sound."
            className="app-btn"
            onClick={ this.OnClick_Range_StopTone.bind( this ) }
            disabled={ !this.state.isRangePlaying }>Stop</button>
        </div>
      </div>
    );
  }
};