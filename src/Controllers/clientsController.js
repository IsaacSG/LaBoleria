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
        SELECT *
        FROM clients
        WHERE id = $1
        `, [id]);

        if (rowCount === 0) {
            return res.status(404).send("Id não encontrado");
        }

        res.status(200).send(client[0]);
    }

    catch(error) {
        console.log(error);
    }
}