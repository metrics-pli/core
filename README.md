# Metrics PLI

## Usage

You need to write your tests like to match the interface
[`TestInterface`](./lib/interfaces/TestInterface.ts).

An easy example:

```typescript
import * as fs from "fs"
import * as path from "path"
import MetricsPli, { TestInterface } from "@metrics-pli/core";

const tests: TestAction[] = [{
  url: "https://google.com/",
}];

(async () => {
  const saveToFilepath = path.resolve(__dirname, "test.json");
  const metricsPli = new MetricsPli(tests);

  metricsPli.on("error", console.error);
  metricsPli.on("info", console.info);
  metricsPli.on("data", ({ results, test }) => {
    fs.writeFileSync(saveToFilepath, JSON.stringify(results), "utf-8");
  });

  metricsPli.run();
})();
```

## License

MIT
