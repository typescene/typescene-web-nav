import JSX, { UICell, UIRenderableConstructor, UIStyle } from "typescene/JSX";

/** Style for the `AppHeader` component */
const _appHeaderStyle = UIStyle.create("AppHeader", {
  dimensions: { height: 56, shrink: 0, grow: 0 },
  containerLayout: { distribution: "fill", axis: "horizontal", clip: true },
});

/**
 * Application header bar component.
 * This component is meant for use inside of `AppLayoutComponent`.
 */
export class AppHeaderComponent extends UICell.with({
  background: "@primary",
  textColor: "@primary:text",
  padding: { x: 16 },
  dropShadow: 0.5,
  separator: { type: "spacer", thickness: 16, vertical: true },
  css: { zIndex: "1000" },
  style: _appHeaderStyle,
}) {
  static preset(
    presets: UICell.Presets & { height: string | number },
    ...content: UIRenderableConstructor[]
  ) {
    if (presets.height) {
      presets.dimensions = { height: presets.height, shrink: 0, grow: 0 };
    }
    return super.preset(presets, ...content);
  }
}

/**
 * Application header bar component with JSX support.
 * This component is meant for use inside of an `AppLayout` component.
 */
export const AppHeader = JSX.ify(AppHeaderComponent);
