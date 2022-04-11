//  Update for React router 6 
//  Used in ./app.js & ./controls/nav/navigation.js

import * as React from "react";
import { useRoutes } from "react-router-dom";

import LayoutPage from './layout.js';
import FourOhFourPage from './404/404.js';
import Home from './home/home.js';
import Resume from './resume/resume.js';
import PortfolioPage from './portfolio/portfolio.js';
import DashboardDemo from './dashboard-demo/db-demo.js';
import SvgZoomDemo from './svg-zoom/svg-zoom.js';
import WebGLDemo from './webgl-demo/webgl-demo.js';
//import SvgAnimationsDemo from './svg-animations/svg-animations.js';
//import AzureCaseStudyDemo from './azure-ux/azure-case-study.js';
//import Html5CanvasDemo from './canvas-demo/canvas-demo.js';
//import CssArtPage from './css-art/css-art.js';
//import ButtonAnimations from './button-animations/button-animations.js';

import MusicPage from './music/music.js';
//  import TestPage from './test/test.js';
//  import MovieStoreExtension from './movie-works-demo/movieworks.js';
//  import GuitarApp from './guitar-app/guitar-app.js';
//  import GuitarStoreExtension from './guitar-store/guitar-store.js';

const _nav_routes = [
  {
    component: Home
  },
  {
    component: Resume
  },
  {
    component: PortfolioPage,
    children: [
      {
        component: DashboardDemo
      },
      {
        component: WebGLDemo
      },
      {
        component: SvgZoomDemo
      },
    ]
  },
  {
    component: MusicPage
  },
];

const _app_routes = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "*",
        element: <FourOhFourPage />,
      },
      {
        path: Home.defaultProps.Href,
        element: <Home />,
      },
      {
        path: Resume.defaultProps.Href,
        element: <Resume />,
      },
      {
        path: PortfolioPage.defaultProps.Href,
        element: <PortfolioPage />,
      },
      {
        path: DashboardDemo.defaultProps.Href,
        element: <DashboardDemo />
      },
      {
        path: WebGLDemo.defaultProps.Href,
        element: <WebGLDemo />
      },
      {
        path: SvgZoomDemo.defaultProps.Href,
        element: <SvgZoomDemo />
      },
      {
        path: MusicPage.defaultProps.Href,
        element: <MusicPage />
      }
    ]
  }
];


function AppRoutes()
{ //  console.debug( '_routes', _routes );
  const _my_routes = useRoutes( _app_routes );
  return _my_routes;
};

export
{
  _nav_routes as NavList,
  _app_routes as RoutesList,
  AppRoutes, 
  FourOhFourPage as FourOh4
}