class Node {
  constructor(coords) {
    this.coords = coords; // { latitude, longitude }
    this.next = null;
  }
}

export class GeolocationModel {
  constructor() {
    this.head = null;
  }

  create(coords) {
    const newNode = new Node(coords);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
  }

  getAll() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.coords);
      current = current.next;
    }

    return result;
  }

  getByIndex(index) {
    let current = this.head;
    let i = 0;

    while (current && i < index) {
      current = current.next;
      i++;
    }

    return current ? current.coords : null;
  }

  getAllReversed() {
    let current = this.head;
    let prev = null;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    const result = [];
    let temp = prev;

    while (temp) {
      result.push(temp.coords);
      temp = temp.next;
    }

    current = prev;
    prev = null;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    return result;
  }

  getNearest(latitude, longitude) {
    let current = this.head;

    if (!current) return null;

    let nearest = current.coords;
    let minDistance =
      Math.abs(latitude - current.coords.latitude) +
      Math.abs(longitude - current.coords.longitude);

    current = current.next;

    while (current) {
      const dist =
        Math.abs(latitude - current.coords.latitude) +
        Math.abs(longitude - current.coords.longitude);

      if (dist < minDistance) {
        minDistance = dist;
        nearest = current.coords;
      }

      current = current.next;
    }

    return nearest;
  }

  partialUpdate(index, coords) {
    let current = this.head;
    let i = 0;

    while (current && i < index) {
      current = current.next;
      i++;
    }

    if (!current) return null;

    if (coords.latitude !== undefined) {
      current.coords.latitude = coords.latitude;
    }

    if (coords.longitude !== undefined) {
      current.coords.longitude = coords.longitude;
    }

    return current.coords;
  }

  update(index, coords) {
    let current = this.head;
    let i = 0;

    while (current && i < index) {
      current = current.next;
      i++;
    }

    if (!current) return null;

    current.coords = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    return current.coords;
  }

  delete(index) {
    if (!this.head) return null;

    if (index === 0) {
      const removed = this.head.coords;
      this.head = this.head.next;
      return removed;
    }

    let current = this.head;
    let prev = null;
    let i = 0;

    while (current && i < index) {
      prev = current;
      current = current.next;
      i++;
    }

    if (!current) return null;

    prev.next = current.next;

    return current.coords;
  }
}