//  React router pages list
//  used in app.js & controls/nav/navigation.js
//  in rendering order, with nested pages
//  pages not used are commented out

import * as React from "react";
import { useRoutes } from "react-router-dom";

import FourOhFourPage from './404/404.js';
import Home from './home/home.js';
import Resume from './resume/resume.js';
import PortfolioPage from './portfolio/portfolio.js';
import DashboardDemo from './dashboard-demo/db-demo.js';
import SvgZoomDemo from './svg-zoom/svg-zoom.js';
import WebGLDemo from './webgl-demo/webgl-demo.js';
import SvgAnimationsDemo from './svg-animations/svg-animations.js';

import AzureCaseStudyDemo from './azure-ux/azure-case-study.js';
import Html5CanvasDemo from './canvas-demo/canvas-demo.js';
import CssArtPage from './css-art/css-art.js';
import ButtonAnimations from './button-animations/button-animations.js';

import MusicPage from './music/music.js';
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
  {
    path: MusicPage.defaultProps.Href,
    component: MusicPage
  },
];

const _routes = [
  { path: "*", element: <FourOhFourPage /> },
  {
    index: true,
    path: Home.defaultProps.Href,
    element: <Home />,
  },
  {
    path: Resume.defaultProps.Href,
    element: <Resume />,
  },
  {
    path: MusicPage.defaultProps.Href,
    element: <MusicPage />,
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
  }
];

function AppRoutes()
{
  //  console.debug( '_routes', _routes );
  return useRoutes( _routes );
};

export
{
  _page_routes as PagesList,
  _routes as SiteRoutes,
  AppRoutes, 
  FourOhFourPage as FourOh4
}