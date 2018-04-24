# Metrics PLI

## Usage

You need to write your tests like to match the interface
[`TestInterface`](./lib/interfaces/TestInterface.ts).

An easy example:

```typescript
import MetricsPli, { ConfigInterface, TestInterface } from "@metrics-pli/core";
import * as fs from "fs";
import * as path from "path";

const tests: TestInterface[] = [{
  name: "Homepage",
  url: "https://google.com/",
}];

const config: ConfigInterface = {};

(async () => {
  const saveToFilepath = path.resolve(__dirname, "test.json");
  const metricsPli = new MetricsPli(tests, config);

  metricsPli.on("error", console.error);
  metricsPli.on("info", console.info);
  metricsPli.on("data", ({ result, test }) => {
    // result is of type ResultsetInterface
    // test is of type TestInterface
    fs.writeFileSync(saveToFilepath, JSON.stringify(result), "utf-8");
  });

  metricsPli.run();
})();
```

## License

MIT
