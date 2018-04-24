import * as EventEmitter from "events";

import Browser from "./lib/Browser";
import ConfigInterface from "./lib/Interfaces/ConfigInterface";
import TestInterface from "./lib/Interfaces/TestInterface";
import Store from "./lib/Store";
import Test from "./lib/Test";

export { default as TestInterface } from "./lib/Interfaces/TestInterface";
export { default as ConfigInterface } from "./lib/Interfaces/ConfigInterface";

export default class MetricsPli extends EventEmitter {
  private session: Browser;
  private test: Test;

  constructor(private tests: TestInterface[], private config?: ConfigInterface) {
    super();

    this.session = new Browser(this.config);
    this.test = new Test(this.session, this.tests);

    this.session.on("error", this.handleError.bind(this));
    this.session.on("info", this.handleInfo.bind(this));
    this.test.on("error", this.handleError.bind(this));
    this.test.on("info", this.handleInfo.bind(this));
    this.test.on("data", this.handleData.bind(this));
  }

  public async run() {
    await this.session.start();
    await this.test.run();
    await this.session.close();
  }

  private handleError(error: Error): void {
    super.emit("error", error);
  }

  private handleInfo(info: Error): void {
    super.emit("info", info);
  }

  private handleData(data: Error): void {
    super.emit("data", data);
  }
}
