import { JSX, UIHeading1, UIStyle } from "typescene";

/** Style for the `AppTitleView` component */
const _appTitleStyle = UIStyle.create("AppTitle", {
  position: { gravity: "center" },
  textStyle: {
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: -0.5,
  },
});

/**
 * Application title (heading) component.
 * This component is meant for use inside of `AppHeaderView`.
 */
export class AppTitleView extends UIHeading1.with({
  iconSize: 20,
  iconMargin: 12,
  shrinkwrap: false,
  style: _appTitleStyle,
}) {}

/**
 * Application title (heading) component with JSX support.
 * This component is meant to be used inside of an `AppHeader` component.
 */
export const AppTitle = JSX.tag(AppTitleView);
