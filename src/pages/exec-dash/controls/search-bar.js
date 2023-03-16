import React from 'react';
import './search-bar.css';
//import { NavLink } from 'react-router-dom';
//import SVG from './../../../assets/svgs.js';

export default class ExecSearchBar extends React.Component
{
  constructor ( props ) 
  {
    super( props );
    return;
  };

  /* custom functions & event handlers */
  OnChange_Text_Enter(ev)
  {
    console.debug( 'OnChange_Text_Enter', ev.target.value );
    return;
  };
  OnClick_Enable_Voice(ev)
  {
    console.debug( 'OnClick_Enable_Voice', ev.target.value );
    return;
  };
  OnClick_Submit_Search(ev)
  {
    console.debug( 'OnClick_Submit_Search', ev.target.value );
    return;
  };

  /* react lifecycle */
  componentDidMount()
  {
    //  console.debug( "componentDidMount()" );
    return;
  }
  componentDidUpdate()
  {
    //  console.debug( "componentDidUpdate()" );
    return;
  };
  componentWillUnmount()
  {
    //  console.debug( "componentWillUnmount()" );
    return;
  };
  render()
  {
    return (
      <div className="esp">
        <div className="esp-input-panel">
          <input
            tabIndex="0"
            type="text"
            placeholder="Enter text or use the voice command button."
            className="esp-input-field"
            onChange={ this.OnChange_Text_Enter.bind(this)}
          />
          <button
            tabIndex="0"
            className="esp-input-btn"
            onClick={ this.OnClick_Enable_Voice.bind( this ) }>V</button>
          <button
            tabIndex="0"
            className="esp-input-btn"
            onClick={ this.OnClick_Submit_Search.bind(this)}>S</button>
        </div>
        <div className="esp-results-panel">
          <div>result</div>
          <div>result</div>
          <div>result</div>
          <div>result</div>
        </div>
      </div>
    );
  };
};