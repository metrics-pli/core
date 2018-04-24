import * as EventEmitter from "events";

import Browser from "./Browser";
import { TYPES } from "./constants";
import TestActionInterface from "./Interfaces/TestActionInterface";
import TestInterface from "./Interfaces/TestInterface";
import Store from "./Store";

export default class Test extends EventEmitter {
  constructor(
    private session: Browser,
    private tests: TestInterface[],
  ) {
    super();
  }

  public async run(key: number = 0) {
    await this.runTest(this.tests[key]);

    if (this.tests[key + 1]) {
      await this.run(key + 1);
    }
  }

  private async runAction(action: TestActionInterface) {
    super.emit("info", `  Running action ${action.name}`);

    switch (action.name) {
      case TYPES.FILL:
        (action.content as Array<[string, string]>).forEach(async (state) => {
          if (state.constructor === Array) {
            await this.session.fill(state[0], state[1]);
          }
        });
        break;

      case TYPES.CLICK:
        await this.session.click(action.content);
        break;

      case TYPES.WAIT:
        await new Promise((resolve) => {
          setTimeout(() => resolve(), action.await);
        });
        break;

      default:
        break;
    }
  }

  private async runNextAction(actions: TestActionInterface[], key: number) {
    await this.runAction(actions[key]);

    if (actions[key + 1]) {
      await this.runNextAction(actions, key + 1);
    }
  }

  private async runTest(test: TestInterface) {
    super.emit("info", `Opening page ${test.url}`);

    await this.session.open(test.url);

    const performanceData = await this.session.getMetrics();
    Store.set(test.url, performanceData);

    super.emit("data", {
      results: performanceData,
      test,
    });

    if (test.actions) {
      this.runNextAction(test.actions, 0);
    }
  }
}
