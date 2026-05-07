import { Router } from "express";
import { GeolocationService } from "./geolocation.service.js";

// É PROIBIDO IMPORTAR QUALQUER COISA ADICIONAL AQUI!

export class GeolocationController {
  constructor() {
    this.geolocationService = new GeolocationService();
    this.router = Router();
  }

  setupRoutes() {
    // Adicione uma rota para pegar a lista de coordenadas invertida
    this.router.get("/lista-reversa", this.getReverseCoords.bind(this));
    // Adicione uma rota para buscar a coordenada mais próxima da lista, dada uma latitude e longitude (utilizar distância manhattan)
    this.router.get("/proxima", this.getNearestCoord.bind(this));
    // Adicione uma rota que atualize PARCIALMENTE uma rota pelo índice. Você deve ser capaz de atualizar somente a latitude, somente a longitude, ou ambos!
    this.router.patch("/:index", this.partialUpdateCoords.bind(this));

    this.router.get("/", this.getAllCoords.bind(this));
    this.router.get("/:index", this.getCoordsByIndex.bind(this));
    this.router.delete("/:index", this.deleteCoordsByIndex.bind(this));
    this.router.put("/:index", this.updateCoordsByIndex.bind(this));
    this.router.post("/", this.createCoords.bind(this));

  }

  async getAllCoords(req, res) {
    const coords = this.geolocationService.getAll();

    if (coords.length === 0) {
      return res.status(200).json({
        message: "Não foram encontradas coordenadas."
      });
    }

    res.status(200).json(coords);
  }

  async getCoordsByIndex(req, res) {
    const index = Number(req.params.index);
    const coord = this.geolocationService.getByIndex(index);

    if (!coord) {
      return res.status(404).json({ message: "Nenhuma coordenada encontrada." });
    }

    res.status(200).json(coord);
  }

  async deleteCoordsByIndex(req, res) {
    const index = Number(req.params.index);
    const deleted = this.geolocationService.delete(index);

    if (!deleted) {
      return res.status(404).json({ message: "Nenhuma coordenada encontrada." });
    }

    res.status(200).json({
      message: "Coordenada removida.", coordenada: deleted
    });
  }

  async updateCoordsByIndex(req, res) {
    const index = Number(req.params.index);
    const coords = req.body;
    const updated = this.geolocationService.update(index, coords);

    if (!updated) {
      return res.status(404).json({
        message: "Nenhuma coordenada encontrada."
      });
    }

    res.status(200).json({
      message: "Coordenada atualizada.", coordenada: updated
    });
  }

  async createCoords(req, res) {
    // { latitude: number, longitude: number }
    const coords = req.body;

    this.geolocationService.create(coords);

    res.status(201).json({
        message: "Coordenada criada.", coordenada: coords
      }
    );
  }

  async getReverseCoords(req, res) {
    const reversed = this.geolocationService.getAllReversed();

    if (reversed.length === 0) {
    return res.status(200).json({
      message: "Não foram encontradas coordenadas."
    });
  }

    res.status(200).json(reversed);
  }

  async getNearestCoord(req, res) {
    const { latitude, longitude } = req.query;

    const nearest = this.geolocationService.getNearest(
      Number(latitude),
      Number(longitude)
    );

    if (!nearest) {
    return res.status(404).json({
      message: "Nenhuma coordenada encontrada."
    });
  }

    res.status(200).json({message: "Coordenada mais próxima encontrada.", coordenada: nearest});
  }

  async partialUpdateCoords(req, res) {
    const index = Number(req.params.index);
    const coords = req.body;
    const updated = this.geolocationService.partialUpdate(index, coords);

    if (!updated) {
      return res.status(404).json({
        message: "Nenhuma coordenada encontrada."
      });
    }

    res.status(200).json({
      message: "Coordenada atualizada.", coordenada: updated
    });
  }

}