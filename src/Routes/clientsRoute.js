import { Router } from "express";
import { postClients } from "../Controllers/clientsController.js";
import { validateClient } from "../Middlewares/clientsMiddle.js";

const router = Router();

router.post("/clients", validateClient, postClients);

export default router;