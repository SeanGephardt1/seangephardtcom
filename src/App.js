import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PagesList } from './pages/pages.js';
import SiteNav from './controls/nav/nav.js';
import SiteFooter from './controls/footer/footer.js';
import './css/all.css';

export default class App extends React.Component
{
    constructor( props )
    {   //  console.debug( "App.ctor()" );
        super( props );

        this.state = {
            stateChanged: false
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
        //console.debug( "App.render()", window.location.pathname );


		//  let _paths = window.location.pathname.split( "/" );
		//  let _demo_paths = PagesList[2].path.split( "/" );
        //  console.debug( "_paths", _paths );
		//  console.debug( _paths, _demo_paths );
		//  console.debug( "_paths[1] === _demo_paths[1]", _paths[1] === _demo_paths[1] );

        return (
            <BrowserRouter>

                <SiteNav />

                <main>
                    <Switch>
                    {
                        PagesList.map( ( item, index ) =>
                        (
                            <Route key={index} exact={true} path={item.path} component={item.component} />
                        ) )
                    }
                    {
                        PagesList[2].routes.map( ( item, index ) =>
                        (
                            <Route key={index} exact={true} path={item.path} component={item.component} />
                         ) )
                    }
                    </Switch>
                </main>

                <SiteFooter>&copy; 2000-2021 Sean Gephardt. All rights reserved.</SiteFooter>

            </BrowserRouter>
        );
    }
};