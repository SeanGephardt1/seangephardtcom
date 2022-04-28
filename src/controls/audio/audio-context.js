//  SPECIFIC REACT CONTEXT API OBJECT FOR THE 'AUDIO TOYS' PAGE
//  AS IT HOSTS MULTIPLE CONTROLS WHERE WE DON'T WANT WEB AUDIO API OBJECTS TO CONFLICT
//  IF A USER DECIDES TO PRESS MULITPLE BUTTONS
//  THIS MAY GET REFACTORED FOR GLOBAL APPLICATION SCOPE IN THE FUTURE
import React from 'react';

const AppAudioPageContext = React.createContext( {
  isAudioPlaying: false,
  TogglePlaying: undefined,
  SetPlayingStatus: function ( val )
  { //  console.debug( "AppAudioPageContext.isAudioPlaying", this.isAudioPlaying );
    this.isAudioPlaying = val;
    return;
  },
});
AppAudioPageContext.displayName = 'SGAppAudioContext';

export
{
  AppAudioPageContext
};