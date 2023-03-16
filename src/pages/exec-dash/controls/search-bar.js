import React from 'react';
import './search-bar.css';
import { NavLink } from 'react-router-dom';
import SVG from './../../../assets/svgs.js';

export default class ExecSearchBar extends React.Component
{
  constructor ( props ) 
  {
    super( props );
    return;
  };
  /* REACT LIFECYCLE */
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
          <input type="text" placeholder="Enter text or use the voice commnad button." />
          <button>voice</button>
          <button>search</button>
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