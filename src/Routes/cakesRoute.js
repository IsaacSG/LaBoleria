import { Router } from "express";
import { postCakes } from "../Controllers/cakesController.js";
import { validateCake } from "../Middlewares/cakesMiddle.js";

const router = Router();

router.post("/cakes", validateCake, postCakes);

export default router;