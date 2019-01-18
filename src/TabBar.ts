import { UIBorderlessButton, UICell, UIComponentEvent, UIContainer, UIRenderableConstructor, UIScrollContainer, UISelectionController, UIStyle } from "typescene";

/** Default tab bar style */
const _defaultStyle = UIStyle.create("TabBar", {
        position: { gravity: "stretch" },
        containerLayout: { axis: "horizontal", distribution: "start" },
        dimensions: { grow: 0 },
        controlStyle: { css: { zIndex: "10" } }
    });

/** Default tab bar button style */
const _tabBarButtonStyle = UIStyle.create("TabBarButton", {
        position: { gravity: "end" },
        dimensions: { height: 42, maxHeight: 42, minWidth: 32, shrink: 0 },
        textStyle: { align: "start", color: "@text" },
        controlStyle: {
            borderRadius: 0,
            background: "transparent",
            css: {
                paddingLeft: "1rem",
                paddingRight: "1rem",
                borderLeft: "0",
                borderRight: "0",
                transition: "all .2s ease-in-out"
            }
        }
    })
    .addState("hover", {
        controlStyle: { background: "@background^-3%" },
        textStyle: { color: "@primary" }
    })
    .addState("focused", {
        controlStyle: { background: "@background^-3%", dropShadow: .1 }
    })
    .addState("selected", {
        textStyle: { color: "@primary" },
        controlStyle: {
            border: "2px solid @primary",
            css: { borderLeft: "0", borderRight: "0", borderTopColor: "transparent" }
        }
    });

/** Inverse tab bar button mixin */
const _inversetabBarButtonStyle = UIStyle.create("TabBarButton_Inverse", {
        textStyle: { align: "start", color: "@primary:text" },
        controlStyle: {
            borderRadius: 0,
            background: "@primary"
        }
    })
    .addState("hover", {
        controlStyle: { background: "@primary^-5%" },
        textStyle: { color: "@primary:text" }
    })
    .addState("focused", {
        controlStyle: { background: "@primary^-5%", dropShadow: .1 }
    })
    .addState("selected", {
        textStyle: { color: "@primary:text" },
        controlStyle: {
            border: "2px solid @primary:text",
            css: { borderLeft: "0", borderRight: "0", borderTopColor: "transparent" }
        }
    });

/** A button with predefined styles for use within a tab bar */
export class TabBarButton extends UIBorderlessButton {
    static withLabel(label?: string, onClick?: string, selected?: boolean) {
        return this.with({
            label,
            onClick,
            onRendered() {
                if (selected) {
                    selected = false;
                    this.propagateComponentEvent("Select");
                }
            }
        });
    }

    constructor(label?: string) {
        super(label);
        this.style = this.style.mixin(_tabBarButtonStyle);
    }

    /** Index of this button on the parent tab bar, or -1 if not applicable */
    get tabButtonIndex() {
        let parent = this.getParentComponent();
        console.log(parent);
        if (parent instanceof UIContainer) {
            return parent.content.indexOf(this);
        }
        return -1;
    }
}
TabBarButton.handle({
    Click() {
        this.propagateComponentEvent("Select");
    },
    ArrowLeftKeyPress() {
        this.requestFocusPrevious();
    },
    ArrowRightKeyPress() {
        this.requestFocusNext();
    }
});

/** A button with predefined styles (inverse primary color) for use within a tab bar */
export const InverseTabBarButton = TabBarButton.with({
    style: _inversetabBarButtonStyle
});

/** A bar containing tabs, for use with `TabBarButton` */
export class TabBar extends UICell {
    static preset(presets: UICell.Presets,
        ...content: Array<UIRenderableConstructor>) {
        return super.preset(presets,
            UISelectionController.with(
                UIScrollContainer.with(
                    {
                        layout: { axis: "horizontal" },
                        dimensions: { grow: 0 },
                        horizontalScrollEnabled: true
                    },
                    ...content
                )
            )
        );
    }

    constructor() {
        super();
        this.borderColor = "@primary";
        this.borderStyle = "solid";
        this.borderThickness = "0 0 .0625rem 0";
        this.style = this.style.mixin(_defaultStyle);
    }

    /** Index of last selected tab, if any (read-only) */
    selectedIndex?: number;
}
TabBar.handle({
    Select(e) {
        // update `selectedIndex` if possible
        if ((e instanceof UIComponentEvent) &&
            (e.source instanceof TabBarButton)) {
            let buttonParent = e.source.getParentComponent();
            if (buttonParent instanceof UIScrollContainer) {
                let selectedIndex = buttonParent.content.indexOf(e.source);
                this.selectedIndex = selectedIndex >= 0 ? selectedIndex : undefined;
            }
        }
    }
});
