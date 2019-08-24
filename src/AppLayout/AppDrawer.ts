import JSX, { UICell, UIStyle } from "typescene/JSX";

/** Style for the `AppDrawer` component */
const _appDrawerStyle = UIStyle.create("AppDrawer", {
  position: { gravity: "stretch" },
  dimensions: { width: "95%", maxWidth: 380, height: "100vh", shrink: 1, grow: 0 },
  containerLayout: { distribution: "start" },
});

/**
 * Application drawer component.
 * This component is meant for use inside of `AppLayoutComponent`, such that it can be toggled automatically using the `AppMenuButtonComponent`.
 */
export class AppDrawerComponent extends UICell.with({
  background: "@background",
  dropShadow: 1,
  style: _appDrawerStyle,
}) {}

/**
 * Application drawer component with JSX support.
 * This component is meant for use inside of an `AppLayout` component, such that it can be toggled automatically using an `AppMenuButton` component.
 */
export const AppDrawer = JSX.ify(AppDrawerComponent);
