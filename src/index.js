import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

( function ()
{
	console.log( "BEGIN", new Date().toISOString() );
	try
	{
		window.document.addEventListener( "DOMContentLoaded", function ( e ) 
		{	//	console.debug( "DOMContentLoaded" );
			ReactDOM.render( <App />, document.getElementById("react-app-root"));
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
		console.log( "FINALLY", new Date().toISOString() );
	}
	console.log( "END", new Date().toISOString() );
	return;
} )();