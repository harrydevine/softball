import React from "react";
import {
    Toolbar,
    ToolbarContent,
    ToolbarGroup,
    ToolbarItem
} from '@patternfly/react-core';
import { Follow } from 'react-twitter-widgets';
import YouTubeSubscribe from './YouTubeSubscribe';
import { FacebookSquareIcon } from '@patternfly/react-icons';

const Footer = () => {

  const footerToolbar = (
    <Toolbar id="toolbar" isFullHeight isStatic>
      <ToolbarContent>
        <ToolbarGroup
          variant="icon-button-group"
          alignment={{ default: 'alignLeft' }}>
          <ToolbarItem spacer={{ default: "spacerMd" }}>
            <a href="https://www.facebook.com/groups/1687563661460656" target="_blank"><FacebookSquareIcon />EHT Softball Facebook Page</a>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup
          variant="icon-button-group"
          alignment={{ default: 'alignRight' }}>
          <ToolbarItem spacer={{ default: "spacerMd" }}>
            <Follow username="EHTSoftball" />
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup
          variant="icon-button-group"
          alignment={{ default: 'alignRight' }}>
          <ToolbarItem spacer={{ default: "spacerMd" }}>
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
     <footer className="bg-light p-3 text-center">
      <div className="logo" />
        {footerToolbar}
    </footer>
   );
}

export default Footer;
