import { ComponentList, compose, ManagedState, PageViewActivity, UIComponentEvent, ViewComponent } from "typescene";
import { TabBarButton } from "../../../src";
import { Tab1 } from "./tab1";
import { Tab2 } from "./tab2";
import view from "./view";

export class MainActivity extends PageViewActivity.with(view) {
    path = "";

    @compose(ComponentList.with(Tab1, Tab2))
    tabs?: ComponentList<ViewComponent>;

    subTabIndex = 0;

    selectTab(event: UIComponentEvent) {
        if (event.source instanceof TabBarButton) {
            let index = event.source.tabButtonIndex;
            console.log("Tab selected:", index);
        }
    }

    selectSubTab(event: UIComponentEvent) {
        if (event.source instanceof TabBarButton) {
            this.subTabIndex = event.source.tabButtonIndex;
            console.log(this.tabs!.toArray().map(t => ManagedState[t.managedState]));
        }
    }
}
