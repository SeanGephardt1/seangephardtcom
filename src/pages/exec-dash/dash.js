import React from 'react';
import SVG from '../../assets/svgs.js';
import VerticalBarChart from './controls/vert-bar-chart.js';

export default class ExecDashboardPage extends React.Component
{
  static defaultProps = {
    Title: "Executive Dashboard Demo",
    LinkTitle: "Dashboard",
    Href: "/portfolio/exec-demo",
    Description: "This page is an example of a executive management dashboard. All controls are using dynamic data.",
    Icon: SVG.PortfolioPages.ExecDemo
  };
  constructor ( props )
  { // GENERIC
    super( props );
    document.title = this.props.Title;
    this.state = {
      debug: false,
    };
    return;
  };

  /* REACT LIFECYCLE */
  componentDidMount()
  {
    //  console.debug( "componentDidMount()" );
    return;
  }
  componentDidUpdate()
  {
    //  console.debug( "componentDidUpdate()" );
    return;
  };
  componentWillUnmount()
  { 
    //  console.debug( "componentWillUnmount()" );
    return;
  };
  render()
  {
    //  console.debug( "ExecDashboardPage.render()" );
    return (
      <>
        <div className="ed-header">Dashboard</div>
        <div className="ehp-test">{ SVG.Brands.ExecDemoBrand }</div>
        <div>
          <VerticalBarChart />
        </div>
      </>
    );
  }
};