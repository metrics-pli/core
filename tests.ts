import TestInterface from "./Interfaces/TestInterface";
import { TYPES } from "./constants";

const tests: TestInterface[] = [{
  url: "https://npmjs.com"
}, {
  url: "https://www.npmjs.com/login",
  actions: [{
    name: TYPES.FILL,
    content: [
      ["#login_username", "___test___"],
      ["#login_password", "thisisthetestaccount"],
    ],
  }, {
    name: TYPES.CLICK,
    content: [
      "#login [type=\"submit\"",
    ],
  }, {
    name: TYPES.WAIT,
    await: 3000,
  }],
}, {
  url: "https://www.npmjs.com/package/lodash"
}];

export default tests;
