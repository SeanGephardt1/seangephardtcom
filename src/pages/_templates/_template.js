import React from 'react';
import SVG from '../../assets/svgs.js';
import './_template.css';

export default class PageTemplate extends React.Component
{
  static defaultProps = {
    Title: "Page Template",
    LinkTitle: "Page Template",
    Href: "/url/",
    Description: "Page description",
    Icon: SVG.PortfolioPages.Placeholder
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