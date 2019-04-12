const express = require( "express" );
const gamesRouter = require( "../games/gamesRouter" );

const server = express();

server.use( express.json() );
server.use( "/games", gamesRouter );
server.get( "/", ( req, res ) => {
    res.status( 200 ).json( { api: "up" } );
} );

module.exports = server;
