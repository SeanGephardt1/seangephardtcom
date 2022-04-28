import React from 'react';
import './azure-case-study.css';

import AzureHome1 from './azure-resp-home-1.png';
import AzureHome2 from './azure-resp-home-2.png';
import AzureHome3 from './azure-resp-home-3.png';
import AzureHome4 from './azure-resp-home-4.png';
import AzureHome5 from './azure-resp-home-5.png';
import AzureCreate1 from './azure-create-1.png';
import AzureCreate2 from './azure-create-2.png';
import AzureCreate4 from './azure-create-4.png';
import AzureCreate5 from './azure-create-5.png';
import AzureCreate9 from './azure-create-9.png';

export default class AzureCaseStudyDemo extends React.Component
{
  static defaultProps = {
    Title: "Microsoft Azure Portal Prototyping",
    LinkTitle: "Microsoft Azure Prototyping",
    Href: "portfolio/azure-ux",
    Icon: ""//SVG.AppNavButtons.About
  };
  constructor ( props )
  {
    super( props );

    this.Title = ( this.props.Title || this.defaultProps.Title );
    this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
    this.Href = ( this.props.Href || this.defaultProps.Href );

    this.CurrentPortfolioPicture = AzureHome5;
    this.CurrentPortfolioPictureAltText = "testing";

    this.overlay_styles = [
      "portfolio-modal-image",
      "portfolio-modal-image-tall",
      "portfolio-modal-image-wide",
    ];
    this.CurrentOverlayStyle = this.overlay_styles[ 0 ];

    this._demo_0 = "http://seangephardt.com/azure/";
    this._demo_1 = "http://seangephardt.com/azure/#home/custom-roles";

    this.state = {
      displayOverlayPicture: "none"
    }

    document.title = this.Title;
    return;
  };
  OnClick_DisplayModalPicture( img, altText, className, se )
  {	//	console.debug( "OnClick_DisplayModalPicture", img, altText, se );
    this.CurrentPortfolioPicture = img;
    this.CurrentPortfolioPictureAltText = altText;
    this.CurrentOverlayStyle = className;
    this.setState( { displayOverlayPicture: "block" } );
    return;
  };
  OnClick_HideModalPicture( se )
  {	//	console.debug( "OnClick_HideModalPicture");
    this.setState( { displayOverlayPicture: "none" } );
    return;
  };
  OnClick_ShowDemo( val, ev )
  { //  console.debug( 'OnClick_ShowDemo', val );
    if ( val === 0 )
    {
      window.open( this._demo_0 );

    }
    else if ( val === 1 )
    {
      window.open( this._demo_1 );
    }
    return;
  }
  render()
  {
    return (
      <div className="page-layout padding30">
        { /* overlay panel */ }
        <div
          className="portfolio-modal-overlay"
          title="Click anywhere to close"
          onClick={ this.OnClick_HideModalPicture.bind( this ) }
          style={ { display: this.state.displayOverlayPicture } }>
          <img
            className={ this.CurrentOverlayStyle }
            src={ this.CurrentPortfolioPicture }
            alt={ this.CurrentPortfolioPictureAltText }
          />
          <div
            className="portfolio-modal-text"
            title={ this.CurrentPortfolioPictureAltText }>{ this.CurrentPortfolioPictureAltText }</div>
        </div>

        {/* Microsoft Azure Home page - Responsive & accessible layout */ }
        <div className="portfolio-block">

          <div className="bd-page-title">Microsoft Azure Portal Responsive Layout</div>

          <div className="bd-page-description">
            <button
              tabIndex="0"
              className="app-btn"
              onClick={ this.OnClick_ShowDemo.bind( this, 0 ) }
              onKeyPress={ this.OnClick_ShowDemo.bind( this, 0 ) }
            >Interactive Demo</button>
          </div>

          <div className="portfolio-text">This project focused on improving the experiences for customers of the Microsoft Azure Management portal. The main goals were aimed at improving the expereince on mobile devices and to also comply with web browser based accessibility standards and federal US regulations, with the goal of increasing the NPS ("net promoter score") KPI used to drive the business.</div>

          <div className="portfolio-text">Because of the complexity of interactions built into the UI of this application, designing for the breadth of mobile devices used by the IT community was our top priority. IT professionals needed to be able to monitor the services they own from any location on any device. Our related priority in this scenario was to make all interactions and page elements comply with accessiblbility standards and regulations.</div>

          <div className="portfolio-text">To address the existing issues with the page design, we began by changing the behavior of the main navigation component, bringing it up to date by leveraging a modern design & feel by choosing to not display the menu unless a user explicitedly clicks on the "hamburger" icon in the top left. Other  navigation elements in the top header were simplified both by allowing responsive resizing and single click interactions. The decision to allow the page sections to re-flow based on the customer's screen resolution also created a more fluid visual appeal.</div>

          <div className="portfolio-text">The "Search" feature was changed to resize to the entire width of the header, with a back button to let customers easily exit out of the mobile search experience. Search results are rendered dynamically based on a combination of customer resources & federated search results, so creating a way for customer to find thier specific resources or documentation was of paramount importance.</div>

          <div className="image-list">
            <img src={ AzureHome1 } alt="Microsoft Azure mobile home page 1" onClick={ this.OnClick_DisplayModalPicture.bind( this, AzureHome1, "Microsoft Azure mobile home page 1", this.overlay_styles[ 1 ] ) } />
            <img src={ AzureHome2 } alt="Microsoft Azure mobile home page 2" onClick={ this.OnClick_DisplayModalPicture.bind( this, AzureHome2, "Microsoft Azure mobile home page 2", this.overlay_styles[ 1 ] ) } />
            <img src={ AzureHome3 } alt="Microsoft Azure mobile home page 3" onClick={ this.OnClick_DisplayModalPicture.bind( this, AzureHome3, "Microsoft Azure mobile home page 3", this.overlay_styles[ 1 ] ) } />
            <img src={ AzureHome4 } alt="Microsoft Azure mobile home page 4" onClick={ this.OnClick_DisplayModalPicture.bind( this, AzureHome4, "Microsoft Azure mobile home page 4", this.overlay_styles[ 1 ] ) } />
            <img src={ AzureHome5 } alt="Microsoft Azure mobile home page 5" onClick={ this.OnClick_DisplayModalPicture.bind( this, AzureHome5, "Microsoft Azure mobile home page 5", this.overlay_styles[ 1 ] ) } />
          </div>
        </div>


        {/* Microsoft Azure - Create Design Pattern */ }
        <div className="portfolio-block">

          <div className="bd-page-title">Microsoft Azure "Create Flow" Design Pattern</div>

          <div className="bd-page-description">
            <button
              tabIndex="0"
              className="app-btn"
              onClick={ this.OnClick_ShowDemo.bind( this, 1 ) }
              onKeyPress={ this.OnClick_ShowDemo.bind( this, 1 ) }
            >Interactive Demo</button>
          </div>

          <div className="portfolio-text">The key focus for the Azure Portal business is allow customers to easily create new resources & services for any of thier business needs, and creating "Software as a Service" (SaaS) resources can be very complex given the nature of logistical & security requirements. The stated goal of this project was to reduce customer abandonment during these experiences and drive an increase in service adoption as well as customer satisfaction.
          </div>

          <div className="portfolio-text">To support the 100+ services available on the platform, a design pattern was needed to allow for extensibility of the templates used to create each specific service. This design pattern also needed to support service & platform specific attribution such as tagging, schema validation, along with localization and accessibility aspects. It was decided to create a wizard like form design that would allow a customer to simply review and select the required defaults of a service, and/or determine the specific implementation configuration details of the service.
          </div>

          <div className="portfolio-text">This pattern also makes use multiple child controls that provide the ability to modify & validate resource specific parameters, such as date & time configration, product SKU, disk size, etc. Examples of these controls include
            <ul>
              <li>"Pop over" modal dialog to prompt users for additional input</li>
              <li>Inline parameter validation & logic allows a customer to create additional services</li>
              <li>Context panel from the right side, to allow for detailed form level configuration settings</li>
              <li>Service level validation & a detailed summary review of the currently select configuration settings</li>
            </ul>
          </div>

          <div className="image-list">
            <img src={ AzureCreate1 } alt="Microsoft Azure Create Pattern 1" onClick={ this.OnClick_DisplayModalPicture.bind( this, AzureCreate1, "Microsoft Azure Create Pattern 1", this.overlay_styles[ 2 ] ) } />
            <img src={ AzureCreate2 } alt="Microsoft Azure Create Pattern 2" onClick={ this.OnClick_DisplayModalPicture.bind( this, AzureCreate2, "Microsoft Azure Create Pattern 2", this.overlay_styles[ 2 ] ) } />
            <img src={ AzureCreate4 } alt="Microsoft Azure Create Pattern 4" onClick={ this.OnClick_DisplayModalPicture.bind( this, AzureCreate4, "Microsoft Azure Create Pattern 4", this.overlay_styles[ 2 ] ) } />
            <img src={ AzureCreate9 } alt="Microsoft Azure Create Pattern 9" onClick={ this.OnClick_DisplayModalPicture.bind( this, AzureCreate9, "Microsoft Azure Create Pattern 9", this.overlay_styles[ 2 ] ) } />
            <img src={ AzureCreate5 } alt="Microsoft Azure Create Pattern 5" onClick={ this.OnClick_DisplayModalPicture.bind( this, AzureCreate5, "Microsoft Azure Create Pattern 5", this.overlay_styles[ 2 ] ) } />

          </div>
        </div>

      </div>
    );
  }
};
