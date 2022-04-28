import React from 'react';
import { AppAudioPageContext } from '../../controls/audio/audio-context.js';
import FrequencyPlayer from '../../controls/audio/freq-player.js';
import Tuners from '../../controls/audio/tuners.js';
import './audio-toys.css';

export default class AudioToysDemoPage extends React.Component
{
  static contextType = AppAudioPageContext;
  static defaultProps = {
    Title: "Audio Toys",
    LinkTitle: "Audio Toys",
    Href: "portfolio/audio-toys",
    Description: "Web Audio API demos",
    Icon: "",
  };
  constructor ( props )
  {
    super( props );
    document.title = this.props.Title;
    this.state = {
      isPlaying: false
    }
    return;
  };

  ToggleAudioPlayback()
  { //  console.debug( 'ToggleAudioPlayback', this.state, this.context );
    this.context.SetPlayingStatus( !this.context.isAudioPlaying );
    this.setState( {
      isPlaying: this.context.isAudioPlaying
    } );
    return;
  }

  /* REACT LIFECYCLE */
  componentDidMount()
  {	//  console.debug( "componentDidMount()" );
    this.context.TogglePlaying = this.ToggleAudioPlayback.bind( this );
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
        <AppAudioPageContext.Provider value={ this.context }>
          <div className="centered header">{ this.props.Title }</div>
          <FrequencyPlayer  />
          <Tuners />
        </AppAudioPageContext.Provider>
      </div>
    );
  }
};