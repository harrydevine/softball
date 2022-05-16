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
  const [playerData, setPlayerData] = React.useState(null);
  const [playerLoading, setPlayerLoading] = React.useState(true);
  const [playerError, setPlayerError] = React.useState(null);

  useEffect(() => {
  // Fetch data for Rec Teams
    fetch(`http://softball-pi4:8081/travelteams`)
      .then(async resp => {
        const jsonResponse = await resp.json()
        setTeamData(jsonResponse);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      })

    // Fetch data for Players
    fetch(`http ://softball-pi4:8081/players`)
    .then(async resp => {
      const jsonResponse = await resp.json()
      setPlayerData(jsonResponse);
      setPlayerLoading(false);
    })
    .catch(err => {
      setPlayerError(err);
      setPlayerLoading(false);
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
        {loading && (
          <Bullseye>
            <Spinner size="xl" />
          </Bullseye>
        )}
        {!loading && teamData?.data.length === 0 && (
          <Bullseye>
            <EmptyState variant={EmptyStateVariant.small}>
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
      <PageSection type="tabs" variant={PageSectionVariants.light} key="travelTeamContentTabs">
        <Tabs activeKey={activeTabKey} onSelect={handleTabClick} usePageInsets isBox id="tabTravelTeams" aria-label="tabTravelTeams">
        {!loading && teamData?.data.map((row, rowIndex) => (
          <Tab 
            key={`tab${rowIndex}`}
            eventKey={row.id} 
            title={<TabTitleText>{row.teamName}</TabTitleText>}
            tabContentId={`tabContent${row.id}`}
          />
        ))}
        </Tabs>
      </PageSection>
      {!loading && teamData?.data.map((row, rowIndex) => (
        <TabContent key={row.id} eventKey={row.id} id={`tabContent${row.id}`} activeKey={activeTabKey} hidden={row.id !== activeTabKey}>
          <React.Fragment key={`travelTeamContent${rowIndex}`}>
            <Card key={`team${rowIndex}`}>
              <CardHeader>
                <Label icon={<InfoCircleIcon />} color={row.teamColor} >{row.teamName}</Label>
              </CardHeader>
              <CardBody>
                <Title headingLevel="h2" size="lg">Coaching Staff</Title>
                <TableComposable variant={TableVariant.default} aria-label={`coachesr${row.teamName}table`}>
                  <Thead>
                    <Tr>
                      <Th width={50}>Coach</Th>
                      <Th width={25}>Phone Number</Th>
                      <Th width={25}>Email Address</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  <Tr key={"coach1"}>
                    <Td>{row.coach1}</Td>
                    <Td>{row.coach1_phone}</Td>
                      <Td>{row.coach1_email}</Td>
                    </Tr>
                    <Tr key={"coach2"}>
                      <Td>{row.coach2}</Td>
                      <Td>{row.coach2_phone}</Td>
                      <Td>{row.coach2_email}</Td>
                    </Tr>
                    <Tr key={"coach3"}>
                      <Td>{row.coach3}</Td>
                      <Td>{row.coach3_phone}</Td>
                      <Td>{row.coach3_email}</Td>
                    </Tr>
                  </Tbody>
                </TableComposable>
                <Title headingLevel="h2" size="lg">Roster</Title>
                <TableComposable variant={TableVariant.default} aria-label={`roster${row.teamName}table`}>
                  <Thead>
                    <Tr>
                      <Th width={50}>Name</Th>
                      <Th width={50}>Jersey Number</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {!playerLoading && playerData?.data
                    .filter(function (data) {
                      return data.teamId === row.id;
                    })
                    .map((player => (
                      <Tr key={"player"+player.id}>
                        <Td>{player.playerName}</Td>
                        <Td>{player.playerNumber}</Td>
                      </Tr>
                    )))}
                  </Tbody>
                </TableComposable>
              </CardBody>
            </Card>
          </React.Fragment>
        </TabContent>
        ))}
    </div>
  );
}

export default TravelTeams;

