import Lhp from "../index";

import tests from "./tests";

(async () => {
  const lhp = new Lhp(tests);

  lhp.on("error", console.error);
  lhp.on("info", console.info);
  lhp.on("data", console.log);

  lhp.run();
})();
