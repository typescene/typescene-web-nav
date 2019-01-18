import { HMR } from "@typescene/webapp";
import { bind, tl, UICell, UICoverCell, UIFlowCell, UIIconButton, UIModalController, UIOppositeRow, UIPrimaryButton, UIRenderPlacement, UIRow, UIScrollContainer, UISpacer, UIViewRenderer } from "typescene";
import { InverseTabBarButton, TabBar, TabBarButton, TopNavBar } from "../../../src";

// Enable Hot Module Reloading for the view exported by this module:
HMR.enableViewReload(module)

export default UICoverCell.with(
    { background: "#eee" },

    // navigation bar at the top of the page
    TopNavBar.with(
        { title: "Navigation demo", dropShadow: 0 },

        // use a 'menu' icon to open the drawer
        UIModalController.with(
            {
                modalShadeOpacity: .2,
                placement: UIRenderPlacement.DRAWER
            },
            UIIconButton.with({
                icon: "menu",
                iconColor: "@primary:text",
                onClick: "+ShowModal"
            }),

            // drawer cell:
            UICell.with(
                {
                    background: "@background",
                    dropShadow: .3,
                    revealTransition: "right-fast",
                    dimensions: { width: "100%", maxWidth: 340 }
                },
                UICoverCell.with(
                    // fixed top part of the drawer with a 'close' button
                    UICell.with(
                        {
                            background: "@primary",
                            dimensions: { height: 200, grow: 0 },
                            layout: { distribution: "start" }
                        },
                        UIOppositeRow.with(
                            UIIconButton.withIcon("close", "+CloseModal", 20, "@primary:text")
                        )
                    ),

                    // scrolling bottom part of the drawer
                    UIScrollContainer.with(
                        UIFlowCell.with(
                            { padding: { x: 24, y: 16 } },
                            UIRow.with(tl("{b}Drawer"))
                        )
                    )
                )
            )
        ),

        // buttons on the far side of the navigation bar
        UIPrimaryButton.withLabel("Sign in")
    ),

    // tab bar right below the top nav bar
    TabBar.with(
        {
            background: "@primary",
            dropShadow: .3
        },
        UISpacer.withWidth(16),
        InverseTabBarButton.withLabel("First tab", "selectTab()", true),
        InverseTabBarButton.withLabel("Second tab", "selectTab()")
    ),

    // scrollable main area
    UIScrollContainer.with(
        UICell.with(
            {
                margin: 32,
                dimensions: { width: "100%", maxWidth: 400, grow: 0 },
                position: { gravity: "center" },
                background: "@background",
                dropShadow: .5,
            },
            UICell.with(
                { padding: { top: 8, x: 16 } },
                UIRow.with(tl("{h3}Content"))
            ),
            TabBar.with(
                { layout: { distribution: "end" } },
                TabBarButton.withLabel("General", "selectSubTab()", true),
                TabBarButton.withLabel("Advanced", "selectSubTab()"),
            ),
            UICell.with({
                dimensions: { height: 8 },
                background: "linear-gradient(@black/10%, transparent)"
            }),
            UIViewRenderer.with({
                managedList: bind("tabs"),
                index: bind("subTabIndex")
            })
        )
    )
)
