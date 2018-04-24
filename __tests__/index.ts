import * as fs from "fs";
import * as path from "path";

import Lhp from "../index";

import tests from "./tests";

(async () => {
  const lhp = new Lhp(tests);

  lhp.on("error", console.error);
  lhp.on("info", console.info);
  lhp.on("data", (results) => {
    const filepath = path.resolve(__dirname, "test.json");
    fs.writeFileSync(filepath, JSON.stringify(results), "utf-8");
  });

  lhp.run();
})();
