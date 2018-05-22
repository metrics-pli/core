import * as fs from "fs";
import * as path from "path";

import MetricsPli from "../index";

import tests from "./tests";

(async () => {
  const metricsPli = new MetricsPli(tests);

  metricsPli.on("error", console.error);
  metricsPli.on("data", ({ results, test }) => {
    const saveToFilepath = path.resolve(
      __dirname,
      `metrics/test-${encodeURIComponent(test.name)}.json`,
    );

    fs.writeFileSync(saveToFilepath, JSON.stringify(results), "utf-8");
  });

  await metricsPli.run();
})();
