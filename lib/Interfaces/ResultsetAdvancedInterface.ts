export default interface ResultsetAdvancedInterface {
  generatedTime: string;
  initialUrl: string;
  url: string;
  audits: Array<{
    id: string;
    score: number;
    displayValue: string;
    rawValue: string;
    description: string;
  }>;
  fullResult: object;
}
