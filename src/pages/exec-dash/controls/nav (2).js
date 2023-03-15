import React from 'react';
import { NavLink } from 'react-router-dom';
import ExecDashboardPage from '../dash.js';
import ExecReportsPage from '../reports.js';
import ExecAppsPage from '../apps.js';
import ExecConfigPage from '../config.js';
import ExecHelpPage from '../help.js';

export default class ExecDemoNavigation extends React.Component
{
  constructor ( props ) 
  {
    super( props );

    this.LeftNav = [
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

    this.state = {
      opened: false
    };

    this._nav_open = "exec-nav nav-open";
    this._nav_closed = "exec-nav nav-closed";
    this._toggle_open = "exec-nav-toggle toggle-open";
    this._toggle_closed = "exec-nav-toggle toggle-closed";

    this._nav_selected = " ed-nav-selected";
    this._nav_open_unselected = 'ed-nav-item';
    this._nav_open_selected = this._nav_open_unselected + this._nav_selected;
    this._nav_closed_unselected = 'ed-nav-item-closed';
    this._nav_closed_selected = this._nav_closed_unselected + this._nav_selected;

    return;
  };
  OnClick_Toggle_Nav( ev )
  { //	console.debug( 'OnClick_Toggle_Nav, update app state context', this.state.opened );
    this.setState( {
      opened: !this.state.opened
    } );
    return;
  };
  render()
  { //  HACK to allow for classname property scoping within this.LeftNav loop
    const _self = this;

    return (
      <div className={ this.state.opened === false ? this._nav_open : this._nav_closed }>

        <div className="exec-nav-top">
          {
            this.state.opened === false &&
            this.LeftNav.map( ( item, index ) => (
              <NavLink
                tabIndex="0"
                key={ index }
                className={ function ( { isActive } )
                { 
                  return ( isActive === true ) ? _self._nav_open_selected : _self._nav_open_unselected;
                } }
                to={ item.component.defaultProps.Href }
                end
                title={ item.component.defaultProps.LinkTitle.toString() }
              >{ item.component.defaultProps.LinkTitle.toString() }</NavLink>
            ) )
          }
          {
            this.state.opened === true &&
            this.LeftNav.map( ( item, index ) => (
              <NavLink
                tabIndex="0"
                key={ index }
                className={ function ( { isActive } )
                { 
                  return ( isActive === true ) ? _self._nav_closed_selected : _self._nav_closed_unselected;
                } }
                to={ item.component.defaultProps.Href }
                end
                title={ item.component.defaultProps.LinkTitle.toString() }>{ item.component.defaultProps.LinkTitle.toString().charAt( 0 ) }</NavLink>
            ) )
          }
        </div>

        <div
          tabIndex="0"
          className={ this.state.opened === false ? this._toggle_open : this._toggle_closed }
          onClick={ this.OnClick_Toggle_Nav.bind( this ) }>
          <svg className="svg-toggle" viewBox="0 0 64 64">
            {
              this.state.opened === false &&
              <>
                <line x1="0" x2="64" y1="32" y2="32" stroke="white" strokeWidth="2" />
                <line x1="0" x2="32" y1="32" y2="0" stroke="white" strokeWidth="2" />
                <line x1="0" x2="32" y1="32" y2="64" stroke="white" strokeWidth="2" />
              </>
            }
            {
              this.state.opened === true &&
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
};