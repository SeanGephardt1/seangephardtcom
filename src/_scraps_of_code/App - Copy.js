import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContext, AppThemes } from './js/context-app-state.js';

import './css/fonts.css';
import './css/custom.css';
import './css/html.css';
import './css/application.css';

import { DemosList } from '../_old_demos/demos.js';
import { PortfolioHeader } from '../controls/header/header.js';
import { NavigationControl } from './nav.js';

class Application extends React.Component
{
	static propTypes = {
		config: PropTypes.object,
	};
	static defaultProps = {
		Application: this,
		AppName: "Portfolio 2020"
	};
	static contextType = AppContext;
	constructor( props )
	{
		//	console.debug( "App.ctor" );

		super( props );

		this.state = {
			isDirty: false,
            MainNav: false,
            ContextPanelOpen: false,
            UserNav: false,
            LearnBubble: false,
            Animations: true,
            AnimationSpeed: 500,
			TestPageDropDownDisplayed: false,
			PreviousThemeIndex: 0,
            Theme: AppThemes.Blue
		};
	
		this.Debug = ( this.props.config.Debug );

		// RESPONSIVE
		this.MainMenuOverride = ( this.props.config.MainMenuOverride || false );
		this.ResponsiveWidth = 0;
		this.ResponsiveBreakPoints = [320,480,640,768,1024,1280,1440,1920];
		this.SetDefaultResponsiveBreak();			
		return;
	};

	// responsive functions set on inital run and attach "onresize" event
	SetDefaultResponsiveBreak()
	{	// console.debug( "App.SetDefaultResponsiveBreak()", this.CurrentExtension.defaultProps.Children );
		this.ResponsiveWidth = document.body.clientWidth;

		//	FOR THE MAIN LEFT NAV
		if ( parseInt( document.body.clientWidth )  < 1024 )
		{
			this.ResponsiveBreak = true;
			this.MainNavLargeRespBreak = true;
			//	this.MainNavDisplayed = false;
		}
		else if ( parseInt( document.body.clientWidth ) > 1023 )
		{
			this.ResponsiveBreak = false;
			this.MainNavLargeRespBreak = false;
			//	this.MainNavDisplayed = true;
		}

		if ( parseInt( document.body.clientWidth ) < 640 )
		{
			this.MainNavSmallRespBreak = true;
		}
		else if ( parseInt( document.body.clientWidth ) > 639)
		{
			this.MainNavSmallRespBreak = false;
		}

		if ( this.CurrentExtension !== undefined )
		{
			if ( this.CurrentExtension.defaultProps.Children !== undefined )
			{
				this.ResourceMenuLinks = this.CurrentExtension.defaultProps.Children;
			}
		}
		//	console.debug( "this.ResourceMenuLinks", this.ResourceMenuLinks );
		//console.debug( "App.SetDefaultResponsiveBreak()" );
		//console.debug( "this.MainMenuOverride", this.MainMenuOverride );
		//console.debug( "this.ResponsiveWidth", this.ResponsiveWidth );
		//console.debug( "this.MainNavDisplayed", this.MainNavDisplayed );
		//console.debug( "this.ResponsiveBreak", this.ResponsiveBreak);
		//console.debug( "this.MainNavLargeRespBreak", this.MainNavLargeRespBreak);
		//console.debug( "this.MainNavSmallRespBreak", this.MainNavSmallRespBreak);

		return;
	};
	DetectResponsiveBreak( pe )
	{	//	console.debug( "App.DetectResponsiveBreak()" );
		this.SetDefaultResponsiveBreak();

		//console.debug( "App.DetectResponsiveBreak()",
		//	"this.MainNavDisplayed", this.MainNavDisplayed,
		//	"this.state.MainNavPinned", this.state.MainNavPinned);

		if ( this.ResponsiveBreak === false )
		{
			if ( this.state.MainNavPinned === true )
			{
				this.MainNavDisplayed = false;
			}
		}
		else if ( this.ResponsiveBreak === true )
		{
			this.MainNavDisplayed = false;
		}

		this.setState( {
			ExtensionChanged: !this.state.ExtensionChanged,
			AllFlyoutsClosed: true,
			MeControl: false,
			ContextPanel: false,
			SearchExpanded: "closed",
			ToolsOverflowDisplayed: false,
			QuickCardDisplayed: false,
			MainNavRespBreak: this.ResponsiveBreak,
			ResMenuRespBreak: this.MainNavSmallRespBreak,
		} );
		return;
	};

	OnClick_HandleEventCancelling( pe )
	{	//	console.debug( "OnClick_HandleEventCancelling" );
		pe.preventDefault();
		pe.stopPropagation();
		pe.nativeEvent.stopImmediatePropagation();
		return;
	};
	ResetAllMenus( pe )
	{	//	
		console.debug( "App.ResetAllMenus()" );
		//	console.debug( "App.ResetAllMenus()", this.ResponsiveBreak, this.MainNavDisplayed, this.state.MainNavPinned );
		this.OnClick_HandleEventCancelling( pe );

		this.CurrentContextPanel = undefined;

		if ( this.MainMenuOverride === true )
		{
			this.MainNavDisplayed = false;
		}

		if ( this.ResponsiveBreak === false )
		{
			if ( this.state.MainNavPinned === true )
			{
				this.MainNavDisplayed = false;
			}
		}
		else
		{
			this.MainNavDisplayed = false;
		}

		//this.setState( {
		//	ExtensionChanged: false,
		//	MeControlOpen: false,
		//	MainNavOpen: false,
		//	ContextPanelOpen: false,
		//	SearchPanelOpen: false
		//} );
		return;
	};

	// PLAYING WITH CONTEXT
    TogglePanels(ev)
	{	//	console.debug( "TogglePanels", this.state );
        ev.preventDefault();
		ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();

		this.setState( {
			IsDirty:true,
			TestPageDropDownDisplayed: !this.state.TestPageDropDownDisplayed
		} );
        return;
    };
    ToggleThemes(ev)
	{   //	console.debug( "App.Scope.ToggleTheme", this.state, this.context );
		ev.preventDefault();
		ev.stopPropagation();
		ev.nativeEvent.stopImmediatePropagation();

        let _r_number = Math.round( Math.random() * 3 );
		//	console.debug( "this.state.PreviousThemeIndex", this.state.PreviousThemeIndex, "_r_number", _r_number );

		if ( _r_number === this.state.PreviousThemeIndex )
		{
			_r_number = Math.round(_r_number - 1);
		}

		let _new_theme = {};

        switch ( _r_number )
		{
		    case 0: {
		    	_new_theme = AppThemes.Light;
		    	break;
		    }
		    case 1: {
		    	_new_theme = AppThemes.Dark;
		    	break;
		    }
		    case 2: {
		    	_new_theme = AppThemes.Red;
		    	break;
		    }
		    case 3: {
		    	_new_theme = AppThemes.Blue;
		    	break;
		    }
		    default: {
		    	_new_theme = AppThemes.Light;
		    	break;
		    }
		}

		this.setState( {
			IsDirty: true,
			Theme: _new_theme,
			PreviousThemeIndex: _r_number
		} );

        return;
    }
	ResetContext( se )
	{	//	console.debug( "ResetContext", this.context );
		this.setState( {
            MainNav: false,
            ContextPanelOpen: false,
            UserNav: false,
            LearnBubble: false,
            Animations: true,
            AnimationSpeed: 500,
            TestPageDropDownDisplayed: false,
            Theme: AppThemes.Blue
		} );
		return;
	}

	// react built-in methods
	componentDidMount(prevProps)
	{	//	console.debug("App.componentDidMount()");
		window.addEventListener( "resize", this.DetectResponsiveBreak.bind( this ) );
		return;
	}
	componentDidUpdate(prevProps) 
	{
		//	console.debug( "Application.componentDidUpdate()", this.context.state.Theme );
		return;
	}
	componentWillUnmount(pe)
	{	//	UNUSED
		//	console.debug( "Application.componentWillUnmount()" );
		// console.debug( "Application.componentWillUnmount()", this.context.state );
		return;
	}

	// React render
	UpdateContext()
	{	//	console.debug( "Application.UpdateContext()", this.state );
		this.context.State = this.state;
		this.context.Theme = ( this.state.Theme || AppThemes.Blue);
		this.context.ResetTheme = this.ResetContext.bind( this );
		this.context.ToggleTheme = this.ToggleThemes.bind(this);
		this.context.ToggleTestPanel = this.TogglePanels.bind( this );
		//console.debug( "Application.UpdateContext()", this.context.Theme );
		return;
	};
	render()
	{
		//	console.debug( "Application.render()", this.context );
		//	console.debug( "App.props", this.props);
		//	console.debug( "Application.render()", location.state );
		//	console.debug( "Application.render()", this.props.location.state );
		//	this.context.Theme = AppThemes.Red;
		this.UpdateContext();

		return (
			<BrowserRouter>

			<AppContext.Provider value={this.context}>
				<div className="app-root" onClick={this.ResetContext.bind(this)}>
				{/* SPLASH LOADER IF ANY */}
				{/* AUTH IF ANY */}

				{/* HEADER */}
				<PortfolioHeader>Sean Gephardt</PortfolioHeader>

				{/* NAV */}
				<NavigationControl links={DemosList} />

				{/* MAIN */}
				<main>
				{
					<Switch>
						<Route exact={true} path={'/'} component={DemosList[0]} />
						<Route exact={true} path={'/resume/'} component={DemosList[1]} />
						<Route exact={true} path={'/portfolio/'} component={DemosList[2]} />
						<Route exact={true} path={'/music/'} component={DemosList[3]} />
						<Route exact={true} path={'/movie-works/'} component={DemosList[4]} />
						<Route exact={true} path={'/test/'} component={DemosList[DemosList.length-1]} />
					</Switch>
				}
			</main>

				{/* FOOTER 
				 style={{ backgroundColor: this.context.Theme.background}}
				 */}
					<footer>&copy;2020 Sean Gephardt, all rights reserved.</footer>

				{/* CONTEXT PANELS */}
				{
					this.state.ContextPanelOpen === false &&
					<aside className="closed"></aside>
				}
				{
					this.state.ContextPanelOpen === true && 
					<aside className="open">
					{
						( this.CurrentContextPanel !== undefined ) &&
						<div className="context-panel-default" onClick={this.OnClick_HandleEventCancelling}>
							<this.CurrentContextPanel {...this} />
						</div>
					}
					</aside>
				}
				</div>
				</AppContext.Provider>
			</BrowserRouter>
		);
	}
}
Application.contextType = AppContext;
export
{
	Application as App
};