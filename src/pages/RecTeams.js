import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
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

const RecTeams = ({ children }) => {
//class RecTeams extends React.Component {

  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const [activeTabKeySecondary, setActiveTabKeySecondary] = React.useState(10);

  const handleTabClick = (event, tabIndex) => {
	  console.log(tabIndex);
    setActiveTabKey(tabIndex);
  };

  const handleTabClickSecondary = (event, tabIndex) => {
	  console.log(tabIndex);
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
	        title={<TabTitleText>8U</TabTitleText>} 
	        tabContentId={`tabContent${0}`} 
	      />
              <Tab 
	        eventKey={1} 
	        title={<TabTitleText>10U</TabTitleText>} 
	        tabContentId={`tabContent${1}`} 
	      />
              <Tab 
	        eventKey={2} 
	        title={<TabTitleText>12U</TabTitleText>} 
	        tabContentId={`tabContent${2}`} 
	      />
              <Tab 
	        eventKey={3} 
	        title={<TabTitleText>14U</TabTitleText>} 
	        tabContentId={`tabContent${3}`} 
	      />
              <Tab 
	        eventKey={4} 
	        title={<TabTitleText>16U</TabTitleText>} 
	        tabContentId={`tabContent${4}`} 
	      />
              <Tab 
	        eventKey={5} 
	        title={<TabTitleText>18U</TabTitleText>} 
	        tabContentId={`tabContent${5}`} 
	      />
	    </Tabs>
	</PageSection>
	<PageSection variant={PageSectionVariants.light} isWidthLimited>
	    <Flex direction={{ default: 'column' }}>
	      <FlexItem>
	        <TabContent key={0} eventKey={0} id={`tabContent${0}`} activeKey={activeTabKey} hidden={0 !== activeTabKey}>
	          <TabContentBody>
	            <Tabs 
	               isSecondary 
	               activeKey={activeTabKeySecondary}
	               onSelect={handleTabClickSecondary}
	               inset={{ default: 'insetNone' }} 
	               id="tabRecTeamsSecondary"
	             >
	              <Tab 
	                eventKey={10}
	                title={<TabTitleText>Naughton 8U</TabTitleText>} 
	                tabContentId={`tabContent${10}`}
	              />
                      <Tab
                        eventKey={11}
                        title={<TabTitleText>Kellet 8U</TabTitleText>}
                        tabContentId={`tabContent${11}`}
                      />	    
	            </Tabs>
                    <TabContent
                      key={10}
                      eventKey={10}
                      id={`tabContent${10}`}
                      activeKey={activeTabKeySecondary}
                      hidden={10 !== activeTabKeySecondary}
                     >
                         <TabContentBody>
	                   <Card>
	                     <CardTitle>Naughton 8U Roster</CardTitle>
	                     <CardBody>Team Roster should go here</CardBody>
	                   </Card>
	                 </TabContentBody>
                       </TabContent>
                     <TabContent
                        key={11}
                        eventKey={11}
                        id={`tabContent${11}`}
                        activeKey={activeTabKeySecondary}
                        hidden={11 !== activeTabKeySecondary}
                      >
                        <TabContentBody>
                          <Card>
                             <CardTitle>Kellet 8U Roster</CardTitle>
                             <CardBody>Team Roster should go here</CardBody>
                           </Card>
	                </TabContentBody>
                    </TabContent>
	          </TabContentBody>
	        </TabContent>
	      </FlexItem>
              <FlexItem>
                <TabContent key={1} eventKey={1} id={`tabContent${1}`} activeKey={activeTabKey} hidden={1 !== activeTabKey}>
                  <TabContentBody>10U Teams</TabContentBody>
                </TabContent>
                <TabContent key={2} eventKey={2} id={`tabContent${2}`} activeKey={activeTabKey} hidden={2 !== activeTabKey}>
                  <TabContentBody>12U Teams</TabContentBody>
                </TabContent>
                <TabContent key={3} eventKey={3} id={`tabContent${3}`} activeKey={activeTabKey} hidden={3 !== activeTabKey}>
                  <TabContentBody>14U Teams</TabContentBody>
                </TabContent>
                <TabContent key={4} eventKey={4} id={`tabContent${4}`} activeKey={activeTabKey} hidden={4 !== activeTabKey}>
                  <TabContentBody>16U Teams</TabContentBody>
                </TabContent>
                <TabContent key={5} eventKey={4} id={`tabContent${5}`} activeKey={activeTabKey} hidden={5 !== activeTabKey}>
                  <TabContentBody>18U Teams</TabContentBody>
                </TabContent>
	      </FlexItem>
	    </Flex>
	</PageSection>
      </div>
    );
//  }
}

export default RecTeams;

