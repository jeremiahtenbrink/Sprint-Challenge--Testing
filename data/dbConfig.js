const knex = require( "knex" );
const config = require( "../knexfile.js" );

const dbEnv = process.env.DB_ENV || "development";
console.log( "DB_ENV", process.env.DB_ENV );

module.exports = knex( config[ dbEnv ] );
