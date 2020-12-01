import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SiteNav from './controls/nav/nav.js';
import SiteFooter from './controls/footer/footer.js';

import './css/css.js';

/* PAGES */
import { PagesList } from './pages/pages.js';

export default class App extends React.Component
{
    constructor( props )
    {   //  console.debug( "App.ctor()" );
        super( props );

        this.Pages = PagesList;

        this.state = {
            stateChanged: false,
        };
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

        return (
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

                    <SiteFooter>&copy; 2021 Sean Gephardt. All rights reserved.</SiteFooter>

                </BrowserRouter>
        );
    }
};