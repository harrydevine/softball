import React, { useEffect } from 'react';
import {
  Avatar,
  Brand,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownToggle,
  Masthead,
  MastheadBrand,
  MastheadMain,
  MastheadToggle,
  MastheadContent,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import BarsIcon from '@patternfly/react-icons/dist/js/icons/bars-icon';
import Image from "../tornados.png";
import avatarImg from '@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg';

const SoftballMasthead = ({ children }) => {
  return (
    <Masthead id="ehtys" backgroundColor="dark">
      <MastheadToggle>
        <PageToggleButton variant="plain" aria-label="Global Navigation">
          <BarsIcon />
	        <Link to="/"></Link>
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand>
          <Brand src={Image} alt="EHTYS Logo" width="50" height="50" />
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent> Egg Harbor Township Youth Softball </MastheadContent>
    </Masthead>
  );
}

export default SoftballMasthead;
