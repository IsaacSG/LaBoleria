import { Router } from "express";
import { getOrder, getOrders, postOrder } from "../Controllers/ordersController.js";
import { validateOrder } from "../Middlewares/ordersMiddle.js";

const router = Router();

router.get("/order", getOrders);
router.get("/order/:id", getOrder);
router.post("/order", validateOrder, postOrder);

export default router;