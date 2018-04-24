import * as EventEmitter from "events";

import Browser from "./lib/Browser";
import TestInterface from "./lib/Interfaces/TestInterface";
import Store from "./lib/Store";
import Test from "./lib/Test";

export { default as TestInterface } from "./lib/Interfaces/TestInterface";

export default class MetricsPli extends EventEmitter {
  private session: Browser;
  private test: Test;

  constructor(private tests: TestInterface[]) {
    super();

    this.session = new Browser();
    this.test = new Test(this.session, this.tests);

    this.session.on("error", this.handleError.bind(this));
    this.session.on("info", this.handleInfo.bind(this));
    this.test.on("error", this.handleError.bind(this));
    this.test.on("info", this.handleInfo.bind(this));
  }

  public async run() {
    await this.session.start();
    await this.test.run();
    await this.session.close();

    super.emit("data", Store.getAll());
  }

  private handleError(error: Error): void {
    super.emit("error", error);
  }

  private handleInfo(info: Error): void {
    super.emit("info", info);
  }
}
