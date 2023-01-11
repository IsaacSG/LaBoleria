import clientSchema from "../Schemas/clientsSchema.js";

export function validateClient(req, res, next) {
    const client = req.body;
    const validation = clientSchema.validate(client);

    if (validation.error) {
        return res.status(400).send("Parametros incorretos");
    }

    next();
}