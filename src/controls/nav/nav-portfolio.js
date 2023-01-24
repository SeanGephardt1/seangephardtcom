//  updated from class component to functional component for react router v6
//<PortfolioSiteNavigation />    

import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavList } from '../../pages/pages.js';
import SVG from '../../assets/svgs.js';
import './nav.css';

export default function PortfolioSiteNavigation( props )
{
  return (
    <nav className="portfolio-nav">
      {
        NavList[ 2 ].children.map( ( item, index ) => (
          <div
            key={ index }
            className="portfolio-nav-item-panel">
            <div className="portfolio-nav-item-box">
                <NavLink
                  tabIndex="0"
                  to={ item.component.defaultProps.Href.toLowerCase() }
                  end
                  title={ item.component.defaultProps.Title }
              >
                {
                  item.component.defaultProps.Icon !== undefined && 
                  item.component.defaultProps.Icon
                }
                {
                  item.component.defaultProps.Icon === undefined &&
                  SVG.PortfolioPages.Placeholder
                }
              </NavLink>                
            </div>
            <div className="portfolio-nav-item-box">
              <div className="pnib-title">
              <NavLink
                tabIndex="0"
                to={ item.component.defaultProps.Href.toLowerCase() }
                end
                title={ item.component.defaultProps.Title }
                >{ item.component.defaultProps.Title }</NavLink>
                </div>
              <div className="pnib-desc" title={ item.component.defaultProps.Description }>{ item.component.defaultProps.Description }</div>
            </div>
          </div>
        ) )
      }
    </nav>
  );
};