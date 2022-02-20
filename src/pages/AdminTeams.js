import React from 'react';
import {
  Button,
  Bullseye,
  Card,
  Divider,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
  Label,
  LabelGroup,
  PageSection,
  PageSectionVariants,
  Progress,
  SimpleList,
  SimpleListGroup,
  SimpleListItem,
  Spinner,
  Title
} from '@patternfly/react-core';
import AdminTeamModal from './AdminTeamModal';
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td} from '@patternfly/react-table';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';

class AdminTeams extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false,
        teamData: [],
        loading: true,
        drawerPanelBodyContent: "6U Team 1",
        activeItem: 0,
        isKebabDropdownOpen: false,
        isDropdownOpen: false,
        isExpanded: false
      };
  
      this.onSelectListItem = (listItem, listItemProps) => {
          console.log(listItemProps);
        this.setState({
          drawerPanelBodyContent: listItemProps.children,
          isExpanded: true
        });
      };
  
      this.onClose = () => {
        this.setState({
          isExpanded: false
        });
      };

      this.handleModalToggle = () => {
        console.log("Handled Add New Team button click")
        this.setState(({ isModalOpen}) => ({
          isModalOpen: !isModalOpen
        }));
      };

      this.handleAddNewPlayerButton = () => {
        console.log("Handled Add new player to this team button click")
      };

    }
  
    componentDidMount() {
      this.fetchTeams();
    }
  
    // Fetch Player data
    fetchTeams() {
      this.setState({ loading: true });
  
      fetch("http://192.168.1.21:8081/teams")
        .then(resp => resp.json())
        .then(resp => this.setState({teamData: resp, loading: false}))
        .catch(err => this.setState({err: err, loading: false}));
    }
  
    render() {
      const { teamData, loading, isModalOpen, drawerPanelBodyContent, selectedListItemId, activeItem, isExpanded } = this.state;
      const panelContent = (
        <DrawerPanelContent widths={'width_75'}>
          <DrawerHead>
            <Title headingLevel="h2" size="xl">
              {`${drawerPanelBodyContent} details`}
            </Title>
            <DrawerActions>
              <DrawerCloseButton onClick={this.onClose} />
            </DrawerActions>
          </DrawerHead>
          <DrawerPanelBody>
            <Flex spaceItems={{ default: 'spaceItemsLg' }} direction={{ default: 'column' }}>
              <FlexItem>
                Team Name:
                <LabelGroup>
                  <Label icon={<InfoCircleIcon />} color="green" >{`${drawerPanelBodyContent}`}</Label>
                </LabelGroup>
                <p>Team Coach: Coach Name Here</p>
                <p>Coach Phone: Coach Phone Here</p>
                <p>Coach Email: Coach Email Here</p>
              </FlexItem>
              <FlexItem>
                <TableComposable variant={TableVariant.default}  aria-label="Team Members table">
                  <Thead>
	                <Tr>
	                  <Th width={67}>Name</Th>
	                  <Th width={33}>Jersey</Th>
	                </Tr>
	              </Thead>
                  <Tbody>
                    <Tr key="player1">
                      <Td dataLabel="player1Name">Amanda D</Td>
                      <Td dataLabel="player1Jersey">2</Td>
                    </Tr>
                    <Tr key="player2">
                      <Td dataLabel="player1Name">Kasey C</Td>
                      <Td dataLabel="player1Jersey">9</Td>
                    </Tr>
                  </Tbody>
               </TableComposable>
              </FlexItem>
              <FlexItem>
                <Button variant="primary" onClick={this.handleAddNewPlayerButton}>Add Player to this team</Button>{'  '}
              </FlexItem>
            </Flex>
          </DrawerPanelBody>
        </DrawerPanelContent>
      );
  
      const drawerContent = (
        <React.Fragment>
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
          <SimpleList key="6u" className="teams-list" onSelect={this.onSelectListItem}>
            <SimpleListGroup title="6U" id="division6U">
          {!loading && teamData?.data
            .filter(function (data) {
              return data.division === "6U";
            })
            .map((row => (
                <SimpleListItem key={row.teamName} id={row.id}>
                  {row.teamName}
                </SimpleListItem>
          )))}
            </SimpleListGroup>
          </SimpleList>
          <SimpleList key="8u" className="teams-list"  onSelect={this.onSelectListItem}>
            <SimpleListGroup title="8U" id="division8U">
          {!loading && teamData?.data
            .filter(function (data) {
              return data.division === "8U";
            })
            .map((row => (
                <SimpleListItem key={row.teamName} id={row.id}>
                  {row.teamName}
                </SimpleListItem>
          )))}
            </SimpleListGroup>
          </SimpleList>
          <SimpleList key="10u" className="teams-list"  onSelect={this.onSelectListItem}>
            <SimpleListGroup title="10U" id="division10U">
          {!loading && teamData?.data
            .filter(function (data) {
              return data.division === "10U";
            })
            .map((row => (
                <SimpleListItem key={row.teamName} id={row.id}>
                  {row.teamName}
                </SimpleListItem>
          )))}
            </SimpleListGroup>
          </SimpleList>
          <SimpleList key="12u" className="teams-list"  onSelect={this.onSelectListItem}>
            <SimpleListGroup title="12U" id="division12U">
          {!loading && teamData?.data
            .filter(function (data) {
              return data.division === "12U";
            })
            .map((row => (
                <SimpleListItem key={row.teamName} id={row.id}>
                  {row.teamName}
                </SimpleListItem>
          )))}
            </SimpleListGroup>
          </SimpleList>
          <SimpleList key="14u" className="teams-list"  onSelect={this.onSelectListItem}>
            <SimpleListGroup title="14U" id="division14U">
          {!loading && teamData?.data
            .filter(function (data) {
              return data.division === "14U";
            })
            .map((row => (
                <SimpleListItem key={row.teamName} id={row.id}>
                  {row.teamName}
                </SimpleListItem>
          )))}
            </SimpleListGroup>
          </SimpleList>
          <SimpleList key="16u" onSelect={this.onSelectListItem}>
            <SimpleListGroup title="16U" id="division16U" className="teams-list">
          {!loading && teamData?.data
            .filter(function (data) {
              return data.division === "16U";
            })
            .map((row => (
                <SimpleListItem key={row.teamName} id={row.id}>
                  {row.teamName}
                </SimpleListItem>
          )))}
            </SimpleListGroup>
          </SimpleList>
        </React.Fragment>
      );
  
      return (
        <><PageSection variant={PageSectionVariants.light}>
            <AdminTeamModal />
          </PageSection>
          <Divider component="div" />
          <PageSection>
            <Card>
              <Drawer isStatic isExpanded={isExpanded}>
                <DrawerContent panelContent={panelContent}>
                  <DrawerContentBody>{drawerContent}</DrawerContentBody>
                </DrawerContent>
              </Drawer>
            </Card>
          </PageSection></>
      );
    }
  }

  export default AdminTeams;
