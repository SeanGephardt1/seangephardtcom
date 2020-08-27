import React from 'react';
import { ThemeContext } from '../../js/theme-context.js';
import './resume.css';
import SVG from '../../art/svgs.js';

export default class Resume extends React.Component
{
	static contextType = ThemeContext;
	static defaultProps = {
		Title: "Resume for Sean Gephardt",
		LinkTitle: "Resume",
		Href: "/resume/",
		Icon: SVG.AppNavButtons.Resume
	};
	constructor( props )
	{
		super( props );

		this.Title = ( this.props.Title || Resume.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || Resume.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || Resume.defaultProps.Href );
		document.title = this.Title;
		return;
	};
	render()
	{	//	console.debug("ResumeExtension.render()", this.Title);	
		return (
			<div className="resume-layout">

				<div className="resume-left">

					<div className="cv-section">
						<div className="cv-header">Microsoft Corporation</div>
						<div className="cv-sub-header">Senior Designer Engineer (Nov. 2017 - Dec. 2019)</div>
						<ul>
							<li>Development of both a NodeJS/ReactJS based & a KnockOut.JS based HTML/JavaScript/CSS prototyping frameworks to facilitate online, remote & in-person customer UX research on features and functionality for the Microsoft Azure Management Portal.</li>
							<li>Daily collaboration between program managers, engineers, designers and researchers to support weekly, monthly and quarterly cadences for online & in person customer research studies & surveys</li>
							<li>Participation in weekly UX/UI prioritization meetings and design reviews of a broad range UX feature designs across 100+ supported internal partner teams</li>
							<li>Support and maintenance of my team’s instance of Azure DevOps & GIT repositories, to allow for workflow tracking, issue resolution, project collaboration and continuous integration/deployment of prototyping projects.</li>
							<li>Acting as a key liaison & contributor for cross-organizational collaboration efforts & communications for the Microsoft web-based “Fluent Design System”. https://www.microsoft.com/design/fluent/#/web</li>
							<li>Provide career guidance and technical mentorship to junior team members, including designers and design engineers.</li>
						</ul>
					</div>

					<div className="cv-section">
						<div className="cv-header">Allovus Design Group</div>
						<div className="cv-sub-header">Design Engineer (June 2013 - April 2015 & Nov. 2016 – Nov. 2017)</div>
						<ul>
							<li>Development of interactive prototypes for usability studies, user research and executive presentations for the Microsoft “Azure” & “Windows Server” Product Groups. Utilizing a proprietary development framework based on modern web technologies including HTML5/XML, CSS3, and JavaScript & JSON libraries such as jQuery & KnockOut.js</li>
							<li>Coordination with user design research leads and graphic designers on short term project, resulting in quantitative & qualitative usability research data.</li>
							<li>Providing accurate development and testing estimates and costing, based on the features provided by the product team to be studied.</li>
							<li>Collaboration with external design team members regarding changes to behavioral user interaction prototype development framework code base.</li>
						</ul>
					</div>

					<div className="cv-section">
						<div className="cv-header">WaferWire LLC</div>
						<div className="cv-sub-header">Senior Technical Program Manager (April 2015 - Nov. 2016)</div>
						<ul>
							<li>Driving significant improvements in SEO (search engine optimization) for Microsoft’s public facing developer and IT documentation websites, including https://msdn.microsoft.com/ , https://technet.microsoft.com/ and https://docs.microsoft.com/</li>
							<li>Providing technical guidance and support regarding for multiple content publishing tools for the MSDN & TechNet site management team and partners.</li>
							<li>Providing ongoing website business intelligence reporting for partner owned sub-sites on the aforementioned larger public websites.</li>
							<li>Collaboration with internal Microsoft’s developer evangelism and marketing teams to produce and schedule the publishing of time sensitive content for the web.</li>
							<li>Collaboration with external design team regarding changes to behavioral user functionality for the developer and information technologist audience websites</li>
							<li>Collaboration with external localization team regarding localization of content and assets for international functionality for the developer and information technologist audience websites.</li>
						</ul>
					</div>

					<div className="cv-section">
						<div className="cv-header">Digital KPI Consulting</div>
						<div className="cv-sub-header">Business Intelligence Development (Aug 2012 – June 2013) for Microsoft USCMO</div>
						<ul>
							<li>Development & extension of Selenium Web Testing framework & qUnit JavaScript Testing Framework for business intelligence file verification for microsoftstore.com & related websites.</li>
							<li>Development of custom JavaScript/jQuery files related to related business intelligence for microsoftstore.com, generationapp.com, msdn.microsoft.com & technet.microsoft.com</li>
							<li>Analysis & maintenance of custom SQL database & code for changing customer business intelligence requirements</li>
							<li>Development support for business intelligence related JavaScript files deployed to Microsoft production websites</li>
							<li>Development of SQL code for business intelligence analysis for data collected via Microsoft E-Commerce sites</li>
						</ul>
					</div>

					<div className="cv-section">
						<div className="cv-header">VMC Consulting</div>
						<div className="cv-sub-header">Senior Technical Program Manager (Feb 2012 - Aug 2012) for Microsoft Corporation</div>
						<ul>
							<li>Refined the software development workflow utilizing Microsoft Visual Studio Team Foundation System, using a hybrid of SCRUM & AGILE methodologies.</li>
							<li>Reduced total cost of ownership (“TCO”) for hosting an intranet HTML5/jQuery BI reporting application</li>
							<li>Team management of day-to-day workflow for business intelligence reporting, and intranet web application development & support.</li>
							<li>Provide customer & partner technical support for business process related work items.</li>
							<li>Provide bi-weekly & monthly progress communications for senior management.</li>
						</ul>
					</div>

					<div className="cv-section">
						<div className="cv-header">Microsoft Corporation</div>
						<div className="cv-sub-header">Senior Program Manager (May 2007 – Dec 2011)</div>
						<div className="cv-sub-header">Software Development Engineer (Jan 2000 – May 2007)</div>
						<ul>
							<li>Development of a search engine optimization (SEO) strategy and process used by key content publishing teams to improve the discovery of technical content & application content for the Microsoft developer audience that led to a 30%+ improvement in search referral traffic and 85% coverage within search engine indices..</li>
							<li>Driving and supporting a real time RSS aggregation & discovery system, which supports collection of over 20,000 syndication feeds, and it exposed on over 100+ Microsoft websites.</li>
							<li>Managed a migration & support project of 200+ custom web-based user interface controls & other rendering platform features across 200+ websites for a partner base of 400+ content publishers, utilizing custom-built content management tools.</li>
							<li>Management of a 10+ person web development team including FTE & vendor resources, to support the core user interface features of the Microsoft Developer Network (MSDN) & TechNet online websites, using SCRUM/AGILE/Waterfall methodologies, utilizing Visual Studio 2010 Team Foundation Server (VTFS).</li>
							<li>Management of an international subsidiary development on-boarding program, including defining the stakeholder, partner and vendor engagement agreements, and overseeing the development & testing procedures and release management processes for 5 international subsidiaries</li>
							<li>Acted as a key technical liaison for user interface features & search engine optimization features for related partnership collaboration efforts & cross organizational communication.</li>
							<li>Providing deep architectural guidance, project reporting & timeline scheduling, technical support and training for organizational engineering, content & site management teams.</li>
							<li>Migration & redesign of the Microsoft Industry Solution Websites.</li>
							<li>Development of search metadata filtering user experience for Visual Studio. NET 2002 & 2003 products</li>
							<li>Developing federated search web services for the Visual Studio 2005 in-product content index experience</li>
							<li>Migration of the MSDN & TechNet website user interface rendering platforms from ASP to ASP.NET</li>
							<li>Development of HTML/CSS/JavaScript/jQuery based user interface controls for MSDN & TechNet technical reference websites.</li>
							<li>Ongoing development and support for team wide development processes, including code reviews, project costing, schedule & timeline definitions, and project work item tracking.</li>
						</ul>
					</div>

				</div>

				{ /* RIGHT COLUMN */}
				<div className="resume-right">

					<div className="skills-section">
						<div className="skills-header">Professional skills</div>
						<ul className="resume-ul-list">
							<li>Concise and succinct verbal and written communications style</li>
							<li>Fostering great cross-team and cross-function working relationships</li>
							<li>Expertise in web browser technologies ie. HTML5, CSS and JavaScript</li>
							<li>10+ years of building, supporting and shipping enterprise level projects</li>
							<li>10+ years using design tools such as Adobe Creative Cloud</li>
						</ul>
					</div>

					<div className="skills-section">
						<div className="skills-header">Design Tools</div>
						<ul className="resume-ul-list">
							<li>Adobe Create Cloud, Photoshop, Illustrator and XD</li>
							<li>Figma</li>
							<li>Hypertext markup language (HTML)</li>
							<li>Cascading Style Sheets (CSS)</li>
						</ul>
					</div>

					<div className="skills-section">
						<div className="skills-header">Developer tools</div>
						<ul className="resume-ul-list">
							<li>Microsoft Visual Studio & Visual Studio Code</li>
							<li>Microsoft Azure</li>
							<li>Microsoft C# and ASP.NET</li>
							<li>JavaScript, TypeScript and React</li>
						</ul>
					</div>

					<div className="skills-section">
						<div className="skills-header">Currently learning</div>
						<ul className="resume-ul-list">
							<li>3D design using Unity</li>
							<li>WebGL & D3.js</li>
						</ul>
					</div>


				</div>


			</div>
		);
	};
};