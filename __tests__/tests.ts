import { TestInterface } from "../index";
import { TYPES } from "../lib/constants";

const tests: TestInterface[] = [{
  name: "homepage",
  url: "https://npmjs.com",
}, {
  actions: [{
    content: [
      ["#login_username", "___test___"],
      ["#login_password", "thisisthetestaccount"],
    ],
    name: TYPES.FILL,
  }, {
    content: {
      eventName: "input",
      selector: "#login_password",
    },
    name: TYPES.TRIGGER_EVENT,
  }, {
    name: TYPES.WAIT,
    timeout: 2000,
  }, {
    content: [
      "#login [type=\"submit\"]",
    ],
    name: TYPES.CLICK,
  }, {
    name: TYPES.WAIT_FOR_NAVIGATION,
  }],
  name: "login",
  url: "https://www.npmjs.com/login",
  }, {
  name: "package",
  url: "https://www.npmjs.com/package/lodash",
}];

export default tests;
