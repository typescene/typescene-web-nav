import {
  JSX,
  UICell,
  UISelectionController,
  UIScrollContainer,
  UIRenderableConstructor,
  UIStyle,
} from "typescene";

/** Style for `TabBarView` */
const _tabBarStyle = UIStyle.create("TabBar", {
  position: { gravity: "stretch" },
  containerLayout: { axis: "horizontal", distribution: "fill" },
  dimensions: { grow: 0 },
  decoration: {
    css: { zIndex: "10" },
    borderThickness: { bottom: 1 },
    borderColor: "@text/35%",
  },
});

/**
 * A bar containing tabs, for use with `TabBarButtonView`
 */
export class TabBarView extends UICell.with({ style: _tabBarStyle }) {
  static preset(
    presets: UICell.Presets,
    ...content: Array<UIRenderableConstructor | undefined>
  ) {
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
export const TabBar = JSX.tag(TabBarView);
