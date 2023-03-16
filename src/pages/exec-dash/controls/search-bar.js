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
            onClick={ this.OnClick_Enable_Voice.bind( this ) }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M176 0C123 0 80 43 80 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM48 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H104c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H200V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" /></svg>
          </button>
          <button
            tabIndex="0"
            className="esp-input-btn"
            onClick={ this.OnClick_Submit_Search.bind( this ) }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </button>
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