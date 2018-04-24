export default interface TestActionInterface {
  name: string;
  content?: Array<[string, string]> | string[];
  await?: number;
}
