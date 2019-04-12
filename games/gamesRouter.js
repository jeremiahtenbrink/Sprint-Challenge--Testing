const gameRouter = require( "express" ).Router();
const games = require( "./gamesModal" );

gameRouter.get( "/", ( req, res ) => {
    games.getAll().then( games => {
        return res.status( 200 ).json( games );
    } ).catch( err => {
        return res.status( 500 ).json( { message: err.message } );
    } );
} );

gameRouter.get( "/:id", ( req, res ) => {
    const id = req.params.id;
    
    if ( !id ) {
        return res.status( 400 ).
            json( { message: "You must include an id in the params." } );
    }
    
    games.getById( id ).then( game => {
        if ( game ) {
            return res.status( 200 ).json( game );
        }
        return res.status( 404 ).
            json( { message: "We could not find that game" } );
    } ).catch( err => {
        res.status( 500 ).json( { message: "Something went wrong." } );
    } );
} );

gameRouter.post( "/", ( req, res ) => {
    const game = req.body;
    if ( !game || !game.title || !game.genre ) {
        return res.status( 422 ).
            json(
                { message: "Please include the game title and genre in the body of your request." } );
    }
    
    games.insert( game ).then( id => {
        if ( id[ 0 ] ) {
            games.getById( id[ 0 ] ).then( game => {
                return res.status( 201 ).json( game );
            } );
        } else {
            return res.status( 500 ).
                json( { message: "Something went wrong" } );
        }
    } ).catch( err => {
        if ( err.errno === 19 ) {
            return res.status( 405 ).
                json( { message: "The game title must be unique." } );
        }
        return res.status( 500 ).json( { message: err.message } );
    } );
} );

gameRouter.delete( "/:id", ( req, res ) => {
    const id = req.params.id;
    if ( !id ) {
        return res.status( 400 ).
            json(
                { message: "You must include a id in your request params." } );
    }
    
    games.remove( id ).then( rows => {
        if ( rows === 1 ) {
            return res.status( 200 ).json( { message: "Removed the game." } );
        } else {
            return res.status( 404 ).
                json( { message: "We do not have that game." } );
        }
    } ).catch( err => {
        return res.status( 500 ).json( { message: err.message } );
    } );
    
} );

module.exports = gameRouter;