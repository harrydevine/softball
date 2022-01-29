import React from 'react';
import {
  Brand,
  Button,
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
import { Link, useNavigate } from 'react-router-dom';
import BarsIcon from '@patternfly/react-icons/dist/js/icons/bars-icon';
import Image from "../tornados.png";
import { Follow } from 'react-twitter-widgets';
import YouTubeSubscribe from './YouTubeSubscribe';
import { FacebookSquareIcon } from '@patternfly/react-icons';
import useAuth from '../useAuth';

const SoftballMasthead = ({ children }) => {
//class SoftballMasthead extends React.Component {
  const navigate = useNavigate();
  const onLoginClick = () => {
    navigate("/login");
  }

//  render () {
    const headerToolbar = (
      <Toolbar id="toolbar" isFullHeight isStatic>
        <ToolbarContent>
          <ToolbarGroup
            variant="icon-button-group"
            alignment={{ default: 'alignRight' }}
            spacer={{ default: 'spacerNone', md: 'spacerMd' }}>
            <ToolbarItem visibility={{ default: 'hidden', md: 'visible' }}>
              <Button variant="danger" onClick={onLoginClick}>Admin Login</Button>
            </ToolbarItem>	    
            <ToolbarItem variant="separator"></ToolbarItem>
            <ToolbarItem space="spacerLg">
              <a href="https://www.facebook.com/groups/1687563661460656" target="_blank"><FacebookSquareIcon />EHT Softball Facebook Page</a>
            </ToolbarItem>
	    <ToolbarItem variant="separator"></ToolbarItem>
	    <ToolbarItem spacer="spacerLg">
              <Follow username="EHTSoftball" />
            </ToolbarItem>
	    <ToolbarItem variant="separator"></ToolbarItem>
            <ToolbarItem space="md">
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
      <Masthead id="ehtys" backgroundColor="light">
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
