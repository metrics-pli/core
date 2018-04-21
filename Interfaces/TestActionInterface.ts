export default interface TestActionInterface {
  name: "fill" | "click";
  content?: Array<[string, string]> | string[];
}
