type FillContent = Array<[string, string]>;

export interface EventContent {
  selector: string;
  eventName: string;
  data?: any;
}

export default interface TestActionInterface {
  name: string;
  content?: FillContent | EventContent | string[] | string;
  timeout?: number;
}
