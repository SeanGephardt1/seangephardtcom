import React from 'react';
import './_template.css';

export default class PageTemplate extends React.Component
{
  static defaultProps = {
    Title: "Page Template",
    LinkTitle: "Page Template",
    Href: "/url/",
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
      <div className="page-layout">Page Template</div>
    );
  }
};