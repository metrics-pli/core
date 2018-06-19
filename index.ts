import {
  ConfigInterface,
  TestInterface,
} from "@metrics-pli/types";
import * as EventEmitter from "events";

import Browser from "./lib/Browser";
import Test from "./lib/Test";

export { TYPES as ACTION_TYPES } from "./lib/constants";

export default class MetricsPli extends EventEmitter {
  private session: Browser;
  private test: Test;

  constructor(
    private tests: TestInterface[],
    private config?: ConfigInterface,
  ) {
    super();

    this.session = new Browser(this.config);
    this.test = new Test(this.session, this.tests);

    this.session.on("error", this.handleError.bind(this));
    this.test.on("error", this.handleError.bind(this));
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

  private handleData(data: Error): void {
    super.emit("data", data);
  }
}
