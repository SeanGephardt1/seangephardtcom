import React from 'react';
import { Outlet } from "react-router-dom";
import { NavList } from './../pages/pages.js';
import SiteNav from './../controls/nav/nav.js';

export default class PortfolioLayoutPage extends React.Component
{
  constructor ( props )
  {
    super( props );
    return;
  };
  render()
  { //  console.debug( "LayoutPage.render()", React.version );
    return (
      <>
        <SiteNav
          navData={ NavList[ 2 ].children }
          navStyle="level-two" />
        <Outlet />
      </>
    );
  }
};