//  React router pages list
//  used in app.js & controls/nav/navigation.js
//  in rendering order, with nested pages
//  pages not used are commented out

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

//  import MusicPage from './music/music.js';
//  import TestPage from './test/test.js';
//  import MovieStoreExtension from './movie-works-demo/movieworks.js';
//  import GuitarApp from './guitar-app/guitar-app.js';
//  import GuitarStoreExtension from './guitar-store/guitar-store.js';

const _page_routes = [
  {
    path: Home.defaultProps.Href,
    component: Home
  },
  {
    path: Resume.defaultProps.Href,
    component: Resume
  },
  {
    path: PortfolioPage.defaultProps.Href,
    component: PortfolioPage,
    routes: [
      //{
      //  path: AzureCaseStudyDemo.defaultProps.Href,
      //  component: AzureCaseStudyDemo
      //},
      //{
      //  path: Html5CanvasDemo.defaultProps.Href,
      //  component: Html5CanvasDemo
      //},
      {
        path: DashboardDemo.defaultProps.Href,
        component: DashboardDemo
      },
      {
        path: WebGLDemo.defaultProps.Href,
        component: WebGLDemo
      },
      //{
      //  path: CssArtPage.defaultProps.Href,
      //  component: CssArtPage
      //},
      {
        path: SvgZoomDemo.defaultProps.Href,
        component: SvgZoomDemo
      },
      //{
      //  path: SvgAnimationsDemo.defaultProps.Href,
      //  component: SvgAnimationsDemo
      //},
      //{
      //  path: ButtonAnimations.defaultProps.Href,
      //  component: ButtonAnimations
      //}
    ]
  },
  //{
  //  path: MusicPage.defaultProps.Href,
  //  component: MusicPage
  //},
];

const _app_routes = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "*",
        component: FourOhFourPage,
        element: <FourOhFourPage />,
      },
      {
        path: Home.defaultProps.Href,
        component: Home,
        element: <Home />,
      },
      {
        path: Resume.defaultProps.Href,
        component: Resume,
        element: <Resume />,
      },
      {
        path: PortfolioPage.defaultProps.Href,
        component: PortfolioPage,
        element: <PortfolioPage />,
      },
      {
        path: DashboardDemo.defaultProps.Href,
        component: DashboardDemo,
        element: <DashboardDemo />
      },
      {
        path: WebGLDemo.defaultProps.Href,
        component: WebGLDemo,
        element: <WebGLDemo />
      },
      {
        path: SvgZoomDemo.defaultProps.Href,
        component: SvgZoomDemo,
        element: <SvgZoomDemo />
      }
    ]
  },
];


function AppRoutes()
{ //  console.debug( '_routes', _routes );
  const _my_routes = useRoutes( _app_routes );
  return _my_routes;
};

export
{
  _page_routes as PagesList,
  AppRoutes, 
  FourOhFourPage as FourOh4
}