import "reflect-metadata"
import { DataSource } from "typeorm"

// MODIFY THIS FILE OR ADD NEW DATASOURCE BASED YOUR CONFIGURATION
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "postgres",
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/migrations/*.ts"],
    logging: true
});