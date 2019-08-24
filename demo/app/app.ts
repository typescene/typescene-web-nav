import { BrowserApplication } from "@typescene/webapp";
import { PageViewActivity } from "typescene";
import view from "./view";

class MainActivity extends PageViewActivity.with(view) {
  path = "/";
}

BrowserApplication.run(MainActivity);
