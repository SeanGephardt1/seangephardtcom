//  updated from class component to functional component
//  for react router v6
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavList } from '../../pages/pages.js';
import './nav.css';

export default function SiteNavigation()
{
  let location = useLocation();
  //  console.debug( 'location', location );

  return (
    <nav>
      <div className="nav-top-level">
        {
          NavList.map( ( item, index ) => (
            <NavLink
              tabIndex="0"
              key={ index }
              to={ item.component.defaultProps.Href }
              className={ function ( { isActive } )
              { // console.debug( "inside", isActive, window.location.pathname, item.path, window.location.pathname.includes( item.path ) );
                return isActive ? 'nav nav-selected' : 'nav';
              } }
              title={ item.component.defaultProps.Title }
            >{ item.component.defaultProps.LinkTitle }</NavLink>
          ) )
        }
      </div>

      { /* for sub-links */ }
      {
        location.pathname.includes( NavList[ 2 ].component.defaultProps.Href.toLowerCase() ) &&
        <div className="nav-sub-level">
          {
            NavList[ 2 ].children.map( ( item, index ) => (
              <NavLink
                tabIndex="0"
                key={ index }
                to={ item.component.defaultProps.Href }
                className={ function ( { isActive } )
                { //  console.debug( "sub", isActive, item.path, window.location.pathname  );
                  return isActive ? 'nav nav-sub-selected' : 'nav';
                } }
                title={ item.component.defaultProps.Title }
              >{ item.component.defaultProps.LinkTitle }</NavLink>
            ) )
          }
        </div>
      }

    </nav>
  );
};