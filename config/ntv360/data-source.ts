import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'my_nest_app',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/config/ntv360/migrations/*.js'],
    synchronize: false, // Schema auto-sync disabled for migrations 
    // //dictate how, when, and what data is updated or aligned between an external source 
    // (such as a database, cloud storage, API, or third-party platform) and a target destination (such as a data warehouse, app, 
    // or local server).
});

//central configuration file that manages the database connection and settings for application.
// naa here ang databse credentials, entities, migrations, and synchronization settings.
// It is used by TypeORM to establish a connection to the MYSQL database.