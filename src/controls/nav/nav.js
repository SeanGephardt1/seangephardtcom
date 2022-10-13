//  updated from class component to functional component for react router v6
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavList } from '../../pages/pages.js';
import './nav.css';

export default function SiteNavigation()
{
  const location = useLocation();

  return (
    <nav>
      <div className="nav-top-level">
        {
          NavList.map( ( item, index ) => (
            <NavLink
              tabIndex="0"
              key={ index }
              to={ item.component.defaultProps.Href.toLowerCase() }
              end
              className={ function ( { isActive } )
              { // HACK - AD 'END' ATTRIBUTE FOR RESOLVING '/' ROOT LEVEL LAYOUT/OUTLET ISSUE WITH HOME PAGE HAVING / HREF PROPERTY
                // https://stackoverflow.com/questions/71236890/react-router-dom-v6-navlink-is-always-active
                //console.debug( index, "isActive", isActive );
                //console.debug( index, "item", item.component.defaultProps.Href );
                //console.debug( index, "location", location.pathname );

                // FOR NESTING, SEE ABOVE COMMENT RELATED TO NESTING NOT WORKING IN REACT ROUTER DOM V6
                if ( location.pathname.includes( item.component.defaultProps.Href ) === true &&
                  item.component.defaultProps.Href !== '/' )
                {
                  isActive = true;
                }

                let _selected = 'nav nav-selected';
                let _unselected = 'nav';

                return (isActive === true) ? _selected : _unselected;
              } }
              title={ item.component.defaultProps.Title }
            >{ item.component.defaultProps.LinkTitle }</NavLink>
          ) )
        }
      </div>

      {
        location.pathname.includes( NavList[ 2 ].component.defaultProps.Href.toLowerCase() ) &&
        <div className="nav-sub-level">
          {
            NavList[ 2 ].children.map( ( item, index ) => (
              <NavLink
                tabIndex="0"
                key={ index }
                to={ item.component.defaultProps.Href.toLowerCase() }
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