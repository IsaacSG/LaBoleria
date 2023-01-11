import connection from "../DB/pg.js";

export async function postCakes(req, res) {
    const body = req.body ;

    try{
        const cakeVerify = await connection.query(`
        SELECT * 
        FROM cakes
        WHERE name = $1
        `, [body.name]);

        if (cakeVerify.rowCount > 0) {
            return res.status(409).send("Bolo já cadastrado");
        }
        
        await connection.query(`
        INSERT INTO cakes (name, price, image, description)
        VALUES ($1, $2, $3, $4)
        `, [body.name, body.price, body.image, body.description]);

        res.status(201).send("Bolo cadastrado");
    }
    
    catch(error) {
        console.log(error);
    }
}