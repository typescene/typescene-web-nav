import { tl, UICell, UIRow, UISpacer, ViewComponent } from "typescene";
import { ButtonSelectionGroup, SelectionGroupButton } from "../../../src";

export class Tab1 extends ViewComponent.with(
    UICell.with(
        { padding: 16 },
        UIRow.with(tl("1. This is the first tab")),
        UISpacer,
        ButtonSelectionGroup.with(
            SelectionGroupButton.withLabel("Full"),
            SelectionGroupButton.withLabel("Half", "", true),
            SelectionGroupButton.withLabel("None"),
        ),
        UISpacer.withHeight(100)
    )
) {
    // add logic here
}
