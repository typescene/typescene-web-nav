import { UICell, UICloseRow, UIOutlineButton, UISelectionController, UIStyle } from "typescene";

/** Default style for button selector components */
const _defaultStyle = UIStyle.create("ButtonSelectionGroup", {
        position: { gravity: "stretch" },
        dimensions: { grow: 1, shrink: 1 },
        containerLayout: { axis: "horizontal", distribution: "fill", clip: true }
    });

/** Default style for selector buttons */
const _defaultButtonStyle = UIStyle.create("SelectionGroupButton", {
        controlStyle: {
            background: "transparent",
            cssClassNames: ["SelectionGroupButton"],
        },
        position: { gravity: "stretch" }
    })
    .addState("focused", {
        controlStyle: { background: "@background^-5%", dropShadow: -.2 }
    })
    .addState("selected", {
        textStyle: { color: "@primary:text" },
        controlStyle: {
            background: "@primary"
        }
    });

// initialize CSS only once (on first use, below)
let _cssInitialized = false;
function initCSS() {
    if (_cssInitialized) return;
    let elt = document.createElement("style");
    elt.setAttribute("type", "text/css");
    document.head!.appendChild(elt);
    elt.textContent =
        ".SelectionGroupButton:not(:first-child):not(#moreSpecific){" +
        "margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}" +
        ".SelectionGroupButton:not(:last-child):not(#moreSpecific){" +
        "border-top-right-radius:0; border-bottom-right-radius:0}";
}

/** A button with predefined styles for use within a selector group */
export class SelectionGroupButton extends UIOutlineButton.with({
    shrinkwrap: false,
}) {
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
        this.style = this.style.mixin(_defaultButtonStyle);
    }
}
SelectionGroupButton.handle({
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

/** A button selection bar, to be populated with `SelectionGroupButton` */
export class ButtonSelectionGroup extends UICell {
    static preset(presets: UICell.Presets,
        ...content: Array<typeof SelectionGroupButton>) {
        initCSS();
        return super.preset(presets,
            UISelectionController.with(
                UICloseRow.with(
                    {
                        dimensions: { grow: 1, shrink: 1 }
                    },
                    ...content
                )
            )
        );
    }

    constructor(...buttons: SelectionGroupButton[]) {
        super(...buttons);
        this.style = this.style.mixin(_defaultStyle);
    }
}
