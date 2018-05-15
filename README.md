# Metrics PLI

## Usage

Install via npm

    npm i @metrics-pli/core @metrics-pli/types

You need to write your tests like to match the interface `TestInterface`.

An example:

```typescript
import MetricsPli from "@metrics-pli/core";
import { ConfigInterface, TestInterface } from "@metrics-pli/types";

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
