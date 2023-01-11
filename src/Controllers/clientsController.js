import connection from "../DB/pg.js";

export async function postClients(req, res) {
    const body = req.body ;

    try{
        await connection.query(`
        INSERT INTO clients (name, address, phone)
        VALUES ($1, $2, $3)
        `, [body.name, body.address, body.phone]);

        res.status(201).send("Cliente cadastrado");
    }

    catch(error) {
        console.log(error);
    }
}

export async function getClients(req, res) {
    const { id } = req.params;

    try{
        const { rows: client, rowCount } = await connection.query(`
        SELECT orders.id, orders.quantity, orders."createdAt", orders."totalPrice", cakes.name
        FROM clients
        JOIN orders
        ON clients.id = orders."clientId"
        JOIN cakes
        ON orders."cakeId" = cakes.id
        WHERE clients.id = $1
        ORDER BY orders.id
        `, [id]);

        

        res.status(200).send(client);
    }

    catch(error) {
        console.log(error);
    }
}