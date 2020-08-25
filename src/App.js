import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeContext } from './js/theme-context.js';
import { Themes } from './js/themes.js';

import SiteNav from './controls/nav/nav.js';
import SiteFooter from './controls/footer/footer.js';

import './css/css.js';



/* PAGES */
import { PagesList } from './pages/pages.js';

export default class App extends React.Component
{
    static contextType = ThemeContext;
    constructor( props )
    {   //  console.debug( "App.ctor()" );
        super( props );

        this.Pages = PagesList;
        this.Themes = Themes;
        this.DefaultTheme = this.Themes[0];

        this.state = {
            ThemeChanged: false,
        };

        //this.context.Theme = this.DefaultTheme;
        //this.context.CurrentLayout = this.DefaultLayout;
        //this.context.ToggleThemes = this.OnClick_ChangeTheme.bind( this );
        //this.context.ToggleLayouts = this.OnClick_ChangeLayout.bind( this );
        //this.context.OpenAside = this.OnClick_Open_ContextAsidePanel.bind( this );
        //this.context.CloseAside = this.OnClick_Close_ContextAsidePanel.bind( this );
        return;
    };

    // THEMES TOGGLING
    OnClick_ChangeTheme( indexValue, ev )
    {   //  console.debug( "App.OnClick_ChangeTheme", indexValue );
		ev.preventDefault();
		ev.stopPropagation();
		ev.nativeEvent.stopImmediatePropagation();

        this.DefaultTheme = indexValue;
        this.context.Theme = this.DefaultTheme;
        this.setState( { ThemeChanged: !this.state.ThemeChanged } );
        return;
    };

    // LAYOUT TOGGLING
    OnClick_ChangeLayout( indexValue, ev )
    {   //  console.debug( "App.OnClick_ChangeLayout", indexValue, this.Layouts[0] );
		ev.preventDefault();
		ev.stopPropagation();
		ev.nativeEvent.stopImmediatePropagation();

        this.DefaultLayout = this.Layouts[indexValue];
        this.context.CurrentLayout = this.DefaultLayout;
        this.setState( { LayoutChanged: !this.state.LayoutChanged } );
        return;
    };


    // CONTEXT PANEL EVENTS
    OnClick_Open_ContextAsidePanel( val, ev )
    {   //  
        console.debug( "App.OnClick_OpenContextAsidePanel",val);
		ev.preventDefault();
		ev.stopPropagation();
		ev.nativeEvent.stopImmediatePropagation();

        //this.context.Theme = indexValue;
        //this.setState( { ThemeChanged: !this.state.ThemeChanged } );
        return;
    };
    OnClick_Close_ContextAsidePanel( ev )
    {   //  
        console.debug( "App.OnClick_Close_ContextAsidePanel" );
		ev.preventDefault();
		ev.stopPropagation();
		ev.nativeEvent.stopImmediatePropagation();

        //this.context.Theme = indexValue;
        //this.setState( { ThemeChanged: !this.state.ThemeChanged } );
        return;
    };

    UpdateContext()
    {   //  console.debug( "UpdateContext", this.state.ThemeChanged, this.context.Theme );
        //  console.debug( "UpdateContext()", this.DefaultLayout, this.context.CurrentLayout );

        if ( this.context.Theme === undefined )
        {   // WHY DOES THIS HAPPEN
            //  console.error( "UpdateContext", this.context);
            this.context.Theme = this.DefaultTheme;
        }

        if ( this.context.CurrentLayout === undefined )
        {
            this.context.CurrentLayout = this.DefaultLayout;
        }

        // add context specific event handlers
        this.context.ToggleThemes = this.OnClick_ChangeTheme.bind( this );
        this.context.ToggleLayouts = this.OnClick_ChangeLayout.bind( this );
        this.context.OpenAside = this.OnClick_Open_ContextAsidePanel.bind( this );
        this.context.CloseAside = this.OnClick_Close_ContextAsidePanel.bind( this );
        //  console.debug( "UpdateContext", this.context.CurrentLayout );
        return;
    };
    render()
    {
        //  console.debug( "App.render()", this.DefaultLayout, this.context.CurrentLayout );
        /*
        <Switch> looks through its children <Route>s
        and renders the first one that matches the current URL.
        | {this.context.CurrentLayout} | {this.context.Theme.Name}
        						<Route exact={true} path={'/'} component={DemosList[0]} />
        */
        //  this.UpdateContext();

        return (
			<ThemeContext.Provider value={this.context}>
                <BrowserRouter>

                    <SiteNav />
                    <main>
                        <Switch>
                        {
                            this.Pages.map( ( item, index ) =>
                            (
                                <Route key={index} exact={true} path={item.defaultProps.Href} component={item}/>
                            ) )
                            }

                        </Switch>
                    </main>
                    <SiteFooter>Sean Gephardt</SiteFooter>

                </BrowserRouter>
			</ThemeContext.Provider>
        );
    }
};