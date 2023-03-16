import React from 'react';
import SVG from '../../assets/svgs.js';
import VerticalBarChart from './controls/vert-bar-chart.js';

export default class ExecDashboardPage extends React.Component
{
  static defaultProps = {
    Title: "exec.dash",
    LinkTitle: "Home",
    Href: "/portfolio/exec-demo",
    Description: "exec.dash is a management style dashboard web application, built using React.js, HTML5, CSS and SVG. All controls are using dynamic data.",
    Icon: SVG.Brands.ExecDemoBrand
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
    //  <div className="ehp-test">{ SVG.Brands.ExecDemoBrand }</div>
    return (
      <>
        <div className="ed-header">Dashboard</div>
        <div>
          <VerticalBarChart />
        </div>
      </>
    );
  }
};