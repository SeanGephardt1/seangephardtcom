import React from 'react';
import { BrowserRouter, Outlet } from "react-router-dom";
import { AppRoutes } from './pages/pages.js';
import SiteNav from './controls/nav/nav.js';
import SiteFooter from './controls/footer/footer.js';
import './css/all.css';

export default class App extends React.Component
{
  constructor ( props )
  {
    super( props );
    return;
  };
  render()
  { //  console.debug( "App.render()", React.version );
    return (
      <BrowserRouter>
        <SiteNav />
        <main>
          <AppRoutes/>
          <Outlet />
        </main>
        <SiteFooter/>
      </BrowserRouter>
    );
  }
};