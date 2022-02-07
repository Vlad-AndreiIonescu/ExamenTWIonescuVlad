import { EventEmitter } from "fbemitter";

const SERVER = "http://localhost:8080";

class VirtualShelfStore {
  constructor() {
    this.data = [];
    this.emitter = new EventEmitter();
  }

  async getVirtualShelfs() {
    try {
      const response = await fetch(`${SERVER}/virtualShelfs`);
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("GET_VIRTUALSHELFS_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_VIRTUALSHELFS_ERROR");
    }
  }

  async addVirtualShelf(virtualShelf) {
    try {
      const response = await fetch(`${SERVER}/virtualShelfs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(virtualShelf),
      });
      if (!response.ok) {
        throw response;
      }
      this.getVirtualShelfs();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_VIRTUALSHELFS_ERROR");
    }
  }

  async saveVirtualShelf(id, virtualShelf) {
    try {
      const response = await fetch(`${SERVER}/virtualShelfs/${id}`, {
        method: "PUT",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(virtualShelf),
      });
      if (!response.ok) {
        throw response;
      }
      this.getVirtualShelfs();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("UPDATE_VIRTUALSHELFS_ERROR");
    }
  }

  async deleteVirtualShelf(id) {
    try {
      const response = await fetch(`${SERVER}/virtualShelfs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw response;
      }
      this.getVirtualShelfs();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("DELETE_VIRTUALSHELFS_ERROR");
    }
  }
}

const store = new VirtualShelfStore();

export default store;
