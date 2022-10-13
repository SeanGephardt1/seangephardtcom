//  updated from class component to functional component for react router v6
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
              { //  
                console.debug( index, isActive, location.pathname, item.component.defaultProps.Href, location.pathname.includes( item.component.defaultProps.Href ) );
                return isActive === true ? 'nav nav-selected' : 'nav';
              } }
              title={ item.component.defaultProps.Title }
            >{ item.component.defaultProps.LinkTitle }</NavLink>
          ) )
        }
      </div>

      {
        location.pathname.includes( NavList[ 3 ].component.defaultProps.Href.toLowerCase() ) &&
        <div className="nav-sub-level">
          {
            NavList[ 3 ].children.map( ( item, index ) => (
              <NavLink
                tabIndex="0"
                key={ index }
                to={ item.component.defaultProps.Href }
                className={ function ( { isActive } )
                { //  console.debug( "SUBNAV::", isActive, item.component.defaultProps.Href, location.pathname );
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