//  Update for React router 6
//  Used in ./app.js & ./controls/nav/navigation.js
import * as React from "react";
import { useRoutes } from "react-router-dom";

// react layout pages
import LayoutPage from "./layout.js";
import PortfolioLayoutPage from "./layout-portfolio.js";
import DashboardDemoLayoutPage from "./layout-dashboard-demo.js";

// general pages
import FourOhFourPage from "./404/404.js";
import TestPage from "./test/test.js";
import Home from "./home/home.js";
import Resume from "./resume/resume.js";
import PortfolioPage from "./portfolio/portfolio.js";
import MusicPage from "./music/music.js";
import SvgDDD from "./svg-ddd/svg-ddd.js";

// executive dashboard demo pages
import ExecDashboardPage from "./exec-dash/dash.js";
import ExecReportsPage from "./exec-dash/reports.js";
import ExecAppsPage from "./exec-dash/apps.js";
import ExecConfigPage from "./exec-dash/config.js";
import ExecHelpPage from "./exec-dash/help.js";

// portfolio level pages
import WebWorkerDemo from "./web-worker-demo/web-worker-demo.js";
import SvgZoomDemo from "./svg-zoom/svg-zoom.js";
import WebGLDemo from "./webgl-demo/webgl-demo.js";
import AzureCaseStudyDemo from "./azure-ux/azure-case-study.js";
import AudioToysDemoPage from "./audio-toys/audio-toys.js";

const _nav_routes = [
  {
    component: Home,
  },
  {
    component: Resume,
  },
  {
    component: PortfolioPage,
    children: [
      {
        component: ExecDashboardPage,
      },
      {
        component: SvgDDD,
      },
      {
        component: AzureCaseStudyDemo,
      },
      {
        component: AudioToysDemoPage,
      },
      {
        component: WebWorkerDemo,
      },
      {
        component: SvgZoomDemo,
      },
      {
        component: WebGLDemo,
      },
    ],
  },
  {
    component: MusicPage,
  },
  {
    component: TestPage,
  },
];

const _app_routes = [
  /* main site routes */
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
            element: <PortfolioPage />,
          },
          {
            path: SvgDDD.defaultProps.Href,
            elemetn: <SvgDDD />,
          },
          //{
          //  path: ExecDemoPage.defaultProps.Href,
          //  element: <ExecDemoPage />,
          //},
          {
            path: AzureCaseStudyDemo.defaultProps.Href,
            element: <AzureCaseStudyDemo />,
          },
          {
            path: AudioToysDemoPage.defaultProps.Href,
            element: <AudioToysDemoPage />,
          },
          {
            path: WebWorkerDemo.defaultProps.Href,
            element: <WebWorkerDemo />,
          },
          {
            path: WebGLDemo.defaultProps.Href,
            element: <WebGLDemo />,
          },
          {
            path: SvgZoomDemo.defaultProps.Href,
            element: <SvgZoomDemo />,
          },
          {
            path: AzureCaseStudyDemo.defaultProps.Href,
            element: <AzureCaseStudyDemo />,
          },
        ],
      },
      {
        path: MusicPage.defaultProps.Href,
        element: <MusicPage />,
      },
      {
        path: TestPage.defaultProps.Href,
        element: <TestPage />,
      },
      {
        path: "*",
        element: <FourOhFourPage />,
      },
    ],
  },

  /* executive dashboard demo routes */
  {
    path: ExecDashboardPage.defaultProps.Href,
    element: <DashboardDemoLayoutPage />,
    children: [
      {
        index: true,
        element: <ExecDashboardPage />,
      },
      {
        path: ExecReportsPage.defaultProps.Href,
        element: <ExecReportsPage />,
      },
      {
        path: ExecAppsPage.defaultProps.Href,
        element: <ExecAppsPage />,
      },
      {
        path: ExecConfigPage.defaultProps.Href,
        element: <ExecConfigPage />,
      },
      {
        path: ExecHelpPage.defaultProps.Href,
        element: <ExecHelpPage />,
      },
      {
        path: "*",
        element: <FourOhFourPage />,
      },
    ],
  },
];

function AppRoutes() {
  return useRoutes(_app_routes);
}

export { _nav_routes as NavList, _app_routes as RoutesList, AppRoutes, FourOhFourPage as FourOh4 };
