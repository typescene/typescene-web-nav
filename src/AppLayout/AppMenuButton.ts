import JSX, { UIIconButton, UIStyle } from "typescene/JSX";

/** Style for `AppMenuButton` */
const _appMenuButtonStyle = UIStyle.create("AppMenuButton", {
  controlStyle: { textColor: "inherit" },
})
  .addState("hover", {
    controlStyle: { textColor: "inherit" },
  })
  .addState("focused", {
    controlStyle: { background: "@white^-10%/30%" },
  });

/**
 * Menu button component, triggers display of `AppDrawerComponent` if used anywhere inside of `AppLayoutComponent` (e.g. within `AppHeaderComponent`).
 */
export class AppMenuButtonComponent extends UIIconButton.with({
  icon: "menu",
  iconSize: 22,
  style: _appMenuButtonStyle,
  onClick: "+ShowAppMenu",
}) {}

/**
 * Menu button component, triggers display of an `AppDrawer` component if used anywhere inside of an `AppLayout` component (e.g. within the `AppHeader`).
 */
export const AppMenuButton = JSX.ify(AppMenuButtonComponent);
