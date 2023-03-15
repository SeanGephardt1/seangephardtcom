import React from 'react';
import { NavLink } from 'react-router-dom';
import ExecDashboardPage from '../dash.js';
//  import SVG from './../../../assets/svgs.js';

export default class ExecHeader extends React.Component
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
      <div className="ehp">
        <div className="ehp-area ehp-brand">
            <NavLink
            tabIndex="0"
              className=""
              to={ ExecDashboardPage.defaultProps.Href }
              end
              title={ `${ ExecDashboardPage.defaultProps.LinkTitle.toString() }\r\r${ ExecDashboardPage.defaultProps.Description.toString() }` }
            >{ ExecDashboardPage.defaultProps.Icon }</NavLink>
        </div>
        <div className="ehp-area ehp-search">
          <div>search</div>
        </div>
        <div className="ehp-area ehp-tools">
          <div>tools</div>
        </div>
        <div className="ehp-area ehp-account">
          <div>My Account</div>
        </div>
      </div>
    );
  };
};