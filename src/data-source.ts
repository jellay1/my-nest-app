import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'my_nest_app',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: false, // Schema auto-sync disabled for migrations
});