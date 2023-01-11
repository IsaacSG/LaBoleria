import clientSchema from "../Schemas/clientsSchema.js";
import connection from "../DB/pg.js";

export function validateClient(req, res, next) {
    const client = req.body;
    const validation = clientSchema.validate(client);

    if (validation.error) {
        return res.status(400).send("Parametros incorretos");
    }

    next();
}
export async function clientVerify(req, res, next) {
    const { id } = req.params;
    const idVerify = await connection.query(`
    SELECT * 
    FROM clients
    WHERE id = $1
    `, [id]);
    if (idVerify.rowCount === 0) {
        return res.status(404).send("Id não encontrado");
    }

    next()
}