import JSX, {
  DialogViewActivity,
  managedChild,
  UICell,
  UIRenderableConstructor,
  UIRenderPlacement,
  UIScrollContainer,
  UIStyle,
  ViewComponent,
} from "typescene/JSX";
import { AppDrawerComponent } from "./AppDrawer";
import { AppHeaderComponent } from "./AppHeader";

class DrawerActivity extends DialogViewActivity {
  static preset(presets: any, View?: UIRenderableConstructor) {
    if (View) {
      this.presetActiveComponent("view", View).limitBindings();
    }
    return super.preset(presets);
  }
  placement = UIRenderPlacement.DRAWER;
  modalShadeClickToClose = true;
  constructor() {
    super();
    this.propagateChildEvents(e => {
      if (e.name === "CloseModal") this.destroyAsync();
    });
  }
}

class AppLayoutView extends ViewComponent {
  static preset(presets: UICell.Presets, ...content: UIRenderableConstructor[]) {
    this.presetBindingsFrom(...content);

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
      if (C && C.prototype instanceof AppHeaderComponent) {
        Header = C as any;
        return false;
      }
      if (C && C.prototype instanceof AppDrawerComponent) {
        Drawer = C as any;
        return false;
      }
      return true;
    });

    // handle `ShowAppMenu` event to trigger the drawer
    if (Drawer) {
      this.prototype._Drawer = DrawerActivity.with(Drawer);
      this.handle({
        ShowAppMenu() {
          this.showDrawerAsync();
        },
      });
    }

    // preset actual content
    this.presetActiveComponent(
      "view",
      UICell.with(presets, Header, UIScrollContainer.with(...content))
    ).limitBindings();
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

export const AppLayout = JSX.ify(AppLayoutView);
