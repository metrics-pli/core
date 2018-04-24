class Store {
  private store: object = {};

  public set(key: string, value: object) {
    this.store[key] = value;
  }

  public get(key: string): object {
    return this.store[key];
  }

  public getAll(): object {
    return this.store;
  }
}

const store = new Store();

export default store;
