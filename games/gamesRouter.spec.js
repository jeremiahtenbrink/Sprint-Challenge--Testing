const request = require( "supertest" );
const server = require( "../api/server.js" );
const db = require( "../data/dbConfig" );
const { game, game2 } = require( "./gamesTestingData" );

describe( "games router", () => {
    beforeAll( async () => {
        await db( "games" ).truncate();
    } );
    
    describe( "GET /", () => {
        it( "should respond with 200 ok and api: up", () => {
            return request( server ).get( "/" ).then( res => {
                expect( res.status ).toBe( 200 );
                expect( res.body ).toMatchObject( { api: "up" } );
            } );
        } );
    } );
    
    describe( "GET /games", () => {
        it( "should respond with 200 ok", () => {
            return request( server ).get( "/games" ).then( res => {
                expect( res.status ).toBe( 200 );
            } );
        } );
        it( "should return a empty array of games", () => {
            return request( server ).get( "/games" ).then( res => {
                expect( res.body ).toMatchObject( [] );
            } );
        } );
        it( "should return the game object", async () => {
            await db( "games" ).insert( game );
            return request( server ).get( "/games" ).then( res => {
                expect( res.body ).
                    toMatchObject( [ { ...game, id: expect.any( Number ) } ] );
            } );
        } );
    } );
    
    describe( "POST /games", () => {
        beforeAll( async () => {
            await db( "games" ).truncate();
        } );
        
        it( "should respond with status code 422", () => {
            return request( server ).post( "/games" ).then( res => {
                expect( res.status ).toBe( 422 );
            } );
        } );
        
        it( "should respond with status code 201 created", () => {
            return request( server ).
                post( "/games" ).
                send( game2 ).
                then( res => {
                    expect( res.status ).toBe( 201 );
                } );
        } );
        
        it( "should respond with status code 405 Not Allowed", () => {
            return request( server ).
                post( "/games" ).
                send( game2 ).
                then( res => {
                    expect( res.status ).toBe( 405 );
                } );
        } );
        
    } );
    
    describe( "GET /games/:id", () => {
        beforeEach( async () => {
            await db( "games" ).truncate();
        } );
        it( "should respond with a 404 not found code", () => {
            return request( server ).get( "/games/2" ).then( res => {
                expect( res.status ).toBe( 404 );
            } );
        } );
        
        it( "should return a status code of 200", async () => {
            await db( "games" ).insert( game2 );
            return request( server ).get( "/games/1" ).then( res => {
                expect( res.status ).toBe( 200 );
            } );
        } );
        
        it( "should return game2", async () => {
            await db( "games" ).insert( game2 );
            return request( server ).get( "/games/1" ).then( res => {
                expect( res.body ).
                    toMatchObject( { ...game2, id: expect.any( Number ) } );
            } );
        } );
        
    } );
    
    describe( "DELETE /games/1", () => {
        beforeAll( async () => {
            await db( "games" ).truncate();
        } );
        it( "should return a 404 Not Found", () => {
            return request( server ).delete( "/games/1" ).then( res => {
                expect( res.status ).toBe( 404 );
            } );
        } );
    } );
} );