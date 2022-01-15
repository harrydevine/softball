import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  PageSection,
  PageSectionVariants,
  SimpleList,
  SimpleListItem,
  Tabs,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Text,
  TextContent,
  Title
} from '@patternfly/react-core';

const RecTeams = ({ children }) => {
//class RecTeams extends React.Component {

  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const [activeTabKeySecondary, setActiveTabKeySecondary] = React.useState(10);

  const handleTabClick = (event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  const handleTabClickSecondary = (event, tabIndex) => {
    setActiveTabKeySecondary(tabIndex);
  };

//  render() {
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
	        EHT Recreation Teams
	      </Title>
	    </FlexItem>
          </Flex>
	</PageSection>
	<PageSection type="tabs" variant={PageSectionVariants.light} isWidthLimited>
	    <Tabs activeKey={activeTabKey} onSelect={handleTabClick} usePageInsets id="tabRecTeams">
              <Tab 
	        eventKey={0} 
	        title={<TabTitleText>6U</TabTitleText>} 
	        tabContentId={`tabContent${0}`} 
	      />
              <Tab 
	        eventKey={1} 
	        title={<TabTitleText>8U</TabTitleText>} 
	        tabContentId={`tabContent${1}`} 
	      />
              <Tab 
	        eventKey={2} 
	        title={<TabTitleText>10U</TabTitleText>} 
	        tabContentId={`tabContent${2}`} 
	      />
              <Tab 
	        eventKey={3} 
	        title={<TabTitleText>12U</TabTitleText>} 
	        tabContentId={`tabContent${3}`} 
	      />
              <Tab 
	        eventKey={4} 
	        title={<TabTitleText>14U</TabTitleText>} 
	        tabContentId={`tabContent${4}`} 
	      />
              <Tab 
	        eventKey={5} 
	        title={<TabTitleText>16U</TabTitleText>} 
	        tabContentId={`tabContent${5}`} 
	      />
	    </Tabs>
	</PageSection>
	<PageSection variant={PageSectionVariants.light} isWidthLimited>
	    <Flex direction={{ default: 'column' }}>
	      <FlexItem>
	        <TabContent key={0} eventKey={0} id={`tabContent${0}`} activeKey={activeTabKey} hidden={0 !== activeTabKey}>
                  <TabContentBody>6U Teams</TabContentBody>
	        </TabContent>
	      </FlexItem>
              <FlexItem>
                <TabContent key={1} eventKey={1} id={`tabContent${1}`} activeKey={activeTabKey} hidden={1 !== activeTabKey}>
                    <Tabs
                       isSecondary
                       activeKey={activeTabKeySecondary}
                       onSelect={handleTabClickSecondary}
                       inset={{ default: 'insetNone' }}
                       id="tabRecTeamsSecondary"
                     >
  	               <Tab
                          eventKey={11}
                          title={<TabTitleText>Naughton 8U</TabTitleText>}
                          tabContentId={`tabContent${11}`}
                        />
                        <Tab
                          eventKey={12}
                          title={<TabTitleText>Rago 8U</TabTitleText>}
                          tabContentId={`tabContent${12}`}
                        />
                     </Tabs>
                     <TabContent
                       key={11}
                       eventKey={11}
                       id={`tabContent${11}`}
                       activeKey={activeTabKeySecondary}
                       hidden={11 !== activeTabKeySecondary}
                      >
                        <TabContentBody>
                          <Card>
                            <CardTitle>Coach: Christina Naughton</CardTitle>
                            <CardBody>
                              <SimpleList aria-label="listNaughton8u">
                                <SimpleListItem>Phone Number: (609) xxx-yyyy</SimpleListItem>
                                <SimpleListItem>Email: team1@example.com</SimpleListItem>
                              </SimpleList>
                            </CardBody>
                          </Card>
                          <Card>
                            <CardTitle>Roster</CardTitle>
                            <CardBody>
                              <SimpleList aria-label="listNaughton8uRoster">
                                <SimpleListItem>1 - Player 1</SimpleListItem>
                                <SimpleListItem>2 - Player 2</SimpleListItem>
                                <SimpleListItem>10 - Player 3</SimpleListItem>
                                <SimpleListItem>12 - Player 4</SimpleListItem>
                                <SimpleListItem>25 - Player 5</SimpleListItem>
                              </SimpleList>
                            </CardBody>
                          </Card>
                    </TabContentBody>
                  </TabContent>
                  <TabContent
                     key={12}
                     eventKey={12}
                     id={`tabContent${12}`}
                     activeKey={activeTabKeySecondary}
                     hidden={12 !== activeTabKeySecondary}
                   >
                     <TabContentBody>
                       <Card>
                         <CardTitle>Coach: Kristi Rago</CardTitle>
                         <CardBody>
                           <SimpleList aria-label="listRago8u">
                             <SimpleListItem>Phone Number: (609) xxx-yyyy</SimpleListItem>
                             <SimpleListItem>Email: team2@example.com</SimpleListItem>
                           </SimpleList>
                         </CardBody>
                       </Card>
                       <Card>
                         <CardTitle>Roster</CardTitle>
                         <CardBody>
                           <SimpleList aria-label="listRag8uRoster">
                             <SimpleListItem>3 - Player 1</SimpleListItem>
                             <SimpleListItem>5 - Player 2</SimpleListItem>
                             <SimpleListItem>15 - Player 3</SimpleListItem>
                             <SimpleListItem>22 - Player 4</SimpleListItem>
                             <SimpleListItem>99 - Player 5</SimpleListItem>
                            </SimpleList>
                          </CardBody>
                         </Card>
                        </TabContentBody>
                      </TabContent>
                  </TabContent>
                <TabContent key={2} eventKey={2} id={`tabContent${2}`} activeKey={activeTabKey} hidden={2 !== activeTabKey}>
                  <TabContentBody>10U Teams</TabContentBody>
                </TabContent>
                <TabContent key={3} eventKey={3} id={`tabContent${3}`} activeKey={activeTabKey} hidden={3 !== activeTabKey}>
                  <TabContentBody>12U Teams</TabContentBody>
                </TabContent>
                <TabContent key={4} eventKey={4} id={`tabContent${4}`} activeKey={activeTabKey} hidden={4 !== activeTabKey}>
                  <TabContentBody>14U Teams</TabContentBody>
                </TabContent>
                <TabContent key={5} eventKey={4} id={`tabContent${5}`} activeKey={activeTabKey} hidden={5 !== activeTabKey}>
                  <TabContentBody>16U Teams</TabContentBody>
                </TabContent>
	      </FlexItem>
	    </Flex>
	</PageSection>
      </div>
    );
//  }
}

export default RecTeams;

