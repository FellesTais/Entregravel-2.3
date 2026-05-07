import express from "express";
import cors from "cors";
import { GeolocationController } from "./geolocation/geolocation.controller.js";

// NÃO MODIFIQUE ESSE ARQUIVO!

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json());

const geolocationController = new GeolocationController();
geolocationController.setupRoutes();
app.use("/geolocation", geolocationController.router);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`),
);
