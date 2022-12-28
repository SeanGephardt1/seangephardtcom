//  Update for React router 6 
//  Used in ./app.js & ./controls/nav/navigation.js
import * as React from "react";
import { useRoutes } from "react-router-dom";

// top-level pages
import LayoutPage from './layout.js';
import PortfolioLayoutPage from './layout-portfolio.js';

import FourOhFourPage from './404/404.js';
import TestPage from './test/test.js';
import Home from './home/home.js';
import Resume from './resume/resume.js';

import PortfolioPage from './portfolio/portfolio.js';

import MusicPage from './music/music.js';

// portfolio level  pages
import ExecDemoPage from './exec-demo/exec-demo.js';
import WebWorkerDemo from './web-worker-demo/web-worker-demo.js';
import SvgZoomDemo from './svg-zoom/svg-zoom.js';
import WebGLDemo from './webgl-demo/webgl-demo.js';
import AzureCaseStudyDemo from './azure-ux/azure-case-study.js';
import AudioToysDemoPage from './audio-toys/audio-toys.js';

// WIP pages
//  import MovieStoreExtension from './movie-works-demo/movieworks.js';
//  import GuitarApp from './guitar-app/guitar-app.js';
//  import GuitarStoreExtension from './guitar-store/guitar-store.js';
//  import SvgAnimationsDemo from './svg-animations/svg-animations.js';
//  import Html5CanvasDemo from './canvas-demo/canvas-demo.js';
//  import CssArtPage from './css-art/css-art.js';
//  import ButtonAnimations from './button-animations/button-animations.js';

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
        component: ExecDemoPage
      },
      {
        component: AzureCaseStudyDemo
      },
      {
        component: AudioToysDemoPage
      },
      {
        component: WebWorkerDemo
      },
      {
        component: SvgZoomDemo
      },
      {
        component: WebGLDemo
      },
    ]
  },
  {
    component: MusicPage
  },
  //{
  //  component: TestPage
  //},
];

const _app_routes = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        //path: Home.defaultProps.Href,
        index: true,
        element: <Home />,
      },
      {
        path: Resume.defaultProps.Href,
        element: <Resume />,
      },
      {
        path: PortfolioPage.defaultProps.Href,
        element: <PortfolioLayoutPage />,
        //  element: <PortfolioPage />,
        children: [
          {
            index: true,
            // element: <AzureCaseStudyDemo />,
            element: <ExecDemoPage />,
          },
          {
            path: AzureCaseStudyDemo.defaultProps.Href,
            element: <AzureCaseStudyDemo />,
          },
          {
            path: AudioToysDemoPage.defaultProps.Href,
            element: <AudioToysDemoPage />
          },
          {
            path: WebWorkerDemo.defaultProps.Href,
            element: <WebWorkerDemo />
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
            path: AzureCaseStudyDemo.defaultProps.Href,
            element: <AzureCaseStudyDemo />
          }, 
        ]
      },
      {
        path: MusicPage.defaultProps.Href,
        element: <MusicPage />
      },
      {
        path: TestPage.defaultProps.Href,
        element: <TestPage />
      },
      {
        path: "*",
        element: <FourOhFourPage />,
      },
    ]
  }
];

function AppRoutes()
{
  return useRoutes( _app_routes );
};

export
{
  _nav_routes as NavList,
  _app_routes as RoutesList,
  AppRoutes,
  FourOhFourPage as FourOh4
};