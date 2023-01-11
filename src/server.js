import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cakeRoute from "./Routes/cakesRoute.js";
import clientRoute from "./Routes/clientsRoute.js";
import orderRoute from "./Routes/ordersRoute.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use(cakeRoute);
app.use(clientRoute);
app.use(orderRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listen from ${PORT}`));