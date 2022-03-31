import * as ReactDOMClient from 'react-dom/client';
import App from './App.js';

( function ()
{
	console.log( "START", new Date().toISOString() );
	try
	{
		window.document.addEventListener( "DOMContentLoaded", function ( e ) 
		{	//	console.debug( "DOMContentLoaded", Date.now() );
			//	ReactDOM.render( <App />, document.getElementById( "r-app" ) );
			//	react v18
			ReactDOMClient.createRoot( document.getElementById( "react-app" ) ).render( <App /> );
			return;
		} );
	}
	catch ( ex )
	{
		console.error( "CATCH", new Date().toISOString(), ex );
		return;
	}
	finally
	{
		console.log( "FINI", new Date().toISOString() );
	}
	console.log( "END", new Date().toISOString() );
	return;
} )();