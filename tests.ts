import TestInterface from "./Interfaces/TestInterface";

const tests: TestInterface[] = [{
  url: "https://npmjs.com"
}, {
  url: "https://www.npmjs.com/login",
  actions: [{
    name: "fill",
    content: [
      ["#login_username", "___test___"],
      ["#login_password", "thisisthetestaccount"],
    ],
  }, {
    name: "click",
    content: [
      "#login [type=\"submit\"",
    ],
  }],
}, {
  url: "https://www.npmjs.com/package/lodash"
}];

export default tests;
