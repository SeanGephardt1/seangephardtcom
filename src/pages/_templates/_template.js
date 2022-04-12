import React from './react';
import './_template.css';

export default class PageTemplate extends React.Component
{
  static defaultProps = {
    Title: "WebGL Demos",
    LinkTitle: "WebGL Demos",
    Href: "/demos/webgl/",
    Icon: "" // SVG.AppNavButtons.About
  };
  constructor ( props )
  {
    // GENERIC
    super( props );
    document.title = this.props.Title;
    this.state = {
      debug: false,
    };
    return;
  };
  render()
  {
    console.debug( "PageTemplate.render()" );
    return (
      <div className="page-layout">Page Template</div>
    );
  }
};