import React from 'react';
import { NavLink, useSearchParams, useParams, useLocation  } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { PagesList } from '../../pages/pages.js';
import './nav.css';


export default function SiteNavigation()
{
  let [ searchParams, setSearchParams ] = useSearchParams();
  console.debug( 'searchParams', searchParams );

  let params = useParams();
  console.debug( 'params', params );

  let location = useLocation();
  console.debug( 'location', location );

  return (
    <nav>
      <div className="nav-top-level">
        {
          PagesList.map( ( item, index ) => (
            <NavLink
              key={ index }
              to={ item.path }
              className={ function ( { isActive } )
              { //  console.debug( "inside", isActive, window.location.pathname, item.path, window.location.pathname.includes( item.path ) );
                return isActive ? 'nav nav-selected' : 'nav';
              } }
              title={ item.component.defaultProps.Title }
            >{ item.component.defaultProps.LinkTitle }</NavLink>
          ) )
        }
      </div>

      { /* for sub-links */ }
      {
        location.pathname.includes("portfolio") &&
        <div className="nav-sub-level">
          {
            PagesList[ 2 ].routes.map( ( item, index ) => (
              <NavLink
                key={ index }
                to={ item.path }
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

//export default class SiteNav extends React.Component
//{
//  constructor ( props )
//  {
//    super( props );
//    return;
//  };
//  render()
//  {
//    //  console.debug( "SiteNav.render()", this.props);

//    return (
//      <nav>
//        <div className="nav-top-level">
//          {
//            PagesList.map( ( item, index ) => (
//              <NavLink
//                key={ index }
//                to={ item.path }
//                className={ function ( { isActive } )
//                { //  console.debug( "inside", isActive, window.location.pathname, item.path, window.location.pathname.includes( item.path ) );
//                  return isActive ? 'nav nav-selected' : 'nav';
//                } }
//                title={ item.component.defaultProps.Title }
//                >{ item.component.defaultProps.LinkTitle }</NavLink>
//            ) )
//          }
//        </div>

//        { /* for sub-links */ }
//        {
//          <div className="nav-sub-level">
//            {
//              PagesList[ 2 ].routes.map( ( item, index ) => (
//                <NavLink
//                  key={ index }
//                  to={ item.path }
//                  className={ function ( { isActive } )
//                  { //  console.debug( "sub", isActive, item.path, window.location.pathname  );
//                    return isActive ? 'nav nav-sub-selected' : 'nav';
//                  } }
//                  title={ item.component.defaultProps.Title }
//                >{ item.component.defaultProps.LinkTitle }</NavLink>
//              ) )
//            }
//          </div>
//          }

//			</nav>
//    );
//  };
//};