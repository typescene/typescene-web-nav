import JSX, {
  UICell,
  UISelectionController,
  UIScrollContainer,
  UIRenderableConstructor,
  UIStyle,
} from "typescene/JSX";

/** Style for `TabBar` */
const _tabBarStyle = UIStyle.create("TabBar", {
  position: { gravity: "stretch" },
  containerLayout: { axis: "horizontal", distribution: "fill" },
  dimensions: { grow: 0 },
  controlStyle: {
    css: { zIndex: "10" },
    borderThickness: { bottom: 1 },
    borderColor: "@text/35%",
  },
});

/**
 * A bar containing tabs, for use with `TabBarButton`
 */
export class TabBarComponent extends UICell.with({ style: _tabBarStyle }) {
  static preset(presets: UICell.Presets, ...content: Array<UIRenderableConstructor>) {
    return super.preset(
      presets,
      UISelectionController.with(
        UIScrollContainer.with(
          {
            style: UIStyle.create("TabBar_inner", {
              containerLayout: {
                axis: "horizontal",
                distribution: "start",
              },
              dimensions: { width: "100%", grow: 0 },
            }),
            horizontalScrollEnabled: true,
          },
          ...content
        )
      )
    );
  }
}

/**
 * A bar containing tabs, for use with `TabBarButton`, with JSX support
 */
export const TabBar = JSX.ify(TabBarComponent);
