import { tl, UICell, UIRow, UISpacer, ViewComponent } from "typescene";

export class Tab2 extends ViewComponent.with(
    UICell.with(
        { padding: 16 },
        UIRow.with(tl("2. This is the second tab")),
        UISpacer.withHeight(100)
    )
) {
    // add logic here
}
