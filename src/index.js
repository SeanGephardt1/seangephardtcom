import ReactDOM from 'react-dom';
import App from './App.js';

( function()
{
	console.log( "START", Date.now() );
	try
	{
		window.document.addEventListener( "DOMContentLoaded", function ( e ) 
		{	//	console.debug( "DOMContentLoaded", Date.now() );
			ReactDOM.render( <App />, document.getElementById("r-app"));
			return;
		} );
	}
	catch ( ex )
	{
		console.error( "CATCH", Date.now(), ex );
		return;
	}
	finally
	{
		console.log( "FINI", Date.now() );
	}
	console.log( "END", Date.now() );
	return;
})();