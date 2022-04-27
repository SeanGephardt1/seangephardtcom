import React from 'react';
import { GuitarTunerTones, Oscillators } from './freq-data.js';
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
      currentOscillatorType: Oscillators.Sine,
      isSelectPlaying: false,
      selectCurrentPitch: this._freq_tone_list[ 0 ],
      isRangePlaying: false,
      rangeCurrentPitch: this._freq_tone_list[ 0 ]
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

  // SELECT DROP DOWN SECTION METHODS 
  OnClick_Select_PlayTone( ev )
  { //  console.debug( 'OnClick_PlayTone', this._audio_context, this.state );

    this._audio_context = new AudioContext( this._default_context_options );

    this._oscillator = this._audio_context.createOscillator();
    this._oscillator.type = this.state.currentOscillatorType;
    this._oscillator.frequency.value = 100;
    this._oscillator.frequency.setValueAtTime( parseFloat( this.state.selectCurrentPitch.value ), this._audio_context.currentTime );

    this._gainNode = this._audio_context.createGain();

    this._oscillator.connect( this._gainNode );
    this._gainNode.connect( this._audio_context.destination );

    this._oscillator.start();

    this.setState( {
      isSelectPlaying: true
    } );
    return;
  };
  OnClick_Select_StopTone( ev )
  { //  console.debug( 'OnClick_StopTone', this.state, this._audio_context );
    if ( this._audio_context !== undefined )
    {
      this._oscillator.stop();
      this.setState( { isSelectPlaying: false } );
    }
    return;
  };
  OnChange_Select_ChangeTone( ev )
  { //  console.debug( 'OnChange_SelectFrequencyTone', this._audio_context, this.state.currentPitch, ev.target.value, ev.target.selectedIndex, this._freq_tone_list[ ev.target.selectedIndex ] );

    if ( this._audio_context !== undefined )
    {
      this._oscillator.frequency.setValueAtTime( parseFloat( ev.target.value ), this._audio_context.currentTime );
    }
    this.setState( {
      selectCurrentPitch: this._freq_tone_list[ ev.target.selectedIndex ]
    } );
    return;
  }

  // INPUT RANGE SECTION METHODS
  OnClick_Range_PlayTone( ev )
  { //  console.debug( 'OnClick_PlayTone', this._audio_context, this.state.rangeCurrentPitch.value );
    this._audio_context = new AudioContext( this._default_context_options );

    this._oscillator = this._audio_context.createOscillator();
    this._oscillator.type = this.state.currentOscillatorType;
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
  { //  console.debug( 'OnChange_Slider_ChangeTone', ev.target.value, this._audio_context );
    let _current_slider_pitch = this._freq_tone_list[ parseInt( ev.target.value ) ];
    //  console.debug( '_current_slider_pitch', _current_slider_pitch );

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
            title="Select from the list of oscillator types."
            className="select-pitch-range"
            defaultValue={ this.state.currentOscillatorType }
            onChange={ this.OnChange_Select_ChangeOscillatorType.bind( this ) }
            disabled={ this.state.isRangePlaying === true || this.state.isSelectPlaying === true }>
            {
              Object.entries( Oscillators ).map( ( [ key, val ] ) =>
                <option
                  key={ key }
                  title={ key }
                  value={ val }>{ key }</option>
              ) 
            }
          </select>
          <span>Select from the list of oscillator types available in your browser.</span>
        </div>

        <div className="tuner-panel-layout">
          <select
            tabIndex="0"
            title="Select from the full range of tones."
            className="select-pitch-range"
            disabled={ this.state.isRangePlaying }
            defaultValue={ this.state.selectCurrentPitch.value }
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
            onKeyPress={ this.OnClick_Select_PlayTone.bind( this ) }
            disabled={ this.state.isSelectPlaying || this.state.isRangePlaying}>Play</button>
          <button
            tabIndex="0"
            type="button"
            title="Click to stop playing the selected sound."
            className="app-btn"
            onClick={ this.OnClick_Select_StopTone.bind( this ) }
            onKeyPress={ this.OnClick_Select_StopTone.bind( this ) }
            disabled={ !this.state.isSelectPlaying || this.state.isRangePlaying}>Stop</button>
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
                  value={ idx } />
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
            max={ this._freq_tone_list.length - 1 }
            onChange={ this.OnChange_Range_ChangeTone.bind( this ) }
            disabled={ this.state.isSelectPlaying }></input>
          <button
            tabIndex="0"
            type="button"
            title="Click to begin playing the selected sound."
            className="app-btn"
            onClick={ this.OnClick_Range_PlayTone.bind( this ) }
            onKeyPress={ this.OnClick_Range_PlayTone.bind( this ) }
            disabled={ this.state.isRangePlaying || this.state.isSelectPlaying }>Play</button>
          <button
            tabIndex="0"
            type="button"
            title="Click to stop playing the selected sound."
            className="app-btn"
            onClick={ this.OnClick_Range_StopTone.bind( this ) }
            onKeyPress={ this.OnClick_Range_StopTone.bind( this ) }
            disabled={ !this.state.isRangePlaying || this.state.isSelectPlaying }>Stop</button>
        </div>

      </div>
    );
  }
};