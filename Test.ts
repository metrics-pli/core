import Tests from "./tests";

import Browser from "./Browser";
import TestInterface from "./Interfaces/TestInterface";
import TestActionInterface from "./Interfaces/TestActionInterface";
import { TYPES } from "./constants";


const runAction = async (Session: Browser, action: TestActionInterface) => {
  console.log("Running action", action.name);

  switch (action.name) {
    case TYPES.FILL:
      (action.content as Array<[string, string]>).forEach(async (state) => {
        if (state.constructor === Array) {
          await Session.fill(state[0], state[1]);
        }
      });
      break;

    case TYPES.CLICK:
      await Session.click(action.content);
      break;

    case TYPES.WAIT:
      await new Promise((resolve) => {
        setTimeout(() => resolve(), action.await);
      });
      break;

    default:
      break;
  }
};

const runNextAction = async (Session: Browser, actions: TestActionInterface[], key: number) => {
  await runAction(Session, actions[key])

  if (actions[key + 1]) {
    await runNextAction(Session, actions, key + 1);
  }
};

const runTest = async (Session: Browser, test: TestInterface) => {
  console.log("Opening page", test.url)

  await Session.open(test.url);

  // Measure here

  if (test.actions) {
    runNextAction(Session, test.actions, 0);
  }
};

export const runNextTest = async (Session: Browser, key: number) => {
  await runTest(Session, Tests[key])

  if (Tests[key + 1]) {
    await runNextTest(Session, key + 1);
  }
};
