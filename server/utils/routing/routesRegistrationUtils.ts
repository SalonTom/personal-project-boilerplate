import path from "path";
import fs from "fs";

import { createEntity, deleteEntity, getEntity, putEntity } from "controllers/genericControllers";

class RoutesRegistrationUtils {

    /**
     * Registers the routes based on the generated types.
     */
    public static async registerRoutesAsync(app) : Promise<void> {

        // Entities folder path
        const entitiesPath : string = path.join(__dirname, '../../../typeorm/src/entities/');

        // Entities files
        let entityFiles = [];

        // Retreiving the entities files.
        try {
            entityFiles = await fs.readdirSync(entitiesPath);
        } catch (error) {
            console.log("No entities folder found.")
        }

        // Add the correponding routes to the app.
        entityFiles.forEach(async file => {

            const entityName = file.replace('.ts', '').toLocaleLowerCase();

            const basePath = `/api/v1/${entityName}`;

            // GET method : get all the entities from the db.
            app.get(basePath, getEntity(entityName));

            // POST method : create a new entity in the db.
            app.post(basePath, createEntity(entityName));

            // GET method + path parameter : get an entity by id from the db.
            app.get(`${basePath}/:id`, getEntity(entityName));

            // PUT method + path parameter : update an entity by id in the db.
            app.put(`${basePath}/:id`, putEntity(entityName));

            // DELETE method + path parameter : delete an entity by id from the db.
            app.delete(`${basePath}/:id`, deleteEntity(entityName));

            console.log(`Route up and running for type : ${entityName}`)
        });
    }
}

export default RoutesRegistrationUtils;