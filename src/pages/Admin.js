import React from 'react';
import {
  Flex,
  FlexItem,
  PageSection,
  PageSectionVariants,
  Tabs,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Title
} from '@patternfly/react-core';

const Admin = ({ children }) => {

  const [activeTabKey, setActiveTabKey] = React.useState(0);

  const handleTabClick = (event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <div>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <Flex
          spaceItems={{ default: 'spaceItemsMd' }}
          alignItems={{ default: 'alignItemsFlexStart' }}
          flexWrap={{ default: 'noWrap' }}
        >
          <FlexItem>
            <Title headingLevel="h1" size="2x1">
              EHT Softball - Admin Functions
            </Title>
          </FlexItem>
        </Flex>
      </PageSection>
      <PageSection type="tabs" variant={PageSectionVariants.light} isWidthLimited>
          <Tabs activeKey={activeTabKey} onSelect={handleTabClick} usePageInsets id="tabAdminFunctions">
            <Tab
              eventKey={0}
              title={<TabTitleText>Players</TabTitleText>}
              tabContentId={`tabContent${0}`}
            />
            <Tab
              eventKey={1}
              title={<TabTitleText>Teams</TabTitleText>}
              tabContentId={`tabContent${1}`}
            />
            <Tab
              eventKey={2}
              title={<TabTitleText>Fields</TabTitleText>}
              tabContentId={`tabContent${2}`}
            />
            <Tab
              eventKey={3}
              title={<TabTitleText>Tournaments</TabTitleText>}
              tabContentId={`tabContent${3}`}
            />
            <Tab
              eventKey={4}
              title={<TabTitleText>Localities</TabTitleText>}
              tabContentId={`tabContent${4}`}
            />
            <Tab
              eventKey={5}
              title={<TabTitleText>Board Members</TabTitleText>}
              tabContentId={`tabContent${5}`}
            />
            <Tab
              eventKey={6}
              title={<TabTitleText>Board Meetings/Minutes</TabTitleText>}
              tabContentId={`tabContent${6}`}
            />
          </Tabs>
      </PageSection>
    </div>
  );
}

export default Admin;

