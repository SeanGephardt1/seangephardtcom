import React from 'react';
import './portfolio.css';
import AzureHome1 from './azure-resp-home-1.png';
import AzureHome2 from './azure-resp-home-2.png';
import AzureHome3 from './azure-resp-home-3.png';
import AzureHome4 from './azure-resp-home-4.png';
import AzureHome5 from './azure-resp-home-5.png';
import AzureCreate1 from './azure-create-1.png';
import AzureCreate2 from './azure-create-2.png';
//import AzureCreate3 from './azure-create-3.png';
import AzureCreate4 from './azure-create-4.png';
import AzureCreate5 from './azure-create-5.png';
import AzureCreate9 from './azure-create-9.png';


export class PortfolioExtension extends React.Component
{
	static defaultProps = {
		Title: "Interaction Design Portfolio for Sean Gephardt",
		LinkTitle: "Portfolio",
		Href: "/portfolio/"
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || PortfolioExtension.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || PortfolioExtension.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || PortfolioExtension.defaultProps.Href );

		this.CurrentPortfolioPicture = AzureHome5;
		this.CurrentPortfolioPictureAltText = "testing";

		this.state = {
			displayOverlayPicture: "none"
		}

		return;
	};
	OnClick_DisplayModalPicture(img, altText, se )
	{	//	console.debug( "OnClick_DisplayModalPicture", img, altText, se );
		this.CurrentPortfolioPicture = img;
		this.CurrentPortfolioPictureAltText = altText;
		this.setState( { displayOverlayPicture: "block" } );
		return;
	};
	OnClick_HideModalPicture( se )
	{	//	console.debug( "OnClick_HideModalPicture");
		this.setState( { displayOverlayPicture: "none" } );
		return;
	};
	render()
	{	//	console.debug( "PortfolioExtension.render()", this.state.displayOverlayPicture );	
		return (
			<div className="page-main">

				<div
					className="portfolio-modal-overlay"
					title="Click anywhere to close"
					onClick={this.OnClick_HideModalPicture.bind( this )}
					style={{ display: this.state.displayOverlayPicture }}>
					<img
						className="portfolio-modal-image"
						src={this.CurrentPortfolioPicture}
						alt={this.CurrentPortfolioPictureAltText} />
					<div
						className="portfolio-modal-text"
						title={this.CurrentPortfolioPictureAltText}>{this.CurrentPortfolioPictureAltText}</div>
				</div>

				<div className="page-block">
					<h2>What is "User Experience interaction"?</h2>
					<div className="marg-top-10">My recent work has been focused on creating high fidelity, interactive prototypes of user experience scenarios utilizing HTML, CSS & JavaScript, that go beyond wireframes and static mock ups. This methodology allows researchers to collect succinct quanatative & qualitative data on expectations from the customers who will be using a product that the experience is designed for. It's also valuable after research has been completed as a way to provide engineering a preliminary code base to integrate and implement the scenario and features. For example, this entire portfolio site is being created using the ReactJs framework & related JavaScript libraries, as well as HTML 5 & CSS 3. 
					</div>
					<div className="marg-top-10">To view larger versions of images presented below, either mouse over the image for a inline scaled view or click the image for a fullscreen rendering.
					</div>
				</div>

				{/* Microsoft Azure Home page - Responsive & accessible layout */}
				<div className="page-block">
					<h2>Microsoft Azure Home responsive & accessible layout</h2>
					<h5><a href="http://seangephardt.com/azure/"  target="_new">Interactive Demo</a></h5>
					<div className="marg-top-10">This project focused on improving the experiences for customers of the Microsoft Azure Management portal. The main goals were aimed at improving the expereince on mobile devices and to also comply with web browser based accessibility standards and federal US regulations, with the goal of increasing the NPS ("net promoter score") KPI used to drive the business.
					</div>
					<div className="marg-top-10">Because of the complexity of interactions built into the UI of this application, designing for the breadth of mobile devices used by the IT community was our top priority. IT professionals needed to be able to monitor the services they own from any location on any device. Our related priority in this scenario was to make all interactions and page elements comply with accessiblbility standards and regulations.
					</div>
					<div className="marg-top-10">To address the existing issues with the page design, we began by changing the behavior of the main navigation component, bringing it up to date by leveraging a modern design & feel by choosing to not display the menu unless a user explicitedly clicks on the "hamburger" icon in the top left. Other  navigation elements in the top header were simplified both by allowing responsive resizing and single click interactions. The decision to allow the page sections to re-flow based on the customer's screen resolution also created a more fluid visual appeal.
					</div>
					<div  className="marg-top-10">The "Search" feature was changed to resize to the entire width of the header, with a back button to let customers easily exit out of the mobile search experience. Search results are rendered dynamically based on a combination of customer resources & federated search results, so creating a way for customer to find thier specific resources or documentation was of paramount importance.
					</div>
					<div className="image-list">
						<img src={AzureHome1} alt="Microsoft Azure mobile home page 1" onClick={this.OnClick_DisplayModalPicture.bind(this,AzureHome1, "Microsoft Azure mobile home page 1")} />
						<img src={AzureHome2} alt="Microsoft Azure mobile home page 2"  onClick={this.OnClick_DisplayModalPicture.bind(this,AzureHome2, "Microsoft Azure mobile home page 2")}/>
						<img src={AzureHome3} alt="Microsoft Azure mobile home page 3"  onClick={this.OnClick_DisplayModalPicture.bind(this,AzureHome3, "Microsoft Azure mobile home page 3")}/>
						<img src={AzureHome4} alt="Microsoft Azure mobile home page 4"  onClick={this.OnClick_DisplayModalPicture.bind(this,AzureHome4, "Microsoft Azure mobile home page 4")}/>
						<img src={AzureHome5} alt="Microsoft Azure mobile home page 5"  onClick={this.OnClick_DisplayModalPicture.bind(this,AzureHome5, "Microsoft Azure mobile home page 5")}/>
					</div>
				</div>


				{/* Microsoft Azure - Create Design Pattern */}				
				<div className="page-block">
					<h2>Microsoft Azure "Create Flow" design pattern</h2>
					<h5><a href="http://seangephardt.com/azure/#home/custom-roles" target="_new">Interactive Demo</a></h5>
					<div className="marg-top-10">The key focus for the Azure Portal business is allow customers to easily create new resources & services for any of thier business needs, and creating "Software as a Service" (SaaS) resources can be very complex given the nature of logistical & security requirements. The stated goal of this project was to reduce customer abandonment during these experiences and drive an increase in service adoption as well as customer satisfaction. 
					</div>
					<div className="marg-top-10">To support the 100+ services available on the platform, a design pattern was needed to allow for extensibility of the templates used to create each specific service. This design pattern also needed to support service & platform specific attribution such as tagging, schema validation, along with localization and accessibility aspects. It was decided to create a wizard like form design that would allow a customer to simply review and select the required defaults of a service, and/or determine the specific implementation configuration details of the service.
					</div>
					<div className="marg-top-10">This pattern also makes use multiple child controls that provide the ability to modify & validate resource specific parameters, such as date & time configration, product SKU, disk size, etc. Examples of these controls include
						<ul>
							<li>"Pop over" modal dialog to prompt users for additional input</li>
							<li>Inline parameter validation & logic allows a customer to create additional services</li>
							<li>Context panel from the right side, to allow for detailed form level configuration settings</li>
							<li>Service level validation & a detailed summary review of the currently select configuration settings</li> 
						</ul>
					</div>

					<div className="image-list">
						<img src={AzureCreate1} alt="Microsoft Azure Create Pattern 1" onClick={this.OnClick_DisplayModalPicture.bind(this,AzureCreate1, "Microsoft Azure Create Pattern 1")} />
						<img src={AzureCreate2} alt="Microsoft Azure Create Pattern 2"  onClick={this.OnClick_DisplayModalPicture.bind(this,AzureCreate2, "Microsoft Azure Create Pattern 2")}/>
						<img src={AzureCreate4} alt="Microsoft Azure Create Pattern 4"  onClick={this.OnClick_DisplayModalPicture.bind(this,AzureCreate4, "Microsoft Azure Create Pattern 4")}/>
						<img src={AzureCreate9} alt="Microsoft Azure Create Pattern 9" onClick={this.OnClick_DisplayModalPicture.bind( this, AzureCreate9, "Microsoft Azure Create Pattern 9" )} />
						<img src={AzureCreate5} alt="Microsoft Azure Create Pattern 5" onClick={this.OnClick_DisplayModalPicture.bind( this, AzureCreate5, "Microsoft Azure Create Pattern 5" )} />

					</div>
				</div>
				

			</div>
		);
	};
};