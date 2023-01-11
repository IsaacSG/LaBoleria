import cakeSchema from "../Schemas/cakesSchema.js";

export function validateCake(req, res, next) {
    const cake = req.body;
    const validation = cakeSchema.validate(cake);
    
    if (validation.error) {
        return res.status(400).send("Parametros incorretos");
    }

    next();
}