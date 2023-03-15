import React from 'react';
import PortfolioSiteNavigation from '../../controls/nav/nav-portfolio.js';

export default class PortfolioPage extends React.Component
{
  static defaultProps = {
    Title: "Portfolio, Prototypes, Demos!",
    LinkTitle: "Portfolio",
    Href: "portfolio",
    Description: "On this page, I'd like to showcase a variety of my previous work, including coded prototypes and code samples. On this page, I'd like to showcase a variety of my previous work, including coded prototypes and code samples. On this page, I'd like to showcase a variety of my previous work, including coded prototypes and code samples. On this page, I'd like to showcase a variety of my previous work, including coded prototypes and code samples. On this page, I'd like to showcase a variety of my previous work, including coded prototypes and code samples. On this page, I'd like to showcase a variety of my previous work, including coded prototypes and code samples.",
    Icon: undefined
  };
  constructor ( props )
  {	// GENERIC
    super( props );
    this.Title = ( this.props.Title || this.defaultProps.Title );
    this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
    this.Href = ( this.props.Href || this.defaultProps.Href );
    this.Desc = ( this.props.Description || this.defaultProps.Description );

    document.title = this.Title;
    return;
  };
  render()
  {	//	console.debug( "Portfolio.render()", this.props);
    return (
      <div className="page-layout">
        <div className="page-header">{ this.Title }</div>
        <div className="page-section">{ this.Desc }</div>
        <PortfolioSiteNavigation />
      </div>
    );
  }
};