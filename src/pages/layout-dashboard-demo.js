import React from 'react';
import { Outlet } from "react-router-dom";
import './exec-dash/css/exec-dash.css';
import ExecHeader from './exec-dash/controls/header.js';
import ExecNav from './exec-dash/controls/nav.js';
import ExecFooter from './exec-dash/controls/footer.js';

export default class DashboardDemoLayoutPage extends React.Component
{
  constructor ( props )
  {
    super( props );
    return;
  };
  render()
  {
    //  console.debug( "PortfolioLayoutPage.render()", React.version );
    return (
      <div className="exec-demo-layout">
        <ExecHeader />
        <div className="exec-demo-main">
          <ExecNav />
          <div className="exec-demo-content">
            <Outlet />
          </div>
        </div>
        <ExecFooter />
      </div>
    );
  }
};