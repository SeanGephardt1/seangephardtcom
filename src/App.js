import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SiteNav from './controls/nav/nav.js';
import SiteFooter from './controls/footer/footer.js';
import './css/all.css';

import { PagesList, FourOh4, AppRoutes } from './pages/pages.js';

//import Home from './pages/home/home.js';
//import Resume from './pages/resume/resume.js';
//import PortfolioPage from './pages/portfolio/portfolio.js';
//import DashboardDemo from './pages/dashboard-demo/db-demo.js';
//import SvgZoomDemo from './pages/svg-zoom/svg-zoom.js';
//import WebGLDemo from './pages/webgl-demo/webgl-demo.js';
//import SvgAnimationsDemo from './pages/svg-animations/svg-animations.js';
//import MusicPage from './pages/music/music.js';

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
          {/*<Routes>*/}
          {/*  <Route path="/" index element={ <Home /> }/>*/}
          {/*  <Route path="resume" element={ <Resume /> } />*/}
          {/*  <Route path="music" element={ <MusicPage /> } />*/}
          {/*  <Route path="portfolio" element={ <PortfolioPage /> } />*/}
          {/*  <Route path="portfolio/dashboard-demo" element={ <DashboardDemo /> } />*/}
          {/*  <Route path="portfolio/webgl-demos" element={ <WebGLDemo /> } />*/}
          {/*  <Route path="portfolio/svg-demos" element={ <SvgZoomDemo /> } />*/}
          {/*  <Route path="portfolio/svg-animations" element={ <SvgAnimationsDemo /> } />*/}
          {/*  <Route path="*" element={ <FourOhFourPage /> } />*/}
          {/*</Routes>*/ }
          <AppRoutes/>

          <Outlet />
        </main>
        <SiteFooter/>
      </BrowserRouter>
    );
  }
};