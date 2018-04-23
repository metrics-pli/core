import Browser from "./Browser";
import { runNextTest } from "./Test";
import Store from "./Store";

(async () => {
  const Session: Browser = new Browser();

  await Session.start()

  await runNextTest(Session, 0);

  await Session.close();

  console.log(Store.getAll())
})();
