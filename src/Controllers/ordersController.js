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
    const {rows: orders } = await connection.query(`
    SELECT clients.id AS client_id, clients.name AS client_name, clients.address, clients.phone, cakes.*, orders.id AS order_id, orders."createdAt", orders.quantity, orders."totalPrice" FROM orders
    JOIN clients
    ON orders."clientId" = clients.id
    JOIN cakes
    ON orders."cakeId" = cakes.id
    ORDER BY orders.id;`)

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
        SELECT clients.id AS client_id, clients.name AS client_name, clients.address, clients.phone, cakes.*, orders.id AS order_id, orders."createdAt", orders.quantity, orders."totalPrice" FROM orders
        JOIN clients
        ON orders."clientId" = clients.id
        JOIN cakes
        ON orders."cakeId" = cakes.id
        WHERE orders.id = $1
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
