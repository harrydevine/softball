import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Divider,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
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
  Text,
  TextContent,
  TextInput,
  Title
} from '@patternfly/react-core';
import AdminTeamModal from './AdminTeamModal';
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td} from '@patternfly/react-table';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';

class AdminTeams extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false,
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
  
    render() {
      const { isModalOpen, drawerPanelBodyContent, selectedListItemId, activeItem, isExpanded } = this.state;
  
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
          <SimpleList onSelect={this.onSelectListItem}>
            <SimpleListGroup title="6U Division" id="list-division-6u">
              <SimpleListItem key="team1-6u" id="team1-6u" isActive>
                6U Team 1
              </SimpleListItem>
              <SimpleListItem key="team2-6u" id="team2-6u">
                6U Team 2
              </SimpleListItem>
              <SimpleListItem key="team3-6u" id="team3-6u">
                6U Team 3
              </SimpleListItem>
              <SimpleListItem key="team4-6u" id="team4-6u">
                6U Team 4
              </SimpleListItem>
            </SimpleListGroup>
            <SimpleListGroup title="8U Division" id="list-division-8u">
              <SimpleListItem key="team1-8u" id="team1-8u">
                8U Team 1
              </SimpleListItem>
              <SimpleListItem key="team2-8u" id="team2-8u">
                8U Team 2
              </SimpleListItem>
              <SimpleListItem key="team3-8u" id="team3-8u">
                8U Team 3
              </SimpleListItem>
              <SimpleListItem key="team4-8u" id="team4-8u">
                8U Team 4
              </SimpleListItem>
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
