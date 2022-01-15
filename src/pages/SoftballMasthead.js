import React from 'react';
import {
  Brand,
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
import { Follow } from 'react-twitter-widgets';
import YouTubeSubscribe from './YouTubeSubscribe';

const SoftballMasthead = ({ children }) => {
//class SoftballMasthead extends React.Component {
//  render () {
    const headerToolbar = (
      <Toolbar id="toolbar" isFullHeight isStatic>
        <ToolbarContent>
	  <ToolbarGroup
	    variant="icon-button-group"
	    alignment={{ default: 'alignRight' }}
	    spacer={{ default: 'spacerNone', md: 'spacerMd' }}
	  >
	    <ToolbarItem>
              <Follow username="EHTSoftball" />
	    </ToolbarItem>
            <ToolbarItem>
              <YouTubeSubscribe
	        theme={"default"}
	        layout={"full"}
	        count={"default"}
	      />
            </ToolbarItem>
	  </ToolbarGroup>
	</ToolbarContent>
      </Toolbar>
    );

    return (
      <Masthead id="ehtys">
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
        <MastheadContent> Egg Harbor Township Youth Softball {headerToolbar}</MastheadContent>
      </Masthead>
    );
//  }
}

export default SoftballMasthead;
