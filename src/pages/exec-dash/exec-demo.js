import React from 'react';
import './exec-demo.css';

export default class ExecDemoPage extends React.Component
{
  static defaultProps = {
    Title: "AzureCaseStudyDemo",
    LinkTitle: "AzureCaseStudyDemo",
    Href: "/portfolio/exec-demo/",
    Description: "Page description",
    Icon: "" // SVG.AppNavButtons.About
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