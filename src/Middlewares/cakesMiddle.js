import cakeSchema  from "../Schemas/cakesSchema.js";

export function validateCake(req, res, next) {
    const cake = req.body;
    const validation = cakeSchema.validate(cake);

    
    if (validation.error) {
        console.log(validation.error)
        if (validation.error.message =='"image" is not allowed to be empty' || validation.error.message == '"image" must be a valid uri') {
            return res.status(422).send("Imagem incorreta")
        }
        return res.status(400).send("Parametros incorretos");
    }

    next();
}