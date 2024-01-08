import { config } from 'dotenv';
import { resolve } from 'path';
import { Client } from 'pg';

config({ path: resolve(__dirname, '../../.env') });

async function createDatabase() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    port: 5432,
    database: 'postgres', // Connect to the 'postgres' database for administrative tasks
  });

  try {
    await client.connect();

    const targetDatabase = process.env.DB_NAME;

    // Check if the database already exists
    const result = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [targetDatabase]
    );

    if (result.rows.length === 0) {
      // Database does not exist, so create it
      await client.query(`CREATE DATABASE "${targetDatabase}";`);
      console.log(`Database "${targetDatabase}" created successfully.`);

      // No need to switch databases in PostgreSQL
      // You are already connected to the 'postgres' database for administrative tasks

      // Connect to the newly created database for further operations
      const connectionToTargetDatabase = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: 5432,
        database: targetDatabase,
      });

      await connectionToTargetDatabase.connect();

      console.log("Start create table user");
      
      await createTable(connectionToTargetDatabase)
      await connectionToTargetDatabase.end();
    } else {
      console.log(`Database "${targetDatabase}" is exists.`);

      const connectionToTargetDatabase = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: 5432,
        database: targetDatabase,
      });
      
      console.log("Start create table user");
      await createTable(connectionToTargetDatabase)
      console.log(`Database "${targetDatabase}" already exists.`);
    }
  } catch (error) {
    console.error('Error creating database:', error.message);
  } finally {
    await client.end();
  }
}

async function createTable(client) {
  try {
    // Connect to the PostgreSQL server
    await client.connect();

    // Create a sample table
    await client.query(`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" SERIAL PRIMARY KEY,
      "userId" VARCHAR(255) NOT NULL,
      "ticker" VARCHAR(255) NOT NULL,
      "contractListen" VARCHAR(255) NOT NULL);
    `);

    console.log('Table created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    // Close the database connection
    await client.end();
  }
}

createDatabase();
