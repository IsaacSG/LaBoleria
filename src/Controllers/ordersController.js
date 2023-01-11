import connection from "../DB/pg.js";

export async function postOrder(req, res) {
    const body = req.body ;

    try{
        await connection.query(`
        INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice")
        VALUES ($1, $2, $3, $4)
        `, [body.clientId, body.cakeId, body.quantity, body.totalPrice]);

        res.status(201).send("Pedido criado");
    }

    catch(error) {
        res.send(error);
    }
}

export async function getOrders(req, res) {

    try{
    const orders = await connection.query(`
    SELECT *
    FROM orders`)

    res.status(200).send(orders);
    }

    catch(error) {
        console.log(error);
    }
}

export async function getOrder(req, res) {
    const { id } = req.params ;

    try{
        const { rows: order, rowCount } = await connection.query(`
        SELECT *
        FROM orders
        WHERE id = $1
        `, [id]);

        if(rowCount === 0) {
            return res.status(404).send("Pedido não encontrado");
        }

        res.status(200).send(order[0]);
    }

    catch(error) {
        console.log(error);
    }
}
