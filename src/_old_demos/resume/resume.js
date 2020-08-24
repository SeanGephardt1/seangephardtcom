import React from 'react';
//import './resume.css';

export class ResumeExtension extends React.Component
{
	//	static contextType = AzureThemeContext;
	static defaultProps = {
		Title: "Resume for Sean Gephardt",
		LinkTitle: "Resume",
		Href: "/resume/"
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || ResumeExtension.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || ResumeExtension.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || ResumeExtension.defaultProps.Href );

		return;
	};
	render()
	{	//	console.debug("ResumeExtension.render()", this.Title);	
		return (
			<div className="page-main">
				<div className="page-block">
					<div>
						<h1>Skills</h1>
						<ul>
						<li>10+ years of professional software development experience in enterprise level projects</li>
						<li>10+ years experience using design tools such as Adobe Photoshop, Illustrator, XD & Figma</li>
						<li>Concise and succinct verbal and written communications style</li>
						<li>Dedication to fostering great cross-team & cross-function working relationships</li>
						<li>Expertise in web browser technologies such as XHTML/HTML5, CSS, JavaScript</li>
						<li>Deep working knowledge of Microsoft development technologies, including C#, ASP.NET, Visual Studio and Microsoft Azure</li>
						</ul>
					</div>
				</div>

				<div className="page-block">
					<h1>Experience</h1>
					<div className="marg-top-10">
						<h3>Microsoft Corporation</h3>
						<h4>Senior Design Engineer (November 2017 - December 2019)</h4>
						<ul>
							<li>Development of both a NodeJS/ReactJS based & a KnockOut.JS based HTML/JavaScript/CSS prototyping frameworks to facilitate online, remote & in-person customer UX research on features and functionality for the Microsoft Azure Management Portal.</li>
							<li>Daily collaboration between program managers, engineers, designers and researchers to support weekly, monthly and quarterly cadences for online & in person customer research studies & surveys</li>
							<li>Participation in weekly UX/UI prioritization meetings and design reviews of a broad range UX feature designs across 100+ supported internal partner teams</li>
							<li>Support and maintenance of my team’s instance of Azure DevOps & GIT repositories, to allow for workflow tracking, issue resolution, project collaboration and continuous integration/deployment of prototyping projects.</li>
							<li>Acting as a key liaison & contributor for cross-organizational collaboration efforts & communications for the Microsoft web-based “Fluent Design System”. https://www.microsoft.com/design/fluent/#/web</li>
							<li>Provide career guidance and technical mentorship to junior team members, including designers and design engineers.</li>
						</ul>
					</div>

					<div className="marg-top-10">
						<h3>Allovus Design Group</h3>
						<h4>Design Engineer (June 2013 - April 2015 & November 2016 – November 2017)</h4>
						<ul>
							<li>Development of interactive prototypes for usability studies, user research and executive presentations for the Microsoft “Azure” & “Windows Server” Product Groups. Utilizing a proprietary development framework based on modern web technologies including HTML5/XML, CSS3, and JavaScript & JSON libraries such as jQuery & KnockOut.js</li>
							<li>Coordination with user design research leads and graphic designers on short term project, resulting in quantitative & qualitative usability research data.</li>
							<li>Providing accurate development and testing estimates and costing, based on the features provided by the product team to be studied.</li>
							<li>Collaboration with external design team members regarding changes to behavioral user interaction prototype development framework code base.</li>
						</ul>
					</div>

					<div className="marg-top-10">
						<h3>WaferWire LLC</h3>
						<h4>Senior Technical Program Manager (April 2015 - November 2016)</h4>
						<ul>
							<li>Driving significant improvements in SEO (search engine optimization) for Microsoft’s public facing developer and IT documentation websites, including https://msdn.microsoft.com/ , https://technet.microsoft.com/ and https://docs.microsoft.com/</li>
							<li>Providing technical guidance and support regarding for multiple content publishing tools for the MSDN & TechNet site management team and partners.</li>
							<li>Providing ongoing website business intelligence reporting for partner owned sub-sites on the aforementioned larger public websites.</li>
							<li>Collaboration with internal Microsoft’s developer evangelism and marketing teams to produce and schedule the publishing of time sensitive content for the web.</li>
							<li>Collaboration with external design team regarding changes to behavioral user functionality for the developer and information technologist audience websites</li>
							<li>Collaboration with external localization team regarding localization of content and assets for international functionality for the developer and information technologist audience websites.</li>
						</ul>
					</div>

					<div className="marg-top-10">
						<h3>Digital KPI Consulting</h3>
						<h4>Software Development & Business Intelligence Analysis (August 2012 – June 2013) for Microsoft USCMO</h4>
						<ul>
							<li>Development & extension of Selenium Web Testing framework & qUnit JavaScript Testing Framework for business intelligence file verification for microsoftstore.com & related websites.</li>
							<li>Development of custom JavaScript/jQuery files related to related business intelligence for microsoftstore.com, generationapp.com, msdn.microsoft.com & technet.microsoft.com</li>
							<li>Analysis & maintenance of custom SQL database & code for changing customer business intelligence requirements</li>
							<li>Development support for business intelligence related JavaScript files deployed to Microsoft production websites</li>
							<li>Development of SQL code for business intelligence analysis for data collected via Microsoft E-Commerce sites</li>
						</ul>
					</div>

					<div className="marg-top-10">
						<h3>VMC Consulting</h3>
						<h4>Senior Technical Program Manager (February 2012-August 2012) for Microsoft Corporation</h4>
						<ul>
							<li>Refined the software development workflow utilizing Microsoft Visual Studio Team Foundation System, using a hybrid of SCRUM & AGILE methodologies.</li>
							<li>Reduced total cost of ownership (“TCO”) for hosting an intranet HTML5/jQuery BI reporting application</li>
							<li>Team management of day-to-day workflow for business intelligence reporting, and intranet web application development & support.</li>
							<li>Provide customer & partner technical support for business process related work items.</li>
							<li>Provide bi-weekly & monthly progress communications for senior management.</li>
						</ul>
					</div>

					<div  className="marg-top-10">
						<h3>Microsoft Corporation</h3>
						<h4>Program Manager II (May 2007 – December 2011)</h4>
						<ul>
							<li>Development of a search engine optimization (SEO) strategy and process used by key content publishing teams to improve the discovery of technical content & application content for the Microsoft developer audience that led to a 30%+ improvement in search referral traffic and 85% coverage within search engine indices..</li>
							<li>Driving and supporting a real time RSS aggregation & discovery system, which supports collection of over 20,000 syndication feeds, and it exposed on over 100+ Microsoft websites.</li>
							<li>Managed a migration & support project of 200+ custom web-based user interface controls & other rendering platform features across 200+ websites for a partner base of 400+ content publishers, utilizing custom-built content management tools.</li>
							<li>Management of a 10+ person web development team including FTE & vendor resources, to support the core user interface features of the Microsoft Developer Network (MSDN) & TechNet online websites, using SCRUM/AGILE/Waterfall methodologies, utilizing Visual Studio 2010 Team Foundation Server (VTFS).</li>
							<li>Management of an international subsidiary development on-boarding program, including defining the stakeholder, partner and vendor engagement agreements, and overseeing the development & testing procedures and release management processes for 5 international subsidiaries</li>
							<li>Acted as a key technical liaison for user interface features & search engine optimization features for related partnership collaboration efforts & cross organizational communication.</li>
							<li>Providing deep architectural guidance, project reporting & timeline scheduling, technical support and training for organizational engineering, content & site management teams.</li>
						</ul>
						<h4>Software Development Engineer 3 (January 2000 – May 2007)</h4>
						<ul>
							<li>Migration & redesign of the Microsoft Industry Solution Websites.</li>
							<li>Development of search metadata filtering user experience for Visual Studio. NET 2002 & 2003 products</li>
							<li>Developing federated search web services for the Visual Studio 2005 in-product content index experience</li>
							<li>Migration of the MSDN & TechNet website user interface rendering platforms from ASP to ASP.NET</li>
							<li>Development of HTML/CSS/JavaScript/jQuery based user interface controls for MSDN & TechNet technical reference websites.</li>
							<li>Ongoing development and support for team wide development processes, including code reviews, project costing, schedule & timeline definitions, and project work item tracking.</li>
						</ul>
					</div>

				</div>
			</div>
		);
	};
};