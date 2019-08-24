import JSX, { UIRow, UIStyle } from "typescene/JSX";

/** Style for the `AppToolbar` component */
const _appToolbarStyle = UIStyle.create("AppToolbar", {
  position: { gravity: "center" },
});

/**
 * Application toolbar component.
 * This component is meant for use inside of `AppHeaderComponent`.
 */
export class AppToolbarComponent extends UIRow.with({
  spacing: 4,
  style: _appToolbarStyle,
}) {}

/**
 * Application toolbar component with JSX support.
 * This component is meant for use inside of an `AppHeader` component.
 */
export const AppToolbar = JSX.ify(AppToolbarComponent);
