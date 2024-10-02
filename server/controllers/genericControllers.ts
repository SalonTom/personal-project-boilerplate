export const getEntity = (entity : string) => async (req, res) => {
    try {
        if (req.params.id) {
            res.json({ message : `fetching the ${entity} with the id : ${req.params.id}`});
        } else {
            res.json({ message : `fetching all the ${entity}s from the db.`});
        }
    }  catch (error) {
        res.status(500).json({ error : 'Error fetching data.'});
    }
}

export const createEntity = (entity : string) => async (req, res) => {
    try {
        res.json({ message : `${entity} created !`})
    }  catch (error) {
        res.status(500).json({ error : 'Error creating data.'})
    }
}

export const putEntity = (entity : string) => async (req, res) => {
    try {
        res.json({ message : `${entity} with id ${req.params.id} updated !`})
    }  catch (error) {
        res.status(500).json({ message : error.message })
    }
}

export const deleteEntity = (entity : string) => async (req, res) => {
    try {
        res.json({ message : `${entity} with id ${req.params.id} updated !`})
    }  catch (error) {
        res.status(500).json({ message : error.message })
    }
}