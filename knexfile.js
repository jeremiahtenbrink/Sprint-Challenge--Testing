const localPg = {
    host:     "localhost",
    database: "games",
    user:     "student",
    password: "hired",
};
const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
    development: {
        client:           "sqlite3",
        connection:       {
            filename: "./data/games.db3",
        },
        useNullAsDefault: true,
        migrations:       {
            directory: "./data/migrations",
        },
        seeds:            {
            directory: "./data/seeds",
        },
    },
    test:        {
        client:           "sqlite3",
        connection:       {
            filename: "./data/test.db3",
        },
        useNullAsDefault: true,
        migrations:       {
            directory: "./data/migrations",
        },
        seeds:            {
            directory: "./data/seeds",
        },
    },
    
    production: {
        client:     "pg",
        connection: productionDbConnection, // could be an object or a string
        migrations: {
            directory: "./data/migrations",
        },
        seeds:      {
            directory: "./data/seeds",
        },
    },
};
