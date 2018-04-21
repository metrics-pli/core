import Browser from "./Browser";
import { runNextTest } from "./Test";

(async () => {
  const Session: Browser = new Browser();

  await Session.start()

  await runNextTest(Session, 0);

  await Session.close();
})();
