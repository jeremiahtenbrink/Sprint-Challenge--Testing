exports.seed = function( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( "games" ).truncate().then( function() {
        // Inserts seed entries
        return knex( "games" ).insert( [
            { title: "Mincraft", genre: "Video Games", releaseYear: 2011 }
        ] );
    } );
};
