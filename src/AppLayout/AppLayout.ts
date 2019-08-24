import JSX, {
  Application,
  DialogViewActivity,
  UICell,
  UIFlowCell,
  UIRenderableConstructor,
  UIRenderPlacement,
  UIScrollContainer,
  UIStyle,
  ViewComponent,
} from "typescene/JSX";
import { AppDrawerComponent } from "./AppDrawer";
import { AppHeaderComponent } from "./AppHeader";

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
    this.handle({
      Active() {
        this._Drawer = Drawer;
      },
      ShowAppMenu() {
        this.showDrawerAsync();
      },
    });

    // preset actual content
    return super.preset(
      {},
      UICell.with(presets, Header, UIScrollContainer.with(...content))
    );
  }

  async showDrawerAsync(): Promise<DialogViewActivity> {
    let app = this.getParentComponent(Application);
    if (!this._Drawer || !app) throw Error();

    class DrawerActivity extends DialogViewActivity.with(this._Drawer) {
      placement = UIRenderPlacement.DRAWER;
      modalShadeClickToClose = true;
      constructor() {
        super();
        this.propagateChildEvents(e => {
          if (e.name === "CloseModal") this.destroyAsync();
        });
      }
    }
    return app.showViewActivityAsync(new DrawerActivity());
  }

  private _Drawer?: typeof UICell;
}

export const AppLayout = JSX.ify(AppLayoutView);
