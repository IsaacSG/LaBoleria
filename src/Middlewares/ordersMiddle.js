import orderSchema from "../Schemas/ordersSchema.js";
import connection from "../DB/pg.js";

export async function validateOrder(req, res, next) {
    const order = req.body;
    const clientVerify = await connection.query(`
    SELECT *
    FROM clients
    WHERE id = $1
    `, [order.clientId]);

    if (clientVerify.rowCount === 0) {
        return res.status(404).send("Cliente não existe");
    }

    const cakeVerify = await connection.query(`
    SELECT *
    FROM cakes
    WHERE id = $1
    `, [order.cakeId]);

    if (cakeVerify.rowCount === 0) {
        return res.status(404).send("Bolo não existe");
    }
    
    const validation = orderSchema.validate(order);

    if (validation.error) {
        console.log(validation.error)
        return res.status(400).send("Parametros incorretos");
    }
    next();
}