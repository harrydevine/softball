import React, { useEffect } from 'react';
import {
  Bullseye,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
  Gallery,
  Label,
  PageSection,
  PageSectionVariants,
  SimpleList,
  SimpleListItem,
  Spinner,
  Tabs,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Title
} from '@patternfly/react-core';
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';

const TravelTeams = ({ children }) => {
  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const [teamData, setTeamData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
  // Fetch data for Rec Teams
    fetch(`http://192.168.1.21:8081/travelteams`)
      .then(async resp => {
        const jsonResponse = await resp.json()
        setTeamData(jsonResponse);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      })
    }, []);

  const handleTabClick = (event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <div>
      <PageSection variant={PageSectionVariants.light} key="travelTeamsHeadingSection">
  	  <Flex
        spaceItems={{ default: 'spaceItemsMd' }}
	      alignItems={{ default: 'alignItemsFlexStart' }}
	      flexWrap={{ default: 'noWrap' }}
	    >
	      <FlexItem>
	        <Title headingLevel="h1" size="2xl">
	          EHT Travel Teams
	        </Title>
	      </FlexItem>
      </Flex>
	    </PageSection>
        <>
        {loading && (
          <Bullseye>
            <Spinner size="xl" />
          </Bullseye>
        )}
        {!loading && teamData?.data.length === 0 && (
          <Bullseye key="travelTeamsBullseye">
            <EmptyState variant={EmptyStateVariant.small} key="travelteamsNoDataFound">
              <EmptyStateIcon icon={SearchIcon} />
                <Title headingLevel="h2" size="lg">
                  No Team information retrieved!
                </Title>
              <EmptyStateBody>
                Check your network connection or contact the system administrator.
              </EmptyStateBody>
            </EmptyState>
          </Bullseye>
        )}
        <Tabs activeKey={activeTabKey} onSelect={handleTabClick} usePageInsets isBox id="tabTravelTeams">
        {!loading && teamData?.data.map((row, rowIndex) => (
          <Tab 
            key={`tab${rowIndex}`}
            eventKey={row.id} 
            title={<TabTitleText>{row.teamName}</TabTitleText>}
            tabContentId={`tabContent${row.id}`}
          />
        ))}
        </Tabs>
        </>
  	    <PageSection type="tabs" variant={PageSectionVariants.light} key="travelTeamContentTabs">
        {!loading && teamData?.data.map((row, rowIndex) => (
        <TabContent key={row.id} eventKey={row.id} id={`tabContent${row.id}`} activeKey={activeTabKey} hidden={row.id !== activeTabKey}>
            <React.Fragment key={`travelTeamContent${rowIndex}`}>
            <Card key={`team${rowIndex}`}>
              <CardHeader>
                <Label icon={<InfoCircleIcon />} color={row.teamColor} >{row.teamName}</Label>
              </CardHeader>
              <CardTitle>Coach: {row.coach}</CardTitle>
              <CardBody>
                <SimpleList aria-label="{row.teamName}">
                  <SimpleListItem>Phone Number: {row.coach_phone}</SimpleListItem>
                  <SimpleListItem>Email: {row.coach_email}</SimpleListItem>
                </SimpleList>
                <Title headingLevel="h2" size="lg">Roster</Title>
                <TableComposable variant={TableVariant.default} aria-label={`roster${row.teamName}table`}>
                  <Thead>
                    <Tr>
                      <Th width={50}>Name</Th>
                      <Th width={50}>Jersey Number</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  </Tbody>
                </TableComposable>
              </CardBody>
            </Card>
            </React.Fragment>
          </TabContent>
        ))}
        </PageSection>
    </div>
  );
}

export default TravelTeams;

