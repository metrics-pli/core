import {
  EventContent,
  TestActionInterface,
  TestInterface,
} from "@metrics-pli/types";
import * as Debug from "debug";
import * as EventEmitter from "events";

import Browser from "./Browser";
import { TYPES } from "./constants";
import Store from "./Store";

const debug = Debug("mpli:core");

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

  private async fill(content: Array<[string, string]>, index: number = 0) {
    const state: [string, string] = content[index];

    await this.session.fill(state[0], state[1]);

    if (content[index + 1]) {
      await this.fill(content, index + 1);
    }
  }

  private async runAction(action: TestActionInterface) {
    debug(`Running action ${action.name}`);

    switch (action.name) {
      case TYPES.FILL:
        await this.fill(action.content as Array<[string, string]>);
        break;

      case TYPES.CLICK:
        let clickElements: string | string[] = action.content as string | string[];

        if (clickElements && typeof clickElements === "string") {
          clickElements = [clickElements];
        }

        await this.session.clicks(clickElements as string[]);

        break;

      case TYPES.TRIGGER_EVENT:
        const { selector, eventName, data } = action.content as EventContent;

        await this.session.triggerEvent(selector, eventName, data);
        break;

      case TYPES.WAIT_FOR_NAVIGATION:
        await this.session.waitForNavigation();
        break;

      case TYPES.WAIT:
        await new Promise((resolve) => {
          setTimeout(resolve, action.timeout);
        });
        break;

      default:
        break;
    }
  }

  private async runNextAction(actions: TestActionInterface[], key: number = 0) {
    await this.runAction(actions[key]);

    if (actions[key + 1]) {
      await this.runNextAction(actions, key + 1);
    }
  }

  private async runTest(test: TestInterface) {
    debug(`Opening page ${test.url}`);

    const performanceData = await this.session.getMetrics(test.url);
    await this.session.open(test.url);

    Store.set(test.url, performanceData);

    super.emit("data", {
      results: performanceData,
      test,
    });

    if (test.actions) {
      try {
        await this.runNextAction(test.actions);
      } catch (error) {
        super.emit("error", error);
      }
    }
  }
}
