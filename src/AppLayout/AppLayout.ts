import {
  JSX,
  DialogViewActivity,
  managedChild,
  UICell,
  UIRenderableConstructor,
  UIRenderPlacement,
  UIScrollContainer,
  UIStyle,
  ViewComponent,
} from "typescene";
import { AppDrawerView } from "./AppDrawer";
import { AppHeaderView } from "./AppHeader";

class DrawerActivity extends DialogViewActivity {
  static preset(presets: any, View?: UIRenderableConstructor) {
    let result = super.preset(presets, View);
    if (View) {
      this.presetBoundComponent("view", View).limitBindings();
    }
    return result;
  }
  constructor() {
    super();
    this.placement = UIRenderPlacement.DRAWER;
    this.modalShadeClickToClose = true;
  }
}

/** Overall application layout view, encapsulates `AppHeaderView`, `AppDrawerView`, and any other content in a scrollable area */
class AppLayoutView extends ViewComponent {
  static preset(
    presets: UICell.Presets,
    ...content: Array<UIRenderableConstructor | undefined>
  ) {
    // make sure the outer cell has a height limit
    let dimensions = presets.dimensions as Partial<UIStyle.Dimensions>;
    if (!dimensions) dimensions = presets.dimensions = {};
    if (!dimensions.maxHeight) {
      dimensions.height = "100vh";
      dimensions.maxHeight = "100%";
    }

    // take header and drawer components and add them separately
    let Header: typeof UICell | undefined;
    let Drawer: typeof UICell | undefined;
    content = content.filter(C => {
      if (C && C.prototype instanceof AppHeaderView) {
        Header = C as any;
        return false;
      }
      if (C && C.prototype instanceof AppDrawerView) {
        Drawer = C as any;
        return false;
      }
      return true;
    });

    // handle `ShowAppMenu` event to trigger the drawer
    if (Drawer) {
      let DrawerClass = DrawerActivity.with(Drawer);
      this.presetBindingsFrom(DrawerClass);
      this.prototype._Drawer = DrawerClass;
      this.addEventHandler(function (e) {
        if (e.name === "ShowAppMenu") {
          this.showDrawerAsync();
        }
      });
    }

    // preset actual content
    let Cell = UICell.with(presets, Header, UIScrollContainer.with(...content));
    this.presetChildView("view", Cell);
    return super.preset({});
  }

  /** View activity for the drawer, if any */
  @managedChild
  drawerActivity?: DrawerActivity;

  /** Show the drawer as a dialog view activity (creates a new instance each time) */
  async showDrawerAsync(): Promise<DialogViewActivity> {
    if (!this._Drawer) throw Error();
    let drawer = (this.drawerActivity = new this._Drawer());
    await drawer.activateAsync();
    return drawer;
  }

  private _Drawer?: typeof DrawerActivity;
}

// set on prototype:
export const AppLayout = JSX.tag(AppLayoutView);
