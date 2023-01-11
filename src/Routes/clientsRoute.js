import { Router } from "express";
import { postClients, getClients } from "../Controllers/clientsController.js";
import { validateClient } from "../Middlewares/clientsMiddle.js";

const router = Router();

router.post("/clients", validateClient, postClients);
router.get("/clients/:id/orders", getClients);

export default router;