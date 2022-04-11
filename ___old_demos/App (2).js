import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { PagesList } from './pages/pages.js';
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
  {
    console.debug( "App.render()", React.version, this.props );
    return (
      <BrowserRouter>
        <SiteNav />
        <main>
          <Routes>
            {
              PagesList.map( ( item, index ) =>
              (
                <Route key={ index } path={ item.path } element={ <item.component /> } />
              ) )
            }
            {
              PagesList[ 2 ].routes.map( ( item, index ) =>
              (
                <Route key={ index } path={ item.path } element={ <item.component /> } />
              ) )
            }
          </Routes>
        </main>
        <SiteFooter>&copy; 1996-2022 Sean Gephardt. All rights reserved.</SiteFooter>
      </BrowserRouter>
    );
  }
};