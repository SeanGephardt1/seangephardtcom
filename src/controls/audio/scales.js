import React from 'react';
import { AppAudioPageContext } from './audio-context.js';
import
{
  Oscillators,
  MusicalKeys,
  MiddleCRange,
  AudioHertz
} from './freq-data.js';
import './audio.css';

export default class ScalesControl extends React.Component
{
  static contextType = AppAudioPageContext;
  static defaultProps = {
    Title: "Musical Scales",
    LinkTitle: "Musical Scales",
    Href: "portfolio/audio-toys/scales",
    Description: "Easy to use musical scales.",
    Icon: "",
  };
  constructor ( props )
  {
    super( props );

    //  C > D# > E# > F > G > A > B
    //  W > W > H > W > W > H > W
    this._major_key = [ 0, 2, 4, 5, 7, 9, 11 ];
    this._scale_set_interval = undefined;
    this._scale_set_step = 0;

    this._play_times = [0.5, 1, 2, 3, 4, 5 ];
    this._default_context_options = {
      latencyHint: 0, // 0.147 , 0.294 -- "interactive", // "balanced", "playback"
      sampleRate: 3000, // max == 768000
    };
    this._audio_context = undefined; // new AudioContext( this._default_context_options );
    this._oscillator = undefined;
    this._gainNode = undefined; // audioCtx.createGain();

    this.state = {
      currentOscillatorType: Oscillators.Triangle,
      currentPlaytime: this._play_times[ 0 ],
      isScalePlaying: false,
      isPlaybackBtnPlaying: false,
      currentKey: MusicalKeys[ 0 ],
      currentKeyNotes: this.FilterScaleKeyNotes( 0 ),
      currentPitch: undefined // MiddleCRange[0]
    };
    return;
  };

  // UTIL FUNCTIONS
  FilterScaleKeyNotes( idx )
  { //  console.debug( 'FilterScaleKeyNotes', idx, this._major_key.length, MiddleCRange.length );
    let _m_step = 0;
    let _major_scale = [];
    const _note_range = MiddleCRange.slice( idx );
    //  console.debug( '_note_range', _note_range.length );

    for ( let step = 0; step < this._major_key.length; step++ )
    { //  console.debug( 'step', step, _m_step , this._major_key[ step ] );
      if ( step === 0 )
      {
        _m_step = 0;
      }
      else
      {
        _m_step = this._major_key[ step ];
      }
      //  console.debug( step, _m_step, _note_range[ _m_step ].name );
      _major_scale.push( _note_range[ _m_step ] );
    }

    // DEBUG
    //for ( let i = 0; i < _major_scale.length; i++ )
    //{
    //  console.debug( i, _major_scale[ i ] );
    //}

    //  console.debug( _note_range[0].name, '_major_scale', _major_scale.length, _major_scale );
    return _major_scale;
  };

  // SELECT FUNCTION FOR CHANGING OSCILLATOR TYPES
  OnChange_Select_ChangeMusicalKey( ev )
  {//  console.debug( 'OnChange_Select_ChangeOscillatorType', ev.target.value, MusicalKeys[ ev.target.value ] );
    this.setState( {
      currentKey: MusicalKeys[ ev.target.value ],
      currentKeyNotes: this.FilterScaleKeyNotes( ev.target.value )
    } );
    return;
  };
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
  OnClick_PlaySingleScaleTone( note, ev )
  { //  console.debug( 'OnClick_PlaySingleScaleTone', note );
    this._audio_context = new AudioContext( this._default_context_options );
    this._oscillator = this._audio_context.createOscillator();
    this._oscillator.type = this.state.currentOscillatorType;
    this._oscillator.frequency.value = 100;
    this._oscillator.frequency.setValueAtTime( parseFloat( note.value ), this._audio_context.currentTime );

    this._gainNode = this._audio_context.createGain();

    this._oscillator.connect( this._gainNode );
    this._gainNode.connect( this._audio_context.destination );

    this._oscillator.start();

    const _self = this;
    window.setTimeout( () =>
    { //  console.debug( "PLAYBACK TIMEOUT", _self.context );
      _self._oscillator.stop();
      _self.context.TogglePlaying();
      _self.setState( {
        currentPitch: undefined,
        isScalePlaying: false,
      } );
      return;
    }, this.state.currentPlaytime * 1000, _self );

    this.context.TogglePlaying();
    this.setState( {
      currentPitch: note,
      isScalePlaying: true,
    } );

    return;
  };
  OnClick_PlayScaleTones( ev )
  { //  console.debug( 'OnClick_PlayScaleTones', this._scale_set_step);
    if ( this.state.isPlaybackBtnPlaying === true )
    {
      this._audio_context.suspend();
      //this._audio_context.resume();
      this.context.TogglePlaying();
      this.setState( {
        isScalePlaying: this.context.isAudioPlaying,
        isPlaybackBtnPlaying: !this.state.isPlaybackBtnPlaying
      } );
    }
    else if ( this.state.isPlaybackBtnPlaying === false )
    {
      this._audio_context = new AudioContext( this._default_context_options );
      this._oscillator = this._audio_context.createOscillator();
      this._oscillator.type = this.state.currentOscillatorType;
      this._oscillator.frequency.value = parseFloat( this.state.currentKeyNotes[ this._scale_set_step ].value );
      this._gainNode = this._audio_context.createGain();
      this._oscillator.connect( this._gainNode );
      this._gainNode.connect( this._audio_context.destination );
      this._oscillator.start( 0 );
      this._scale_set_step++;

      this.context.TogglePlaying();
      this.setState( {
        currentPitch: this.state.currentKeyNotes[ this._scale_set_step - 1],
        isScalePlaying: this.context.isAudioPlaying,
        isPlaybackBtnPlaying: true
      } );

      this._scale_set_interval = window.setInterval( () =>
      { //  console.debug( "INTERVAL", this._scale_set_step, this.state.currentKeyNotes.length);
        // STOP
        if ( this._scale_set_step === this.state.currentKeyNotes.length )
        { //  console.debug( "CLEARING INTERVAL" );
          this._oscillator.stop();
          window.clearInterval( this._scale_set_interval );
          this._scale_set_step = 0;
          this.context.TogglePlaying();
          this.setState( {
            currentPitch: undefined,
            isScalePlaying: false,
            isPlaybackBtnPlaying: false
          } );
        }
         // CONTINUE
        else
        {
          this._oscillator.frequency.setValueAtTime( parseFloat( this.state.currentKeyNotes[ this._scale_set_step ].value ), this._audio_context.currentTime );

          this._scale_set_step++;

          this.setState( {
            currentPitch: this.state.currentKeyNotes[ this._scale_set_step - 1 ]
          } );
        }

        return;
      }, this.state.currentPlaytime * 1000, this );
    }
    return;
  };

    //  REACT LIFECYCLE
  componentDidMount()
  {	//	console.debug( "componentDidMount()");
    return;
  }
  componentWillUnmount()
  {	//	console.debug( "componentWillUnmount()", this._audio_context );
    if ( this._audio_context !== undefined )
    {
      this._audio_context.suspend();
      //  this._audio_context.close();
      //  this._audio_context = undefined;
    }
    return;
  };
  render()
  { //  console.debug( 'TunersControl.render()', this.context.isAudioPlaying );
    //{/*                disabled={ this.context.isAudioPlaying && this.state.isScalePlaying }*/}
    return (
      <div className="tuner-panel">
        <div className="tuner-panel-header">{ this.props.Title }</div>
        <div className="tuner-panel-sub-header">{ this.props.Description }</div>

        <div className="tuner-panel-sub-header">Select a key to hear play back of the select scale for that key. All notes are above Middle C.</div>
        <div className="tuner-panel-layout">
          <select
            tabIndex="0"
            title="Select a musical key from the list of keys."
            className="select-pitch-range"
            defaultValue={ this.state.currentKey }
            onChange={ this.OnChange_Select_ChangeMusicalKey.bind( this ) }
            disabled={ this.context.isAudioPlaying }>
            {
              MusicalKeys.map( ( item, idx ) =>
                <option key={ idx } title={ item.major } value={ idx }>{ item.major } Major = { item.minor } Minor</option>
              )
            }
          </select>
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
            title="Select a time length for each note."
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

        <div className="tuner-panel-sub-header">Play the specific notes of the key scale</div>
        <div className="tuner-panel-layout">
          {
            this.state.currentKeyNotes.map( ( item, idx ) => (
              <button
                key={ idx }
                value={ idx }
                tabIndex="0"
                type="button"
                className={ ( this.state.currentPitch !== undefined && this.state.currentPitch.name === item.name ) ? 'app-btn note-playing' : 'app-btn' }
                title={ 'Play ' + item.name + item.octave }
                disabled={ ( this.context.isAudioPlaying === true || this.state.isScalePlaying ) }
                onClick={ this.OnClick_PlaySingleScaleTone.bind( this, item ) }
                onKeyPress={ this.OnClick_PlaySingleScaleTone.bind( this, item ) }
              >{ item.name }{ item.octave } { item.value }{ AudioHertz }</button >
            ) )
          }
        </div>
        <div className="tuner-panel-sub-header">Play the selected key scale</div>
        <div className="tuner-panel-layout">
          <button
            type="button"
            tabIndex="0"
            className="app-btn"
            value={ this.state.isPlaybackBtnPlaying }
            disabled={ this.context.isAudioPlaying === true  }
            onClick={ this.OnClick_PlayScaleTones.bind( this ) }
            onKeyPress={ this.OnClick_PlayScaleTones.bind( this ) }>Play All</button>
        </div>

      </div>
    );
  }
};