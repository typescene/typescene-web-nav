import JSX, { UIBorderlessButton, UIButton, UIStyle, observe } from "typescene/JSX";

/** Style for `TabBarButton` */
const _tabBarButtonStyle = UIStyle.create("TabBarButton", {
  position: { gravity: "end" },
  dimensions: { height: 42, maxHeight: 42, minWidth: 32, shrink: 0 },
  textStyle: { align: "start" },
  controlStyle: {
    textColor: "@text",
    borderRadius: 0,
    background: "transparent",
    borderThickness: 0,
    padding: { x: 16 },
    css: {
      transition: "all .2s ease-in-out",
    },
  },
})
  .addState("hover", {
    controlStyle: { background: "@primary/10%", textColor: "@primary" },
  })
  .addState("focused", {
    controlStyle: { background: "@primary/10%", dropShadow: 0.1 },
  })
  .addState("selected", {
    controlStyle: {
      textColor: "@primary",
      borderThickness: { bottom: 2, x: 0 },
      padding: { top: 2, x: 16 },
      borderColor: "@primary",
    },
  });

/** Style mixin with inverse colors */
const _inverseTabBarButtonStyle = UIStyle.create("TabBarButton", {
  controlStyle: {
    textColor: "@text:text",
    background: "transparent",
  },
})
  .addState("hover", {
    controlStyle: { background: "@text:text/20%", textColor: "@text:text" },
  })
  .addState("focused", {
    controlStyle: {
      background: "@text:text/20%",
      textColor: "@text:text",
      dropShadow: 0.1,
    },
  })
  .addState("selected", {
    controlStyle: {
      borderThickness: { bottom: 2, x: 0 },
      borderColor: "@text:text",
    },
  });

/**
 * Tab bar button, for use inside of `TabBarComponent`.
 */
export class TabBarButtonComponent extends UIBorderlessButton.with({
  style: _tabBarButtonStyle,
}) {
  static preset(presets: UIButton.Presets & { selected?: boolean; inverse?: boolean }) {
    if (presets.inverse) presets.style = _inverseTabBarButtonStyle;
    return super.preset(presets);
  }
  selected?: boolean;

  @observe
  static TabBarButtonObserver = class {
    constructor(public readonly button: TabBarButtonComponent) {}
    onSelectedChangeAsync() {
      if (this.button.selected) {
        this.button.propagateComponentEvent("Select");
      } else {
        this.button.propagateComponentEvent("Deselect");
      }
    }
    onRendered() {
      if (this.button.selected) {
        this.button.propagateComponentEvent("Select");
      }
    }
    onSelect() {
      this.button.selected = true;
    }
    onDeselect() {
      this.button.selected = false;
    }
    onClick() {
      this.button.propagateComponentEvent("Select");
    }
    onArrowLeftKeyPress() {
      this.button.requestFocusPrevious();
    }
    onArrowRightKeyPress() {
      this.button.requestFocusNext();
    }
  };
}

/**
 * Tab bar button, for use inside of a `TabBar` component, with JSX support.
 */
export const TabBarButton = JSX.ify(TabBarButtonComponent);
