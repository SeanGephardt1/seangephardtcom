import React from 'react';

export default class PortfolioPage extends React.Component
{
  static defaultProps = {
    Title: "Portfolio, Prototypes, Demos!",
    LinkTitle: "Portfolio",
    Href: "portfolio",
    Icon: "" //SVG.AppNavButtons.About
  };
  constructor ( props )
  {	// GENERIC
    super( props );
    this.Title = ( this.props.Title || this.defaultProps.Title );
    this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
    this.Href = ( this.props.Href || this.defaultProps.Href );

    document.title = this.Title;
    return;
  };
  render()
  {	//	console.debug( "Portfolio.render()", this.props);
    return (
      <div className="page-layout padding30">
        <div className="header centered">{ this.Title }</div>
        <div>On this page, I'd like to showcase a variety of my previous work, including coded prototypes and code samples. </div>
      </div>
    );
  }
};