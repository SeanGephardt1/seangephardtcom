import React from 'react';
import SVG from '../../assets/svgs.js';

export default class ExecAppsPage extends React.Component
{
  static defaultProps = {
    Title: "Executive Dashboard Demo - Apps",
    LinkTitle: "Apps",
    Href: "/portfolio/exec-demo/apps",
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
    //  console.debug( "PageTemplate.render()" );
    return (
      <div className="exec-demo-content">
        <div>APPS PAGE</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
        <div>Executive Demo</div>
      </div>
    );
  }
};