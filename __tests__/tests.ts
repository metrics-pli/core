import { TestInterface } from "../index";
import { TYPES } from "../lib/constants";

const tests: TestInterface[] = [{
  url: "https://npmjs.com",
}, {
  actions: [{
    content: [
      ["#login_username", "___test___"],
      ["#login_password", "thisisthetestaccount"],
    ],
    name: TYPES.FILL,
  }, {
    content: [
      "#login [type=\"submit\"]",
    ],
    name: TYPES.CLICK,
  }, {
    name: TYPES.WAIT_FOR_NAVIGATION,
  }],
  url: "https://www.npmjs.com/login",
}, {
  url: "https://www.npmjs.com/package/lodash",
}];

export default tests;
