const db = require( "../data/dbConfig.js" );

module.exports = {
    insert,
    getAll,
    getById,
    remove
};

function getById( id ) {
    return db( "games" ).where( { id } ).first();
}

function insert( game ) {
    return db( "games" ).insert( game );
}

function getAll() {
    return db( "games" );
}

function remove( id ) {
    return db( "games" ).where( { id } ).delete();
}



