import {
  JSX,
  UIMenu,
  UIMenuItemSelectedEvent,
  UIRenderPlacement,
  bind,
  UIFlowCell,
  UIRow,
  UIHeading3,
  UIScrollContainer,
  UIParagraph,
  UIIconButton,
} from "typescene";
import {
  AppDrawer,
  AppHeader,
  AppLayout,
  AppMenuButton,
  AppTitle,
  AppToolbar,
  TabBar,
  TabBarButton,
} from "../../dist";

const _moreVertIcon =
  '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>';

const _moreMenu = UIMenu.with({
  onSelectMenuItem(e: UIMenuItemSelectedEvent) {
    console.log("Selected: ", e.key);
  },
  onBuild() {
    this.builder.setGravity("end");
    this.builder.setRevealTransition("down-fast");
    this.builder.addOption("1", "Do something...");
    this.builder.addOption("2", "Another thing");
    this.builder.addSeparator();
    this.builder.addOption("3", "Feedback");
  },
});

// example using factory-based syntax:
const MyDrawer = AppDrawer.with(
  {
    revealTransition: "right-fast",
    exitTransition: "left-fast",
  },
  UIFlowCell.with(
    {
      dimensions: { height: 180 },
      background: "@slate",
      textColor: "@white",
      padding: 16,
      layout: { distribution: "end" },
    },
    UIRow.with(UIHeading3.withText("Drawer")),
    UIIconButton.with({
      icon: "close",
      iconColor: "@white",
      iconSize: 16,
      onClick: "+CloseModal",
      position: { gravity: "overlay", top: 8, right: 8 },
    })
  ),
  UIScrollContainer.with(
    UIFlowCell.with({ padding: 16 }, UIRow.with(UIParagraph.withText("Drawer content")))
  )
);

// example using JSX syntax:
export default (
  <AppLayout>
    {MyDrawer}

    {/* Header (top nav) */}
    <AppHeader>
      <AppMenuButton />
      <AppTitle icon="⭐️">Application</AppTitle>
      <AppToolbar>
        <borderlessbutton textStyle={{ color: "inherit" }}>Sign in</borderlessbutton>
        <modal modal={_moreMenu} placement={UIRenderPlacement.DROPDOWN}>
          <iconbutton
            textStyle={{ color: "inherit" }}
            icon={_moreVertIcon}
            iconSize={22}
            onClick="+ShowModal"
          />
        </modal>
      </AppToolbar>
    </AppHeader>

    {/* Regular tabs */}
    <flowcell padding={16}>
      <row>
        <p>Regular tabs:</p>
      </row>
      <TabBar>
        <TabBarButton onSelect="selectPrimaryTab()" selected>
          Primary
        </TabBarButton>
        <TabBarButton onSelect="selectSecondaryTab()">Secondary</TabBarButton>
      </TabBar>
      <conditional state={bind("tabSelection").match("primary")}>
        <cell revealTransition="left-fast">
          <row>
            <label textStyle={{ color: "@text/50%" }}>(Primary content)</label>
          </row>
        </cell>
      </conditional>
      <conditional state={bind("tabSelection").match("secondary")}>
        <cell revealTransition="right-fast">
          <row>
            <label textStyle={{ color: "@text/50%" }}>(Secondary content)</label>
          </row>
        </cell>
      </conditional>
    </flowcell>
    <separator />

    {/* Scrolling tabs */}
    <flowcell padding={16}>
      <row>
        <p>Scrolling tabs:</p>
      </row>
      <TabBar>
        <TabBarButton selected>First</TabBarButton>
        <TabBarButton>Second</TabBarButton>
        <TabBarButton>Third</TabBarButton>
        <TabBarButton>Fourth</TabBarButton>
        <TabBarButton>Fifth</TabBarButton>
        <TabBarButton>Sixth</TabBarButton>
        <TabBarButton>Seventh</TabBarButton>
        <TabBarButton>Eighth</TabBarButton>
        <TabBarButton>Ninth</TabBarButton>
        <TabBarButton>Tenth</TabBarButton>
      </TabBar>
    </flowcell>
    <separator />

    {/* Justified tabs */}
    <flowcell padding={16}>
      <row>
        <p>Justified tabs:</p>
      </row>
      <TabBar>
        <TabBarButton
          shrinkwrap={false}
          textStyle={{ fontSize: 14, align: "center", uppercase: true }}
          selected
        >
          Primary
        </TabBarButton>
        <TabBarButton
          shrinkwrap={false}
          textStyle={{ fontSize: 14, align: "center", uppercase: true }}
        >
          Secondary
        </TabBarButton>
      </TabBar>
    </flowcell>
    <separator />

    {/* Centered tabs */}
    <flowcell padding={16}>
      <row>
        <p>Centered tabs:</p>
      </row>
      <TabBar>
        <spacer />
        <TabBarButton selected>Primary</TabBarButton>
        <TabBarButton>Secondary</TabBarButton>
        <spacer />
      </TabBar>
    </flowcell>
    <separator />

    {/* Inverse tabs */}
    <flowcell padding={16}>
      <flowcell background="@primary" textColor="@primary:text" dropShadow={0.2}>
        <flowcell padding={8}>
          <row>
            <AppMenuButton />
            <h3>Navigation</h3>
          </row>
        </flowcell>
        <TabBar borderThickness={{ bottom: 0 }}>
          <TabBarButton inverse selected>
            Tabs
          </TabBarButton>
          <TabBarButton inverse>Are</TabBarButton>
          <TabBarButton inverse>Awesome</TabBarButton>
        </TabBar>
      </flowcell>
    </flowcell>

    {/* Inverse tabs */}
    <flowcell padding={16}>
      <flowcell background="@red" textColor="@red:text" dropShadow={0.2}>
        <flowcell padding={8}>
          <row>
            <AppMenuButton />
            <h3>Navigation</h3>
          </row>
        </flowcell>
        <TabBar borderThickness={{ bottom: 0 }}>
          <TabBarButton inverse selected>
            Tabs
          </TabBarButton>
          <TabBarButton inverse>Are</TabBarButton>
          <TabBarButton inverse>Awesome</TabBarButton>
        </TabBar>
      </flowcell>
    </flowcell>
  </AppLayout>
);
