import { JSX, UIIconButton, UIStyle } from "typescene";

/** Style for `AppMenuButtonView` */
const _appMenuButtonStyle = UIStyle.create("AppMenuButton", {
  decoration: { textColor: "inherit" },
})
  .addState("hover", {
    decoration: { textColor: "inherit" },
  })
  .addState("focused", {
    decoration: { background: "@white^-10%/30%" },
  });

/**
 * Menu button component, triggers display of `AppDrawerView` if used anywhere inside of `AppLayoutView` (e.g. within `AppHeaderView`).
 */
export class AppMenuButtonView extends UIIconButton.with({
  icon: "menu",
  iconSize: 22,
  style: _appMenuButtonStyle,
  onClick: "+ShowAppMenu",
}) {}

/**
 * Menu button component, triggers display of an `AppDrawer` component if used anywhere inside of an `AppLayout` component (e.g. within the `AppHeader`).
 */
export const AppMenuButton = JSX.tag(AppMenuButtonView);
