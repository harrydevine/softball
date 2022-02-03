import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  Gallery,
  GalleryItem,
  Modal,
  ModalVariant,
  PageSection,
  PageSectionVariants,
  Popover,
  Select,
  SelectOption,
  SelectVariant,
  SelectDirection,
  Switch,
  Tabs,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Text,
  TextInput,
  Title
} from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import CaretDownIcon from '@patternfly/react-icons/dist/esm/icons/caret-down-icon';
import CubeIcon from '@patternfly/react-icons/dist/esm/icons/cube-icon';
import AdminPlayersTable from './AdminPlayersTable';

const Admin = ({ children }) => {

  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const [isAddPlayerModalOpen, setAddPlayerModalOpen] = React.useState(false);
  const [nameValue, setNameValue] = React.useState("");
  const [jerseyNumberValue, setJerseyNumberValue] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [isAddPlayerDivisionDropdownOpen, setAddPlayerDivisionDropdownOpen] = React.useState(false);
  const [division, setDivision] = React.useState("");
  const [isToggleIcon, setToggleIcon] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [isField1Checked, setField1Checked] = React.useState(false);
  const [isField2Checked, setField2Checked] = React.useState(false);
  const [isField3Checked, setField3Checked] = React.useState(false);
  const [isField4Checked, setField4Checked] = React.useState(false);
  const [isField5Checked, setField5Checked] = React.useState(false);
  const [isField6Checked, setField6Checked] = React.useState(false);
  const [isField7Checked, setField7Checked] = React.useState(false);
  const [isField1Disabled, setField1Disabled] = React.useState(false);
  const [isField2Disabled, setField2Disabled] = React.useState(false);
  const [isField3Disabled, setField3Disabled] = React.useState(false);
  const [isField4Disabled, setField4Disabled] = React.useState(false);
  const [isField5Disabled, setField5Disabled] = React.useState(false);
  const [isField6Disabled, setField6Disabled] = React.useState(false);
  const [isField7Disabled, setField7Disabled] = React.useState(false);
  const [field1ReasonValue, setField1ReasonValue] = React.useState("");
  const [field2ReasonValue, setField2ReasonValue] = React.useState("");
  const [field3ReasonValue, setField3ReasonValue] = React.useState("");
  const [field4ReasonValue, setField4ReasonValue] = React.useState("");
  const [field5ReasonValue, setField5ReasonValue] = React.useState("");
  const [field6ReasonValue, setField6ReasonValue] = React.useState("");
  const [field7ReasonValue, setField7ReasonValue] = React.useState("");

  const addPlayerDivisionDropdownItems = [
    <SelectOption key={0} value="Select a Division" isPlaceholder />,
    <SelectOption key={1} value="6U" />,
    <SelectOption key={2} value="8U" />,
    <SelectOption key={3} value="10U" />,
    <SelectOption key={4} value="12U" />,
    <SelectOption key={5} value="14U" />,
    <SelectOption key={6} value="16U" />
  ];

  const handleTabClick = (event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  const handleAddPlayerClick = () => {
    console.log("Add Player button clicked");
  };

  const handleAddPlayerFileClick = () => {
    console.log("Add Player from File button clicked");
  };

  const handleAddPlayerModalToggle = () => {
    setAddPlayerModalOpen(!isAddPlayerModalOpen);
  };

  const handleNameInputChange = value => {
    setNameValue(value);
  };

  const handleJerseyNumberInputChange = value => {
    setJerseyNumberValue(value);
  };

  const  handleAddressInputChange = value => {
    setAddressValue(value);
  };

  const handleAddPlayerDivisionChange = event => {
    console.log(event);
  };

  const handleAddPlayerDivisionDropdownToggle = isAddPlayerDivisionDropdownOpen => {
    setAddPlayerDivisionDropdownOpen(isAddPlayerDivisionDropdownOpen);
  };
	
  const addPlayerDivisionDropdownSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder) {
      setSelected(null);
      setAddPlayerDivisionDropdownOpen(false);
    }
    else {
      setSelected(selection);
      setAddPlayerDivisionDropdownOpen(false);
      console.log('selected:', selection);
    }
  };

  const onEscapePress = () => {
    const { isAddPlayerDivisionDropdownOpen } = this.state;
    if (isAddPlayerDivisionDropdownOpen) {
      setAddPlayerDivisionDropdownOpen(!isAddPlayerDivisionDropdownOpen);
    } else {
      handleAddPlayerDivisionDropdownToggle();
    }
  };

  const handleField1Change = isField1Checked => {
    setField1Checked(isField1Checked);
    if (isField1Checked){
      setField1Disabled(true);
      setField1ReasonValue("");
    }
    else {
      setField1Disabled(false);
    }
  };

  const handleField2Change = isField2Checked => {
    setField2Checked(isField2Checked);
    if (isField2Checked){
      setField2Disabled(true);
    }
    else {
      setField2Disabled(false);
    }
  };

  const handleField3Change = isField3Checked => {
    setField3Checked(isField3Checked);
    if (isField3Checked){
      setField3Disabled(true);
    }
    else {
      setField3Disabled(false);
    }
  };

  const handleField4Change = isField4Checked => {
    setField4Checked(isField4Checked);
    if (isField4Checked){
      setField4Disabled(true);
    }
    else {
      setField4Disabled(false);
    }
  };

  const handleField5Change = isField5Checked => {
    setField5Checked(isField5Checked);
    if (isField5Checked){
      setField5Disabled(true);
    }
    else {
      setField5Disabled(false);
    }
  };

  const handleField6Change = isField6Checked => {
    setField6Checked(isField6Checked);
    if (isField6Checked){
      setField6Disabled(true);
    }
    else {
      setField6Disabled(false);
    }
  };

  const handleField7Change = isField7Checked => {
    setField7Checked(isField7Checked);
    if (isField7Checked){
      setField7Disabled(true);
    }
    else {
      setField7Disabled(false);
    }
  };

  const handleField1ReasonInputChange = value => {
    setField1ReasonValue(value);
  };

  const handleField2ReasonInputChange = value => {
    setField2ReasonValue(value);
  };

  const handleField3ReasonInputChange = value => {
    setField3ReasonValue(value);
  };

  const handleField4ReasonInputChange = value => {
    setField4ReasonValue(value);
  };

  const handleField5ReasonInputChange = value => {
    setField5ReasonValue(value);
  };

  const handleField6ReasonInputChange = value => {
    setField6ReasonValue(value);
  };

  const handleField7ReasonInputChange = value => {
    setField7ReasonValue(value);
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
            <Tab
              eventKey={7}
              title={<TabTitleText>Admin Users</TabTitleText>}
              tabContentId={`tabContent${7}`}
            />
	  </Tabs>
      </PageSection>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <Flex direction={{ default: 'column' }}>
          <FlexItem>
            <TabContent key={0} eventKey={0} id={`tabContent${0}`} activeKey={activeTabKey} hidden={0 !== activeTabKey}>
              <TabContentBody>
                <Button variant="primary" onClick={handleAddPlayerModalToggle}>
	          Add Player
	        </Button>{'    '}
	          <Modal
	            variant={ModalVariant.medium}
	            title="Add New Player"
	            description="Adds a new player to the EHT Softball League"
	            isOpen={isAddPlayerModalOpen}
	            onClose={handleAddPlayerModalToggle}
	            actions={[
                      <Button key="addPlayer" variant="primary" form="add-player-form" onClick={handleAddPlayerModalToggle}>
                        Add Player
                      </Button>,
                      <Button key="cancelAddPlayer" variant="link" onClick={handleAddPlayerModalToggle}>
                        Cancel
                      </Button>
                    ]}
                    onEscapePress={onEscapePress}
	          >
                    <Form id="add-player-form">
                      <FormGroup 
                        label="Name"
                        labelIcon={
                          <Popover
                            headerContent={
                              <div>
                                The name of the player
                              </div>
                            }
                            bodyContent={
                              <div>
                                Enter as follows (for Privacy): &lt;First Name&gt;&lt;space&gt;&lt;Last Name&gt;
                              </div>
                            }
                          >
                            <button
                            type="button"
                            aria-label="More info for name field"
                            onClick={e => e.preventDefault()}
                            aria-describedby="add-player-modal-name"
                            className="pf-c-form__group-label-help"
                            >
                              <HelpIcon noVerticalAlign />
                            </button>
                          </Popover>
                        }
                        isRequired
                        fieldId="add-player-modal-name">
                          <TextInput
                            isRequired
                            type="text"
                            id="add-player-name"
                            name="add-player-name"
                            value={nameValue}
                            onChange={handleNameInputChange}
                          />
                     </FormGroup>
                     <FormGroup 
                       label="Jersey Number"
                       labelIcon={
                       <Popover
                         headerContent={
                           <div>
                             The players jersey number
                           </div>
                         }  
                         bodyContent={
                           <div>
                             Usually a number between 0 - 99.
                            </div>
                         }
                       >
                         <button
                           type="button"
                           aria-label="More info for jersey number field"
                           onClick={e => e.preventDefault()}
                           aria-describedby="add-player-jersey-number"
                           className="pf-c-form__group-label-help"
                         >
                           <HelpIcon noVerticalAlign />
                         </button>
                       </Popover>
                       }
                       fieldId="add-player-jersey-number">
                         <TextInput
                           isRequired
                           type="number"
                           id="modal-with-form-form-email"
                           name="modal-with-form-form-email"
                           value={jerseyNumberValue}
                           onChange={handleJerseyNumberInputChange}
                         />
                     </FormGroup>
                     <FormGroup
                       label="Division"
                       labelIcon={
                         <Popover
                           headerContent={
                             <div>What division does this player compete in?</div>
                           }
                           bodyContent={
                             <div>Choose either 6U, 8U, 10U, 12U, 14U, or 16U.</div>
                           }
                         >
                           <button
                             type="button"
                             aria-label="More info for the divisions field"
                             onClick={e => e.preventDefault()}
                             aria-describedby="add-player-division"
                             className="pf-c-form__group-label-help"
                           >
                             <HelpIcon noVerticalAlign />
                           </button>
                         </Popover>
                       }
                       fieldId="add-player-division">
                         <Select
                           variant={SelectVariant.single}
                           aria-label="Select Division"
                           onToggle={handleAddPlayerDivisionDropdownToggle}
                           onSelect={addPlayerDivisionDropdownSelect}
                           selections={selected}
                           isOpen={isAddPlayerDivisionDropdownOpen}
                           aria-labelledby="select-division-id"
                           direction={SelectDirection.down}
                           menuAppendTo={() => document.body}
                         >
                           {addPlayerDivisionDropdownItems}
                       </Select>
	             </FormGroup>
	           </Form>
	         </Modal>
                <Button variant="primary" onClick={handleAddPlayerFileClick}>
	          Add Players from File
	        </Button>{' '}
	        <Text component="br" />
	        <Text component="br" />
	        <Text component="hr" />
	        <AdminPlayersTable />
              </TabContentBody>
            </TabContent>
          </FlexItem>
	</Flex>
      </PageSection>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <TabContent key={2} eventKey={2} id={`tabContent${2}`} activeKey={activeTabKey} hidden={2 !== activeTabKey}>
          <TabContentBody>
            <Gallery hasGutter>
              <GalleryItem key="1">
                <Card>
                  <CardHeader>
                    Field 1
                  </CardHeader>
                  <CardBody>
                    <Switch
                      id="field1Switch"
                      label="Open"
                      labelOff="Closed"
                      isChecked={isField1Checked}
                      onChange={handleField1Change}
                    />
	              <Text component="br" />
	              <Text component="br" />
                      Reason:
                      <TextInput
                        isDisabled={isField1Disabled}
                        type="text"
                        id="field1Reason"
                        name="field1Reason"
                        value={field1ReasonValue}
                        onChange={handleField1ReasonInputChange}
                      />
                  </CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem key="2">
                <Card>
                  <CardHeader>
                    Field 2
                  </CardHeader>
                  <CardBody>
                    <Switch
                      id="field2Switch"
                      label="Open"
                      labelOff="Closed"
                      isChecked={isField2Checked}
                      onChange={handleField2Change}
                    />
                      <Text component="br" />
                      <Text component="br" />
                      Reason:
                      <TextInput
                        isDisabled={isField2Disabled}
                        type="text"
                        id="field2Reason"
                        name="field2Reason"
                        value={field2ReasonValue}
                        onChange={handleField2ReasonInputChange}
                      />
                  </CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem key="3">
                <Card>
                  <CardHeader>
                    Field 3
                  </CardHeader>
                  <CardBody>
                    <Switch
                      id="field3Switch"
                      label="Open"
                      labelOff="Closed"
                      isChecked={isField3Checked}
                      onChange={handleField3Change}
                    />
                      <Text component="br" />
                      <Text component="br" />
                      Reason:
                      <TextInput
                        isDisabled={isField3Disabled}
                        type="text"
                        id="field3Reason"
                        name="field3Reason"
                        value={field3ReasonValue}
                        onChange={handleField3ReasonInputChange}
                      />
                  </CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem key="4">
                <Card>
                  <CardHeader>
                    Field 4
                  </CardHeader>
                  <CardBody>
                    <Switch
                      id="field4Switch"
                      label="Open"
                      labelOff="Closed"
                      isChecked={isField4Checked}
                      onChange={handleField4Change}
                    />
                      <Text component="br" />
                      <Text component="br" />
                      Reason:
                      <TextInput
                        isDisabled={isField4Disabled}
                        type="text"
                        id="field4Reason"
                        name="field4Reason"
                        value={field4ReasonValue}
                        onChange={handleField4ReasonInputChange}
                      />
                  </CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem key="5">
                <Card>
                  <CardHeader>
                    Field 5
                  </CardHeader>
                  <CardBody>
                    <Switch
                      id="field5Switch"
                      label="Open"
                      labelOff="Closed"
                      isChecked={isField5Checked}
                      onChange={handleField5Change}
                    />
                      <Text component="br" />
                      <Text component="br" />
                      Reason:
                      <TextInput
                        isDisabled={isField5Disabled}
                        type="text"
                        id="field5Reason"
                        name="field5Reason"
                        value={field5ReasonValue}
                        onChange={handleField5ReasonInputChange}
                      />
                  </CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem key="6">
                <Card>
                  <CardHeader>
                    Field 6
                  </CardHeader>
                  <CardBody>
                    <Switch
                      id="field6Switch"
                      label="Open"
                      labelOff="Closed"
                      isChecked={isField6Checked}
                      onChange={handleField6Change}
                    />
                      <Text component="br" />
                      <Text component="br" />
                      Reason:
                      <TextInput
                        isDisabled={isField6Disabled}
                        type="text"
                        id="field6Reason"
                        name="field6Reason"
                        value={field6ReasonValue}
                        onChange={handleField6ReasonInputChange}
                      />
                  </CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem key="7">
                <Card>
                  <CardHeader>
                    Field 7
                  </CardHeader>
                  <CardBody>
                    <Switch
                      id="field7Switch"
                      label="Open"
                      labelOff="Closed"
                      isChecked={isField7Checked}
                      onChange={handleField7Change}
                    />
                      <Text component="br" />
                      <Text component="br" />
                      Reason:
                      <TextInput
                        isDisabled={isField7Disabled}
                        type="text"
                        id="field7Reason"
                        name="field7Reason"
                        value={field7ReasonValue}
                        onChange={handleField7ReasonInputChange}
                      />
                  </CardBody>
                </Card>
              </GalleryItem>
            </Gallery>
          </TabContentBody>
        </TabContent>
      </PageSection>
    </div>
  );
}

export default Admin;

