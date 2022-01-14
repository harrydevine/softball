import "@patternfly/react-core/dist/styles/base.css";
import { useNavigate } from "react-router-dom";

import React from "react";
import {
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSectionVariants,
  PageSidebar
} from "@patternfly/react-core";
import SoftballMasthead from "./SoftballMasthead";

const SoftballPageLayoutNav = ({ children }) => {
  const navigate = useNavigate();

  const [activeGroup, setActiveGroup] = React.useState("itemHome");
  const [activeItem, setActiveItem] = React.useState("itemHome");

  const onNavSelect = ({ itemId, groupId }) => {
    setActiveGroup(groupId);
    setActiveItem(itemId);
    switch (itemId) {
      case "itemHome":
        navigate("/");
        break;
      case "grpAboutMinutes":
        navigate("/boardminutes");
        break;
      case "grpAboutMembers":
        navigate("/boardmembers");
        break;
      case "itemFieldInfo":
        navigate("/fieldinfo");
        break;
      case "grpRecTeams":
        navigate("/recteams");
        break;
      default:
        navigate("/not-found");
    }
  };

  
  const PageNav = (
    <Nav onSelect={onNavSelect} aria-label="Nav">
      <NavList>
        <NavItem itemId="itemHome" isActive={activeItem === "itemHome"}>
          Home
        </NavItem>
        <NavExpandable
          title="Board Information"
          groupId="grpAbout"
          isActive={activeGroup === "grpAbout"}
        >
          <NavItem
            groupId="grpAbout"
            itemId="grpAboutMinutes"
            isActive={activeItem === "grpAboutMinutes"}
          >
            Board Meeting & Minutes
          </NavItem>
          <NavItem
            groupId="grpAbout"
            itemId="grpAboutMembers"
            isActive={activeItem === "grpAboutMembers"}
          >
            Board Members
          </NavItem>
        </NavExpandable>
        <NavExpandable
          title="Teams"
          groupId="grpTeams"
          isActive={activeGroup === "grpTeams"}
        >
          <NavItem itemId="grpRecTeams" groupId="grpRecTeams">
            Rec Teams
          </NavItem>
          <NavItem itemId="grpTravelTeams" groupId="grpTravelTeams">
            Travel Teams
          </NavItem>
        </NavExpandable>
        <NavItem itemId="itemFieldInfo" isActive={activeItem === "itemFieldInfo"}>
          Field Information
        </NavItem>
        <NavItem itemId="itemForms" isActive={activeItem === "itemForms"}>
          Forms & Documents
        </NavItem>
        <NavItem itemId="itemShop" isActive={activeItem === "itemShop"}>
          Shop
        </NavItem>
        <NavItem itemId="itemFAQ" isActive={activeItem === "itemFAQ"}>
          FAQ
        </NavItem>
        <NavItem itemId="itemSponsors" isActive={activeItem === "itemSponsors"}>
          Sponsors
        </NavItem>
      </NavList>
    </Nav>
  );

  const Sidebar = <PageSidebar nav={PageNav} />;
  const pageId = "main-content-page-layout-expandable-nav";

  return (
    <Page
      header={<SoftballMasthead />}
      sidebar={Sidebar}
      isManagedSidebar
      mainContainerId={pageId}
    >
      <PageSection variant={PageSectionVariants.light}>
        {children}
      </PageSection>
    </Page>
  );
};

export default SoftballPageLayoutNav;
