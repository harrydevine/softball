import React, { useEffect } from 'react';
import {
  Bullseye,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  EmptyState,
  EmptyStateIcon,
  EmptyStateVariant,
  EmptyStateBody,
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
  TabTitleText,
  Title,
} from '@patternfly/react-core';
import AdminTeamModal from './AdminTeamModal';
import AdminAddPlayerToTeamModal from './AdminAddPlayerToTeamModal';
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';

//class AdminTeams extends React.Component {
const AdminTeams = () => {
  const [teamData, setTeamData] = React.useState(null);
  const [teamLoading, setTeamLoading] = React.useState(true);
  const [teamErr, setTeamErr] = React.useState(false);
  const [playerData, setPlayerData] = React.useState(null);
  const [playerLoading, setPlayerLoading] = React.useState(true);
  const [playerErr, setPlayerErr] = React.useState(false);
  const [activeTabKey, setActiveTabKey] = React.useState(0);

  const handleAddNewPlayerButton = () => {
    console.log("Handled Add new player to this team button click")
  };

  const handleTabClick = (_, tabIndex) => setActiveTabKey(tabIndex);
    
  useEffect(() => {
    // Fetch data for Rec Teams
    fetch(`http://192.168.1.21:8081/teams`)
    .then(async resp => {
      const jsonResponse = await resp.json()
      setTeamData(jsonResponse);
      setTeamLoading(false);
    })
    .catch(err => {
      setTeamErr(err);
      setTeamLoading(false);
    })
  }, []);

  useEffect(() => {
    // Fetch data for Players
    fetch(`http://192.168.1.21:8081/players`)
    .then(async resp => {
      const jsonResponse = await resp.json()
      setPlayerData(jsonResponse);
      console.log(jsonResponse?.data.filter(function (data) {
        return data.playerName;
        }));
      setPlayerLoading(false);
    })
    .catch(err => {
      setPlayerErr(err);
      setPlayerLoading(false);
    })
  }, []);

  return (
      <React.Fragment>
        <PageSection variant={PageSectionVariants.light} key="adminTeamsSection1">
        <AdminTeamModal />
        <AdminAddPlayerToTeamModal players={playerData} teams={teamData} />
        </PageSection>
        <PageSection type="adminTeamTabs" isWidthLimited key="adminTeamsSection2">
          <Tabs activeKey={activeTabKey} onSelect={handleTabClick} usePageInsets id="adminTeamDivisionsTab">
            <Tab eventKey={0} title={<TabTitleText>6U</TabTitleText>} tabContentId={`tabContent${0}`} />
            <Tab eventKey={1} title={<TabTitleText>8U</TabTitleText>} tabContentId={`tabContent${1}`} />
            <Tab eventKey={2} title={<TabTitleText>10U</TabTitleText>} tabContentId={`tabContent${2}`} />
            <Tab eventKey={3} title={<TabTitleText>12U</TabTitleText>} tabContentId={`tabContent${3}`} />
            <Tab eventKey={4} title={<TabTitleText>14U</TabTitleText>} tabContentId={`tabContent${4}`} />
            <Tab eventKey={5} title={<TabTitleText>16U</TabTitleText>} tabContentId={`tabContent${5}`} />
          </Tabs>
        </PageSection>
        <PageSection isWidthLimited key="adminTeamsSection3">
	      <TabContent key={0} eventKey={0} id={`tabContent${0}`} activeKey={activeTabKey} hidden={0 !== activeTabKey}>
          {teamLoading && (
            <Bullseye>
              <Spinner size="xl" />
            </Bullseye>
          )}
          {!teamLoading && teamData?.data.length === 0 && (
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
            <React.Fragment key="6u_teams">
            <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': '260px' }}>
            {!teamLoading && teamData?.data
              .filter(function (data) {
                return data.division === "6U";
              })
              .map((row => (
                <Card key={row.id}>
                  <CardHeader>
                  <Label icon={<InfoCircleIcon />} color="{row.teamColor}" >{row.teamName}</Label>{'  '}
                  </CardHeader>
                  <CardTitle>Coach: {row.coach}</CardTitle>
                    <CardBody>
                      <SimpleList aria-label={row.teamName}>
                        <SimpleListItem>Phone Number: {row.coach_phone}</SimpleListItem>
                        <SimpleListItem>Email: {row.coach_email}</SimpleListItem>
                      </SimpleList>
                      <Title headingLevel="h2" size="lg">Roster</Title>
                        <TableComposable variant={TableVariant.default} aria-label="roster+{row.teamName}+table">
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
                )))}
              </Gallery>
              </React.Fragment>
            </TabContent>
          <TabContent key={1} eventKey={1} id={`tabContent${1}`} activeKey={activeTabKey} hidden={1 !== activeTabKey}>
            {teamLoading && (
              <Bullseye>
                <Spinner size="xl" />
              </Bullseye>
            )}
            {!teamLoading && teamData?.data.length === 0 && (
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
                    <React.Fragment key="8u_teams">
                    <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': '260px' }}>
                    {!teamLoading && teamData?.data
                    .filter(function (data) {
                      return data.division === "8U";
                    })
                    .map((row => (
                        <Card key={row.id}>
                        <CardHeader>
                        <Label icon={<InfoCircleIcon />} color="{row.teamColor}" >{row.teamName}</Label>{'  '}
                        </CardHeader>
                        <CardTitle>Coach: {row.coach}</CardTitle>
                        <CardBody>
                          <SimpleList aria-label={row.teamName}>
                            <SimpleListItem>Phone Number: {row.coach_phone}</SimpleListItem>
                            <SimpleListItem>Email: {row.coach_email}</SimpleListItem>
                          </SimpleList>
                          <Title headingLevel="h2" size="lg">Roster</Title>
                            <TableComposable variant={TableVariant.default} aria-label="roster+{row.teamName}+table">
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
                    )))}
                    </Gallery>
                    </React.Fragment>
                </TabContent>
                <TabContent key={2} eventKey={2} id={`tabContent${2}`} activeKey={activeTabKey} hidden={2 !== activeTabKey}>
                  {teamLoading && (
                      <Bullseye>
                        <Spinner size="xl" />
                      </Bullseye>
                    )}
                    {!teamLoading && teamData?.data.length === 0 && (
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
                    <React.Fragment key="10u_teams">
                    <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': '260px' }}>
                    {!teamLoading && teamData?.data
                    .filter(function (data) {
                      return data.division === "10U";
                    })
                    .map((row => (
                      <Card key={row.id}>
                        <CardHeader>
                          <Label icon={<InfoCircleIcon />} color="{row.teamColor}" >{row.teamName}</Label>{'  '}
                        </CardHeader>
                        <CardTitle>Coach: {row.coach}</CardTitle>
                        <CardBody>
                          <SimpleList aria-label={row.teamName}>
                            <SimpleListItem>Phone Number: {row.coach_phone}</SimpleListItem>
                            <SimpleListItem>Email: {row.coach_email}</SimpleListItem>
                          </SimpleList>
                          <Title headingLevel="h2" size="lg">Roster</Title>
                            <TableComposable variant={TableVariant.default} aria-label="roster+{row.teamName}+table">
                              <Thead>
                                <Tr>
                                  <Th width={50}>Name</Th>
                                  <Th width={50}>Jersey Number</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <Tr>
                                  <Td dataLabel="player1Name">Amanda D</Td>
                                  <Td dataLabel="player1Jersey">2</Td>
                                </Tr>
                                <Tr>
                                  <Td dataLabel="player1Name">Kasey C</Td>
                                  <Td dataLabel="player1Jersey">9</Td>
                                </Tr>
                              </Tbody>
                            </TableComposable>
                        </CardBody>
                      </Card>
                    )))}
                  </Gallery>
                  </React.Fragment>
                </TabContent>
                <TabContent key={3} eventKey={3} id={`tabContent${3}`} activeKey={activeTabKey} hidden={3 !== activeTabKey}>
                {teamLoading && (
                      <Bullseye>
                        <Spinner size="xl" />
                      </Bullseye>
                    )}
                    {!teamLoading && teamData?.data.length === 0 && (
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
                    <React.Fragment key="12u_teams">
                    <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': '260px' }}>
                    {!teamLoading && teamData?.data
                    .filter(function (data) {
                      return data.division === "12U";
                    })
                    .map((row => (
                      <Card key={row.id}>
                        <CardHeader>
                        <Label icon={<InfoCircleIcon />} color="{row.teamColor}" >{row.teamName}</Label>{'  '}
                        </CardHeader>
                        <CardTitle>Coach: {row.coach}</CardTitle>
                        <CardBody>
                          <SimpleList aria-label={row.teamName}>
                            <SimpleListItem>Phone Number: {row.coach_phone}</SimpleListItem>
                            <SimpleListItem>Email: {row.coach_email}</SimpleListItem>
                          </SimpleList>
                          <Title headingLevel="h2" size="lg">Roster</Title>
                            <TableComposable variant={TableVariant.default} aria-label="roster+{row.teamName}+table">
                              <Thead>
                                <Tr>
                                  <Th width={50}>Name</Th>
                                  <Th width={50}>Jersey Number</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <Tr>
                                  <Td dataLabel="player1Name">Amanda D</Td>
                                  <Td dataLabel="player1Jersey">2</Td>
                                </Tr>
                                <Tr>
                                  <Td dataLabel="player1Name">Kasey C</Td>
                                  <Td dataLabel="player1Jersey">9</Td>
                                </Tr>
                              </Tbody>
                            </TableComposable>
                        </CardBody>
                      </Card>
                    )))}
                    </Gallery>
                    </React.Fragment>
                </TabContent>
                <TabContent key={4} eventKey={4} id={`tabContent${4}`} activeKey={activeTabKey} hidden={4 !== activeTabKey}>
                {teamLoading && (
                      <Bullseye>
                        <Spinner size="xl" />
                      </Bullseye>
                    )}
                    {!teamLoading && teamData?.data.length === 0 && (
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
                    <React.Fragment key="14u_teams">
                    <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': '260px' }}>
                    {!teamLoading && teamData?.data
                    .filter(function (data) {
                      return data.division === "14U";
                    })
                    .map((row => (
                      <Card key={row.id}>
                        <CardHeader>
                        <Label icon={<InfoCircleIcon />} color="{row.teamColor}" >{row.teamName}</Label>{'  '}
                        </CardHeader>
                        <CardTitle>Coach: {row.coach}</CardTitle>
                        <CardBody>
                          <SimpleList aria-label={row.teamName}>
                            <SimpleListItem>Phone Number: {row.coach_phone}</SimpleListItem>
                            <SimpleListItem>Email: {row.coach_email}</SimpleListItem>
                          </SimpleList>
                          <Title headingLevel="h2" size="lg">Roster</Title>
                            <TableComposable variant={TableVariant.default} aria-label="roster+{row.teamName}+table">
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
                    )))}
                  </Gallery>
                  </React.Fragment>
                </TabContent>
                <TabContent key={5} eventKey={5} id={`tabContent${5}`} activeKey={activeTabKey} hidden={5 !== activeTabKey}>
                {teamLoading && (
                      <Bullseye>
                        <Spinner size="xl" />
                      </Bullseye>
                    )}
                    {!teamLoading && teamData?.data.length === 0 && (
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
                    <React.Fragment key="16u_teams">
                    <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': '260px' }}>
                    {!teamLoading && teamData?.data
                    .filter(function (data) {
                      return data.division === "16U";
                    })
                    .map((row => (
                      <Card key={row.id}>
                        <CardHeader>
                          <Label icon={<InfoCircleIcon />} color="{row.teamColor}" >{row.teamName}</Label>{'  '}
                        </CardHeader>
                        <CardTitle>Coach: {row.coach}</CardTitle>
                        <CardBody>
                          <SimpleList aria-label={row.teamName}>
                            <SimpleListItem>Phone Number: {row.coach_phone}</SimpleListItem>
                            <SimpleListItem>Email: {row.coach_email}</SimpleListItem>
                          </SimpleList>
                          <Title headingLevel="h2" size="lg">Roster</Title>
                            <TableComposable variant={TableVariant.default} aria-label="roster+{row.teamName}+table">
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
                    )))}
                  </Gallery>
                  </React.Fragment>
                </TabContent>
        </PageSection>
      </React.Fragment>
    );
  }

  export default AdminTeams;
