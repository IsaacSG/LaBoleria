import joi from "joi";

const orderSchema = joi.object({
    clientId: joi.required(),
    cakeId: joi.required(),
    quantity: joi.number().min(1).required(),
    totalPricfe: joi.required()
});

export default orderSchema;