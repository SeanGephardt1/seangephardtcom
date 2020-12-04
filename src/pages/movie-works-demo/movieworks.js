import PropTypes from 'prop-types';
import React from 'react';
//	import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './css/mw-fonts.css';
import './css/mw-application.css';
import './css/mw-animations.css';

import { LorumContent } from './controls/content/lorum-content.js';
import { Icons } from './controls/svg-icons/svg-icons.js';
import { MovieWorksData } from './data/movie-data-json.js';
import { Carousel } from './controls/carousel/carousel.js';
import HeroCarousel from './controls/carousel/hero-carousel.js';

export default class MovieWorksApplication extends React.Component
{
	static propTypes = {
		config: PropTypes.object,
	};
	static defaultProps = {
		Title: "MovieWorks",
		LinkTitle: "MovieWorks",
		Href: "/demos/movie-works-demo/",
		//Icon: SVG.AppNavButtons.Resume
	};
	constructor( props )
	{
		super( props );

		// STATES
		this.state = {
			MenuAsideOpen: null,
			ContextPanelOpen: null,
			SearchPanelOpen: null,
			CurrentRoute: "Testing this for page titles"
		};

		return;
	};

	// EVENT HANDLERS
	OnClick_HandleBubbleEvent( se )
	{
		se.preventDefault();
		se.stopPropagation();
		return;
	};

	OnClick_Reset_DynamicElements( se )
	{	//	console.debug( "OnClick_Reset_DynamicElements", this.state );

		if ( this.state.ContextPanelOpen === true )
		{
			this.setState( {
				MenuAsideOpen: null,
				ContextPanelOpen: false,
				SearchPanelOpen: null
			});
		}

		if ( this.state.SearchPanelOpen === true )
		{
			this.setState({
				MenuAsideOpen: null,
				ContextPanelOpen: null,
				SearchPanelOpen: false
			});
		}

		if ( this.state.MenuAsideOpen === true )
		{
			this.setState({
				MenuAsideOpen: false,
				ContextPanelOpen: null,
				SearchPanelOpen: null
			});
		}

		return;
	}

	OnClick_Display_MenuAsidePanel( se )
	{	//	console.debug( "OnClick_Display_MenuAsidePanel" );
		se.preventDefault();
		se.stopPropagation();

		if ( this.state.SearchPanelOpen === true )
		{
			this.setState( {
				MenuAsideOpen: true,
				SearchPanelOpen: false
			} );
		}
		else if ( this.state.ContextPanelOpen === true )
		{
			this.setState( {
				MenuAsideOpen: true,
				ContextPanelOpen: false
			} );
		}
		else
		{
			this.setState( {
				MenuAsideOpen: true,
			} );
		}

		return;
	}
	OnClick_Hide_MenuAsidePanel( se )
	{	//	console.debug( "OnClick_Hide_MenuAsidePanel" );
		se.preventDefault();
		se.stopPropagation();

		this.setState( {
			MenuAsideOpen: false,
		} );
		return;
	}

	OnClick_Display_AsidePanel( se )
	{	//	console.debug( "OnClick_AsidePanel_Toggle", se );
		se.preventDefault();
		se.stopPropagation();

		if ( this.state.SearchPanelOpen === true )
		{
			this.setState( {
				ContextPanelOpen: true,
				SearchPanelOpen: false
			} );
		}
		else if ( this.state.MenuAsideOpen === true )
		{
			this.setState( {
				ContextPanelOpen: true,
				MenuAsideOpen: false
			} );
		}
		else
		{
			this.setState( {
				ContextPanelOpen: true,
			} );
		}

		return;
	};
	OnClick_Hide_AsidePanel( se )
	{	//	console.debug( "OnClick_AsidePanel_Toggle", se );
		se.preventDefault();
		se.stopPropagation();

		this.setState( {
			ContextPanelOpen: false
		} );
		return;
	};

	OnClick_Display_SearchPanel( se )
	{
		se.preventDefault();
		se.stopPropagation();

		if ( this.state.ContextPanelOpen === true )
		{
			this.setState( {
				SearchPanelOpen: true,
				ContextPanelOpen: false
			} );
		}
		else if ( this.state.MenuAsideOpen === true )
		{
			this.setState( {
				SearchPanelOpen: true,
				MenuAsideOpen: false
			} );
		}
		else
		{
			this.setState( {
				SearchPanelOpen: true,
			} );
		}
		return;
	};
	OnClick_Hide_SearchPanel( se )
	{	//	console.debug( "OnClick_AsidePanel_Toggle", se );
		se.preventDefault();
		se.stopPropagation();

		this.setState( {
			SearchPanelOpen: false
		} );
		return;
	};

	OnClick_Handle_SearchTextBox( se )
	{
		se.preventDefault();
		se.stopPropagation();
		return;
	}

	// React render
	render()
	{	//	console.debug( "Application.render()", this.state.SearchPanelOpen );
		return (
			<div className="mw-app-root" onClick={this.OnClick_Reset_DynamicElements.bind(this)}>

				{/* NAV */}
				<div className="mw-nav">
					<div className="mw-branding">
						<div className="mw-icon-logo" onClick={this.OnClick_Display_MenuAsidePanel.bind(this)}>
							<Icons icon={Icons.Buttons.Hamburger} />
						</div>
						<div className="mw-brand-name">
							<a href="/demos/movie-works-demo/" className="mw-branding-link">MovieWorks</a>
						</div>
					</div>

					<div className="mw-search-panel">
						{
							this.state.SearchPanelOpen === true && 
							<button className="ms-search-button"
								tabIndex="0"
								onClick={this.OnClick_Hide_SearchPanel.bind( this )}>
									<Icons icon={Icons.Buttons.SearchClose} />
								</button>
						}
						{
							this.state.SearchPanelOpen === false &&
							<button className="ms-search-button"
								tabIndex="0"
								onClick={this.OnClick_Display_SearchPanel.bind( this )}>
								<Icons icon={Icons.Buttons.SearchMag} />
							</button>
						}
						{
							this.state.SearchPanelOpen === null &&
							<button className="ms-search-button"
								tabIndex="0"
								onClick={this.OnClick_Display_SearchPanel.bind( this )}>
								<Icons icon={Icons.Buttons.SearchMag} />
							</button>
						}

						{
							this.state.SearchPanelOpen === true &&
							<div className="mw-search-text-panel search-open">
								<input type="text"
									tabIndex="0"
									placeholder="Seach for a title, series or actor"
									className="mw-search-box"
									onClick={this.OnClick_Handle_SearchTextBox.bind(this)} />
							</div>
						}
						{
							this.state.SearchPanelOpen === false &&
							<div className="mw-search-text-panel search-closed">
								<input type="text"
									placeholder="Seach for a title, series or actor"
									className="mw-search-box" />
							</div>
						}
					</div>

					<div
						className="mw-setting-panel"
						tabIndex="0"
						onClick={this.OnClick_Display_AsidePanel.bind( this )}>
						My account
					</div>
				</div>

				{/* CONTEXT PANELS */}
				{/* MENU CONTEXT PANEL */}
				{
					this.state.MenuAsideOpen === true &&
					<aside className="mm-displayed" onClick={this.OnClick_HandleBubbleEvent.bind(this)}>
						<div className="mw-branding">
							<div className="mw-icon-logo" onClick={this.OnClick_Hide_MenuAsidePanel.bind(this)}>
								<Icons icon={Icons.Buttons.Hamburger} />
							</div>
							<div className="mw-brand-name">
								<a href="/movieworks/" className="mw-branding-link">MovieWorks</a>
							</div>
						</div>
						<div className="MainMenuContent">
							<div className="mm-nav-item">Home</div>
							<div className="mm-nav-item">Movies</div>
							<div className="mm-nav-item">Series</div>
							<div className="mm-nav-item">Sports</div>
							<div className="mm-nav-item">Documentaries</div>
							<div className="mm-nav-item">Collections</div>
							<div className="mm-nav-item">Live Events</div>
							<div className="mm-nav-item">For Kids</div>
							<div className="mm-nav-header">Brands</div>
							<div className="mm-nav-sub-item">HBO</div>
							<div className="mm-nav-sub-item">CINEMAX</div>
							<div className="mm-nav-sub-item">TNT</div>
							<div className="mm-nav-sub-item">TBS</div>
							<div className="mm-nav-sub-item">CNN</div>
							<div className="mm-nav-sub-item">DC</div>
							<div className="mm-nav-sub-item">CARTOON NETWORK</div>
							<div className="mm-nav-sub-item">ADULT SWIM</div>
							<div className="mm-nav-sub-item">WARNER BROS</div>
						</div>
					</aside>
				}
				{
					this.state.MenuAsideOpen === false &&
					<aside className="mm-not-displayed"></aside>
				}


				{/* ACCOUNT CONTEXT PANEL */}
				{
					this.state.ContextPanelOpen === true && 
					<aside className="AccountDisplayed" onClick={this.OnClick_HandleBubbleEvent.bind(this)}>
						<div className="AsideHeader">
							<div>My account settings</div>
							<div onClick={this.OnClick_Hide_AsidePanel.bind(this)}>
								<Icons icon={Icons.Buttons.Close} />
							</div>
						</div>
						<div className="AsideContent">
							<LorumContent />
						</div>
					</aside>
				}
				{
					this.state.ContextPanelOpen === false &&
					<aside className="AccountNotDisplayed">
						<div className="AsideHeader">
							<div>My account settings</div>
							<div onClick={this.OnClick_Hide_AsidePanel.bind(this)}>
								<Icons icon={Icons.Buttons.Close} />
							</div>
						</div>
						<div className="AsideContent">
							<LorumContent />
						</div>
					</aside>
				}

				{/* MAIN CONTENT */}
				<div className="mw-main">
					{/* FEATURED HERO CAROUSEL*/}
					<HeroCarousel data={MovieWorksData} title="Features"/>

					{/* NEW RELEASES CAROUSEL */}
					<Carousel data={MovieWorksData} title="New releases"/>

					{/* MY LIST RELEASES CAROUSEL */}
					<Carousel data={MovieWorksData} title="Contiue watching"/>

					{/* POPULAR RELEASES CAROUSEL */}
					<Carousel data={MovieWorksData} title="Popular this week" />

					{/* ScCI-FI CAROUSEL */}
					<Carousel data={MovieWorksData} title="Sci-Fi"/>

					{
						/*
						<BrowserRouter>
							<Switch>
								<Route exact={true} path={'/'} component={DemosList[0]} />
								<Route exact={true} path={'/resume/'} component={DemosList[1]} />
								<Route exact={true} path={'/portfolio/'} component={DemosList[2]} />
								<Route exact={true} path={'/music/'} component={DemosList[3]} />
								<Route exact={true} path={'/movie-works/'} component={DemosList[4]} />
								<Route exact={true} path={'/test/'} component={DemosList[DemosList.length-1]} />
							</Switch>
						</BrowserRouter>
						*/
					}
				</div>
			</div>
		);
	}
}