import BaseHook from "hooks/core/BaseHook";

/**
 * Import and return an instance of the EntityHook for the entity class.
 * @param entity 
 * @returns [Entity]Hook instance.
 */
const loadEntityHooksAsync = async (entity : string) : Promise<BaseHook | null> => {

    if (!entity) throw new Error("No entity name was provided");

    const entityClassName = entity.charAt(0).toUpperCase() + entity.slice(1);

    try {
        const module = await import(`../hooks/${entityClassName}Hook`);
        const EntityHook = module.default;
    
        return new EntityHook();
    } catch(error) {
        console.error("No hook defined for this entity: %s", entityClassName);
        return null;
    }
}

/**
 * Default controller for get requests.
 * @param entity entity name.
 * @returns (req: any, res: any) => Promise<void>
 */
export const getEntity = (entity : string) => async (req, res) => {
    try {

        // TODO : Implement fetching.

        if (req.params.id) {
            res.json({ message : `fetching the ${entity} with the id : ${req.params.id}`});
        } else {
            res.json({ message : `fetching all the ${entity}s from the db.`});
        }
    }  catch (error) {
        res.status(500).json({ error : error.message });
    }
}

/**
 * Default controller for post requests.
 * @param entity entity name.
 * @returns (req: any, res: any) => Promise<void>
 */
export const createEntity = (entity : string) => async (req, res) => {
    try {

        if (!req.body) throw new Error("No data was given.");

        let data = req.body;
        
        const hook = await loadEntityHooksAsync(entity);

        data = await hook?.beforeCreateAsync(data) ?? data;

        // TODO : Implement creation.

        await hook?.afterCreateAsync(data);

        res.json(data);
    }  catch (error) {
        res.status(500).json({ error : error.message });
    }
}

/**
 * Default controller for put requests.
 * @param entity entity name.
 * @returns (req: any, res: any) => Promise<void>
 */
export const putEntity = (entity : string) => async (req, res) => {
    try {
        if (!req.params.id) throw new Error("Incorrect or missing id.");
        if (!req.body) throw new Error("No data was given.");

        let data = req.body;

        const hook = await loadEntityHooksAsync(entity);

        data = await hook?.beforeUpdateAsync(data) ?? data;

        // TODO : implement update.

        await hook?.afterUpdateAsync(data) ?? data;

        res.json(data);
    }  catch (error) {
        res.status(500).json({ message : error.message })
    }
}

/**
 * Default controller for delete requests.
 * @param entity entity name.
 * @returns (req: any, res: any) => Promise<void>
 */
export const deleteEntity = (entity : string) => async (req, res) => {
    try {
        if (!req.params.id) throw new Error("Incorrect or missing id.");
        if (!req.body) throw new Error("No data was given.");

        let data = req.body;

        const hook = await loadEntityHooksAsync(entity);

        data = await hook?.beforeDeleteAsync(data) ?? data;

        // TODO : implement deletion.

        await hook?.afterDeleteAsync(data) ?? data;

        res.json(data);
    }  catch (error) {
        res.status(500).json({ message : error.message })
    }
}