import React from 'react';
import { Outlet } from "react-router-dom";
import { NavList } from './../pages/pages.js';
import SiteNav from './../controls/nav/nav.js';
import SiteFooter from './../controls/footer/footer.js';
import './../css/all.css';

export default class LayoutPage extends React.Component
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
          navData={ NavList }
          navStyle="level-one" />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </>
    );
  }
};