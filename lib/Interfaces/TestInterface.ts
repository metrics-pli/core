import TestActionInterface from "./TestActionInterface";

export default interface TestInterface {
  name: string;
  url: string;
  actions?: TestActionInterface[];
}
