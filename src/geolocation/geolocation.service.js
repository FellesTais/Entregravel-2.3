import { GeolocationModel } from "./geolocation.model.js";

// É PROIBIDO IMPORTAR QUALQUER COISA ADICIONAL AQUI!

export class GeolocationService {
  constructor() {
    this.geolocationModel = new GeolocationModel();
  }

  teste() {
    console.log("Estou no service, e agora vou chamar a model!");
    this.geolocationModel.teste();
  }

  getAll() {
    return this.geolocationModel.getAll();
  }

  getByIndex(index) {
    return this.geolocationModel.getByIndex(index);
  }

  create(coords) {
    this.geolocationModel.create(coords);
  }

  update(index, coords) {
    return this.geolocationModel.update(index, coords);
  }

  delete(index) {
    return this.geolocationModel.delete(index);
  }

  getAllReversed() {
    return this.geolocationModel.getAllReversed();
  }

  getNearest(latitude, longitude) {
    return this.geolocationModel.getNearest(latitude, longitude);
  }

  partialUpdate(index, coords) {
    return this.geolocationModel.partialUpdate(index, coords);
  }
}
