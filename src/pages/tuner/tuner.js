//  LINKS
//  https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
//  https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext
//  https://codepen.io/kulak-at/pen/oqbKpq
//  https://mdn.github.io/webaudio-examples/output-timestamp/
//  https://mdn.github.io/webaudio-examples/audiocontext-states/
//  https://github.com/mdn/webaudio-examples/blob/master/audiocontext-states/index.html

//  AUDIO THEORY LINKS
//  https://pages.mtu.edu/~suits/scales.html
//  https://en.wikipedia.org/wiki/Scientific_pitch_notation
//  https://musicianself.com/guitar-101-standard-tuning-chromatic-scales-sequence-of-notes-fretboard/#:~:text=Middle%20C%20is%20C4%3D261.6Hz%20Standard%20tuning%20fork%20A,strings%20are%20E2%3D82.41Hz%2C%20A2%3D110Hz%2C%20D3%3D146.8Hz%2C%20G3%3D196Hz%2C%20B3%3D246.9Hz%2C%20E4%3D329.6Hz
//  https://en.wikipedia.org/wiki/Guitar_tunings#Standard_tuning


import React from 'react';
import './tuner.css';

export default class MusicalTuner extends React.Component
{
  static defaultProps = {
    Title: "Musical Tuner",
    LinkTitle: "Musical Tuner",
    Href: "portfolio/music-tuner",
    Icon: "",
  };
  constructor ( props )
  {
    super( props );
    document.title = this.props.Title;


    //Frequency	Scientific
    //string, pitch, notation
    //1( E )	329.63 Hz	E4
    //2( B )	246.94 Hz	B3
    //3( G )	196.00 Hz	G3
    //4( D )	146.83 Hz	D3
    //5( A )	110.00 Hz	A2
    //6( E )	82.41 Hz	E2

    this._freq_tone_list = [
      { name: "E4", value: 329.63 },
      { name: "B3", value: 246.94 },
      { name: "G3", value: 196.00 },
      { name: "D3", value: 148.83 },
      { name: "A2", value: 110.00 },
      { name: "E2", value: 82.41 },
    ];
    this._oscillator_types = ['square','triangle']

    this._default_context_options = {
      latencyHint: 0, // 0.147 , 0.294 -- "interactive", // "balanced", "playback"
      sampleRate: 3000, // max == 768000
    };
    this._audio_context = undefined; // new AudioContext( this._default_context_options );
    this._oscillator = undefined;
    this._gainNode = undefined; // audioCtx.createGain();

    this.state = {
      debug: true,
      currentPitch: this._freq_tone_list[0]
    };
    return;
  };
  Init_AudioContext()
  {
    console.debug( 'Init_AudioContext', this.state.currentPitch.value);

    this._audio_context = new AudioContext( this._default_context_options );

    this._oscillator = this._audio_context.createOscillator();
    this._oscillator.type = 'square';
    this._oscillator.frequency.value = 100;
    this._oscillator.frequency.setValueAtTime( this.state.currentPitch.value, this._audio_context.currentTime );

    this._gainNode = this._audio_context.createGain();

    //  this._oscillator.connect( this._audio_context.destination );
    this._oscillator.connect( this._gainNode );
    this._gainNode.connect( this._audio_context.destination );
    return;
  };
  OnClick_PlayTone( ev )
  {
    console.debug( 'OnClick_PlayTone', this._audio_context, this.state.currentPitch );

    this._audio_context = this.Init_AudioContext();

    console.debug( 'OnClick_PlayTone', this._audio_context, this.state.currentPitch );

    ////  this._audio_context.resume();
    ////  this._oscillator.stop();
    this._oscillator.start();

    //console.debug( this._audio_context);
    //  console.debug( this._audio_context.state );
    //console.debug( this._audio_context.currentTime );
    //console.debug( this._audio_context.currentPitch );
    //console.debug( this._audio_context.getOutputTimestamp() );
    return;
  };
  OnClick_StopTone( ev )
  {
    console.debug( 'OnClick_StopTone', this._audio_context );
    //this._audio_context = this.Init_AudioContext();
    //this._oscillator.start();
    this._oscillator.stop();
    return;
  };
  OnChange_SelectFrequencyTone( ev )
  {
    console.debug( 'OnClick_StopTone', ev.target.value, ev.target.selectedIndex, this._freq_tone_list[ ev.target.selectedIndex ] );

      this._oscillator.stop();
      this._oscillator.frequency.setValueAtTime( parseFloat(ev.target.value), this._audio_context.currentTime );
      this._oscillator.start();
      this.setState( {
        currentPitch: this._freq_tone_list[ ev.target.selectedIndex ].value
      } );
    return;
  }
  componentDidMount()
  {	//	console.debug( "MusicalTuner.componentDidMount()");
    return;
  }
  componentWillUnmount()
  {	//	console.debug( "MusicalTuner.componentWillUnmount()", this._audio_context );
    if ( this._audio_context !== undefined )
    {
      this._audio_context.close();
    }
    return;
  };
  render()
  {
    return (
      <div className="page-layout padding30">
        <div className="centered">{ this.props.Title }</div>
        <div className="tuner-panel">
          <div>
            <div>LAYOUT</div>
          </div>
        </div>
        <div className="tuner-button-panel">
          <select onChange={ this.OnChange_SelectFrequencyTone.bind( this ) }>
            {
              this._freq_tone_list.map( ( item, idx ) => (
                <option key={ idx } value={ item.value }>{ item.name }</option>
              ) )
            }
          </select>
          <button type="button" onClick={ this.OnClick_PlayTone.bind( this ) }>Play</button>
          <button type="button" onClick={ this.OnClick_StopTone.bind( this ) }>Stop</button>
        </div>
      </div>
    );
  }
};