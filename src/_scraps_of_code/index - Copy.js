import React from 'react';
import ReactDOM from 'react-dom';
import { Config } from './config';
import { App } from './App';
//	import * as serviceWorker from './serviceWorker';

( function ()
{
	//	console.log( "BEGIN", new Date().toISOString() );
	try
	{
		//	console.log( "TRY", new Date().toISOString() );
		//	If you want your app to work offline and load faster, you can change
		//	unregister() to register() below. Note this comes with some pitfalls.
		//	Learn more about service workers: http://bit.ly/CRA-PWA
		//	TBD - TESTING THIS IN VSCODE & MAC FOR JACKIEG
		//	serviceWorker.register();
		//	console.debug( "Config.Debug", Config.Debug );
		//	if ( Config.Debug === true)
		//	{
		//		serviceWorker.unregister();
		//	}
		//	else if ( Config.Debug === false )
		//	{
		//		serviceWorker.register();
		//	}

		window.document.addEventListener( "DOMContentLoaded", function ( e ) 
		{	//	console.debug( "DOMContentLoaded" );
			ReactDOM.render( <App config={Config} />, document.getElementById("react-app-root"));
			return;
		} );
	}
	catch ( ex )
	{
		console.log( "CATCH", new Date().toISOString() );
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "exception stack::", ex.stack );
		return;
	}
	finally
	{
		//	console.log( "FINALLY", new Date().toISOString() );
		//	serviceWorker.unregister();
	}
	//	console.log( "END", new Date().toISOString() );
	return;
} )();