import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import './nav.css';
import InstagramIcon from './instagram.png';
import LinkedInIcon from './linkedin.png';
import GitHubIcon from './github.svg';


export class NavigationControl extends React.Component {
	//	static contextType = AzureThemeContext;
	constructor(props)
	{
        super( props );
		this.PortfolioLinks = this.props.links;
		return;
	};
	render() {
		//	console.debug("NavigationControl.render()", this.props.items);	
		//	console.debug( "this.props.links", this.props.links );

		this.PortfolioLinks = this.props.links;
		//console.debug( "this.PortfolioLinks", this.PortfolioLinks );

		//this.PortfolioLinks.forEach( function ( v, i, a )
		//{
		//	console.debug( "routes", i, v.defaultProps.Title, v.defaultProps.Href );
		//});

		return (
			<nav className="portfolio-nav">
				<BrowserRouter
					  basename={"/"}
					  forceRefresh={true}
					  keyLength={9}>
					{
						this.props.links.map( ( route, index ) => (
						<Route
							key={index}
							path={route.defaultProps.Href}
							exact={true}/>
						) )
					}

					<div className="portfolio-nav-bar">
					{this.props.links.map( ( route, index ) => (
						<div key={index} className="nav-item-div">
							<NavLink
								strict={true}
								exact={true}
								key={index}
								className="ni-link"
								activeClassName="ni-selected"
								to={route.defaultProps.Href}
								isActive={( match, location ) =>
								{
									let _rv = false;
									//	console.debug( "NavLink", match, location );
									if ( match !== null )
									{
										window.document.title = this.props.links[index].defaultProps.Title;
										//	console.debug( "this.props.links[index].defaultProps.Title", this.props.links[index].defaultProps.Title);
										_rv = true;
									}
									else if ( match === null )
									{
										_rv = false;
									}
									return _rv;
									//console.debug( "NavLink", match, location );
									//return ( match !== null ) ? true : false;
								}}>
								{
									route.defaultProps.LinkIcon &&
									<img src={route.defaultProps.LinkIcon} alt="Sean Gephardt on Instagram"  className="ni-link-img" />
								}
								
								{route.defaultProps.LinkTitle}
							</NavLink>
						</div>
					) )}
	
						<div className="nav-item-div">
							<a className="ni-link" target="_new" title="Sean Gephardt on Instagram"
								href="https://www.instagram.com/villainsean/">
								<img src={InstagramIcon} alt="Sean Gephardt on Instagram"  className="ni-link-img" />
								Instagram
							</a>
						</div>
						<div className="nav-item-div">
						<a className="ni-link"  target="_new"  title="Sean Gephardt on LinkedIn"
								href="https://www.linkedin.com/in/seangephardt/">
								<img src={LinkedInIcon} alt="Sean Gephardt on LinkedIn"  className="ni-link-img" />
							LinkedIn
						</a>
						</div>
						<div className="nav-item-div">
							<a className="ni-link"  target="_new"  title="Sean Gephardt on GitHub"
								href="https://github.com/SeanGephardt1">
								<img src={GitHubIcon} alt="Sean Gephardt on GitHub" className="ni-link-img" />
							GitHub
							</a>
						</div>
					</div>
				</BrowserRouter>
			</nav>
		);
	};
};