const db = require( "../data/dbConfig" );
const games = require( "./gamesModal" );
const { game, game2 } = require( "./gamesTestingData" );

beforeEach( async () => {
    await db( "games" ).truncate();
    console.log( "games table deleted" );
} );

describe( "Games model", () => {
    
    describe( "insert()", () => {
        
        it( "should insert 1 game", async () => {
            console.log( game );
            await games.insert( game );
            
            const gamesTable = await db( "games" );
            expect( gamesTable[ 0 ] ).
                toMatchObject( { ...game, id: expect.any( Number ) } );
            
        } );
        
        it( "should insert 2 games", async () => {
                await games.insert( game );
                await games.insert( game2 );
                const gamesTable = await db( "games" );
                console.log( "gamesTable", gamesTable );
                expect( gamesTable ).toHaveLength( 2 );
                expect( gamesTable[ 0 ] ).
                    toMatchObject( { ...game, id: expect.any( Number ) } );
                expect( gamesTable[ 1 ] ).
                    toMatchObject( { ...game2, id: expect.any( Number ) } );
            }
        );
    } );
    
    describe( "getAll()", async () => {
        it( "should get all games from db", async () => {
                await games.insert( game );
                await games.insert( game2 );
                let gamesArray = await games.getAll();
                expect( gamesArray ).toHaveLength( 2 );
            }
        );
    } );
    
    describe( "remove(id)", () => {
        it( "should remove the given game from the db", async () => {
            await games.insert( game );
            let result = await games.remove( 1 );
            console.log( "Result", result );
            expect( result ).toBe( 1 );
        } );
        
    } );
} );