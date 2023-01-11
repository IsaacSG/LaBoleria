import joi from "joi";

const orderSchema = joi.object({
    clientId: joi.required(),
    cakeId: joi.required(),
    quantity: joi.number().min(1).max(5).required(),
    totalPrice: joi.number().required()
});

export default orderSchema;