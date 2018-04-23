import { TYPES } from "../constants";
import TestInterface from "../Interfaces/TestInterface";

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
      "#login [type=\"submit\"",
    ],
    name: TYPES.CLICK,
  }, {
    await: 3000,
    name: TYPES.WAIT,
  }],
  url: "https://www.npmjs.com/login",
}, {
  url: "https://www.npmjs.com/package/lodash",
}];

export default tests;
