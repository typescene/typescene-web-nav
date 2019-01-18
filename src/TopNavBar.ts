import { bind, UICell, UIComponentEvent, UIHeading1, UIRenderableConstructor, UIRow, UISpacer, UIStyle, ViewComponent } from "typescene";

/** Default heading style */
const _headingStyle = UIStyle.create("TopNavBar__Heading", {
    textStyle: {
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: -.5
    }
});

/** Top navigation bar component, to be preset with a title and left/right button(s) */
export class TopNavBar extends ViewComponent.with(
    UICell.with(
        {
            layout: { axis: "horizontal", distribution: "fill", gravity: "center" },
            dimensions: { height: 48, grow: 0 },
            padding: 8,
            background: bind("background"),
            dropShadow: bind("dropShadow"),
            textColor: bind("textColor"),
            onBeforeRender: "onBeforeRender()",
            css: { zIndex: "100" }
        },
        UISpacer.withWidth(16),
        UIHeading1.with({
            position: { gravity: "center" },
            text: bind("title"),
            icon: bind("icon"),
            iconSize: 20,
            iconMargin: 20,
            shrinkwrap: false,
            style: _headingStyle,
            textStyle: bind("textStyle")
        })
    )
) {
    static preset(presets: TopNavBar.Presets,
        lhsButton?: UIRenderableConstructor,
        ...content: UIRenderableConstructor[]): Function {
        if (typeof presets.background === "string" && !presets.textColor) {
            presets.textColor = presets.background + ":text";
        }
        this.presetBindingsFrom(lhsButton, ...content);
        let f = super.preset(presets);
        return function (this: TopNavBar) {
            f.call(this);
            this._lhsButton = lhsButton;
            this._content.push(...content);
        };
    }

    /** Background color, defaults to `@primary` */
    background = "@primary";

    /** Overall text color, defaults to `@primary:text` */
    textColor = "@primary:text";

    /** Dropshadow size (see `UICell`), defaults to 0.3 */
    dropShadow = .3;

    /** Title text */
    title = "";

    /** Icon displayed to the left of the title */
    icon = "";

    /** Text style override for the heading label */
    textStyle?: Partial<UIStyle.TextStyle>;

    protected onBeforeRender(e: UIComponentEvent) {
        let cell: UICell = e.source as any;
        if (this._content.length) {
            let row = new UIRow();
            row.position = { ...row.position, gravity: "center" };
            row.content.add(...this._content.map(C => new C()));
            cell.content.add(row);
        }
        if (this._lhsButton) {
            cell.content.insert(new UISpacer(0),
                cell.content.first());
            cell.content.insert(new this._lhsButton(),
                cell.content.first());
        }
    }

    private _lhsButton?: UIRenderableConstructor;
    private _content: UIRenderableConstructor[] = [];
}

namespace TopNavBar {
    export interface Presets {
        /** Background color, defaults to `@primary` */
        background?: string;
        /** Overall text color, defaults to `@primary:text` */
        textColor?: string;
        /** Dropshadow size (see `UICell`), defaults to 0.3 */
        dropShadow?: number;
        /** Title text */
        title?: string;
        /** Icon displayed to the left of the title */
        icon?: string;
        /** (Partial) text style to be applied to the title label */
        textStyle?: Partial<UIStyle.TextStyle>
    }
}
