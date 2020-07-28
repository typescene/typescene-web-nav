import { JSX, UICell, UIStyle } from "typescene";

/** Style for the `AppDrawerView` component */
const _appDrawerStyle = UIStyle.create("AppDrawer", {
  position: { gravity: "stretch" },
  dimensions: { width: "95%", maxWidth: 380, height: "100vh", shrink: 1, grow: 0 },
  containerLayout: { distribution: "start" },
  decoration: { background: "@background", dropShadow: 1 },
});

/**
 * Application drawer component.
 * This component is meant for use inside of `AppLayoutView`, such that it can be toggled automatically using the `AppMenuButtonView`.
 */
export class AppDrawerView extends UICell.with({
  style: _appDrawerStyle,
}) {}

/**
 * Application drawer component with JSX support.
 * This component is meant for use inside of an `AppLayout` component, such that it can be toggled automatically using an `AppMenuButton` component.
 */
export const AppDrawer = JSX.tag(AppDrawerView);
