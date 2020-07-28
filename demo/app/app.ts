import { BrowserApplication } from "@typescene/webapp";
import { PageViewActivity } from "typescene";
import view from "./view";

class MainActivity extends PageViewActivity.with(view) {
  path = "/";

  /** The currently selected tab, set using event handlers below */
  tabSelection?: "primary" | "secondary";

  /** Show the first tab */
  selectPrimaryTab() {
    console.log("Primary tab selected");
    this.tabSelection = "primary";
  }

  /** Show the second tab */
  selectSecondaryTab() {
    console.log("Secondary tab selected");
    this.tabSelection = "secondary";
  }
}

(window as any).app = BrowserApplication.run(MainActivity);
