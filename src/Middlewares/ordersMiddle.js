import orderSchema from "../Schemas/ordersSchema.js";

export function validateOrder(req, res, next) {
    const order = req.body;
    const validation = orderSchema.validate(order);

    if (validation.error) {
        return res.status(400).send("Parametros incorretos");
    }

    next();
}