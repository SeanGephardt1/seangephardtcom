import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ExecDashboardPage from '../dash.js';
import ExecReportsPage from '../reports.js';
import ExecAppsPage from '../apps.js';
import ExecConfigPage from '../config.js';
import ExecHelpPage from '../help.js';

export default function ExecDemoNavigation( props )
{
  const LeftNav = [
    {
      component: ExecDashboardPage
    },
    {
      component: ExecAppsPage
    },
    {
      component: ExecReportsPage
    },
    {
      component: ExecConfigPage
    },
    {
      component: ExecHelpPage
    }
  ];
  const location = useLocation();
  //  console.debug( 'location', location.pathname );

  const [ navOpen, setNavOpen ] = useState( true );

  function OnClick_Toggle_Nav()
  { //	console.debug( 'OnClick_Toggle_Nav, update app state context', navOpen  );
    setNavOpen( !navOpen );
    return;
  };

  return (
    <div className={ navOpen === false ? 'exec-nav nav-open' : 'exec-nav nav-closed' }>

      <div className="exec-nav-top">
        {
          navOpen === false &&
          LeftNav.map( ( item, index ) => (
            <NavLink
              tabIndex="0"
              key={ index }
              className={ function ( { isActive } )
              { 
                const _selected = 'ed-nav-item ed-nav-selected';
                const _unselected = 'ed-nav-item';
                return ( isActive === true ) ? _selected : _unselected;
              } }
    
              to={ item.component.defaultProps.Href }
              end
              title={ item.component.defaultProps.LinkTitle.toString() }
            >{ item.component.defaultProps.LinkTitle.toString().toLocaleUpperCase() }</NavLink>
          ) )
        }
        {
          navOpen === true &&
          LeftNav.map( ( item, index ) => (
            <NavLink
              tabIndex="0"
              key={ index }
              className={ function ( { isActive } )
              { 
                let _selected = 'ed-nav-item-closed ed-nav-selected';
                let _unselected = 'ed-nav-item-closed';
                return ( isActive === true ) ? _selected : _unselected;
              } }
              to={ item.component.defaultProps.Href }
              end
              title={ item.component.defaultProps.LinkTitle.toString() }>{ item.component.defaultProps.LinkTitle.toString().charAt( 0 ) }</NavLink>
          ) )
        }
      </div>

      <div
        tabIndex="0"
        className={ navOpen === false ? 'exec-nav-toggle toggle-open' : 'exec-nav-toggle toggle-closed' }
        onClick={ OnClick_Toggle_Nav }>
        <svg className="svg-toggle" viewBox="0 0 64 64">
          {
            navOpen === false &&
            <>
              <line x1="0" x2="64" y1="32" y2="32" stroke="white" strokeWidth="2" />
              <line x1="0" x2="32" y1="32" y2="0" stroke="white" strokeWidth="2" />
              <line x1="0" x2="32" y1="32" y2="64" stroke="white" strokeWidth="2" />
            </>
          }
          {
            navOpen === true &&
            <>
              <line x1="0" x2="64" y1="32" y2="32" stroke="white" strokeWidth="2" />
              <line x1="64" x2="32" y1="32" y2="0" stroke="white" strokeWidth="2" />
              <line x1="64" x2="32" y1="32" y2="64" stroke="white" strokeWidth="2" />
            </>
          }
        </svg>
      </div>
    </div>
  );
};