// JavaScript source code
var http = require( 'http' );

http.createServer( function ( req, res )
{
	res.writeHead( 200, { 'Content-Type': 'text/plain' } );
	res.write( 'TESTING NODE APIS.\n' );
	res.end( 'NODE.JS VERSION ' + process.version );
} ).listen( 8080 );