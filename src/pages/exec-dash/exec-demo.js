import React from 'react';
import './exec-demo.css';
import SVG from '../../assets/svgs.js';

export default class ExecDemoPage extends React.Component
{
  static defaultProps = {
    Title: "Executive Dashboard Demo",
    LinkTitle: "Executive Dashboard Demo",
    Href: "/portfolio/exec-demo/",
    Description: "Generic Page Description for This Demo Page!.For my web site portfolio and beyond and the internets. Lorum Ipsum.",
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
    console.debug( "componentDidMount()" );
    return;
  }
  componentDidUpdate()
  {
    console.debug( "componentDidUpdate()" );
    return;
  };
  componentWillUnmount()
  { 
    console.debug( "componentWillUnmount()" );
    return;
  };
  render()
  {
    console.debug( "PageTemplate.render()" );
    return (
      <div className="exec-root">Executive Demo Page</div>
    );
  }
};