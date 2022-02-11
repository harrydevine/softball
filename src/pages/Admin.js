import React from 'react';
import {
  Button,
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
  Radio,
  Select,
  SelectOption,
  SelectVariant,
  SelectDirection,
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
import AdminPlayersTable from './AdminPlayersTable';
import AdminBoardMemberModal from './AdminBoardMemberModal';
import AdminBoardMemberTable from './AdminBoardMemberTable';

const Admin = ({ children }) => {

  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const [isAddPlayerModalOpen, setAddPlayerModalOpen] = React.useState(false);
  const [nameValue, setNameValue] = React.useState("");
  const [jerseyNumberValue, setJerseyNumberValue] = React.useState("");
  const [divisionValue, setDivisionValue] = React.useState("");
  const [isAddPlayerDivisionDropdownOpen, setAddPlayerDivisionDropdownOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [isAddFieldModalOpen, setAddFieldModalOpen] = React.useState(false);
  const [fieldNumValue, setFieldNumValue] = React.useState("");
  const [fieldStatusValue, setFieldStatusValue] = React.useState("Open");
  const [fieldReasonValue, setFieldReasonValue] = React.useState("");

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

  const handleAddPlayerFileClick = () => {
    console.log("Add Player from File button clicked");
  };

  const handleAddFieldsFileClick = () => {
    console.log("Add Field from File button clicked");
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

  const handleAddFieldModalToggle = () => {
    setAddFieldModalOpen(!isAddFieldModalOpen);
  };

  const handleFieldNumInputChange = value => {
    setFieldNumValue(value);
  };

  const handleFieldReasonInputChange = value => {
    setFieldReasonValue(value);
  };

  const handleFieldOpenChange = value => {
    setFieldStatusValue("Closed");
  };

  const handleFieldClosedChange = value => {
    setFieldStatusValue("Open");
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
            <TabContent key={1} eventKey={1} id={`tabContent${1}`} activeKey={activeTabKey} hidden={1 !== activeTabKey}>
              <TabContentBody>
                <Gallery hasGutter>
                  <GalleryItem>
                    Teams Info here!
                  </GalleryItem>
                </Gallery>
              </TabContentBody>
            </TabContent>
            <TabContent key={2} eventKey={2} id={`tabContent${2}`} activeKey={activeTabKey} hidden={2 !== activeTabKey}>
              <TabContentBody>
              <Button variant="primary" onClick={handleAddFieldModalToggle}>
	                Add Field
	              </Button>{'    '}
	              <Modal
	                variant={ModalVariant.medium}
	                title="Add New Field"
	                description="Adds a new field to the EHT Softball League"
	                isOpen={isAddFieldModalOpen}
	                onClose={handleAddFieldModalToggle}
	                actions={[
                      <Button key="addField" variant="primary" form="add-field-form" onClick={handleAddFieldModalToggle}>
                        Add Field
                      </Button>,
                      <Button key="cancelAddField" variant="link" onClick={handleAddFieldModalToggle}>
                        Cancel
                      </Button>
                  ]}
                  onEscapePress={onEscapePress}
	              >
                <Form id="add-field-form">
                  <FormGroup 
                    label="Field Number"
                    labelIcon={
                      <Popover
                        headerContent={
                          <div>
                            Field Number
                          </div>
                        }
                        bodyContent={
                          <div>
                            Enter the Field Number
                          </div>
                        }
                      >
                        <button
                          type="button"
                          aria-label="More info for field number"
                          onClick={e => e.preventDefault()}
                          aria-describedby="add-field-modal-number"
                          className="pf-c-form__group-label-help"
                        >
                          <HelpIcon noVerticalAlign />
                        </button>
                        </Popover>
                    }
                    isRequired
                    fieldId="add-field-modal-number">
                      <TextInput
                        isRequired
                        type="text"
                        id="add-field-name"
                        name="add-field-name"
                        value={fieldNumValue}
                        onChange={handleFieldNumInputChange}
                      />
                    </FormGroup>
                    <FormGroup 
                      label="Field Status"
                      labelIcon={
                      <Popover
                        headerContent={
                          <div>
                            Field Status
                          </div>
                        }  
                        bodyContent={
                          <div>
                            Select Initial Field Status (Open/Closed); Default is Open.
                          </div>
                        }
                      >
                        <button
                          type="button"
                          aria-label="More info for Field Status"
                          onClick={e => e.preventDefault()}
                          aria-describedby="add-field-status"
                          className="pf-c-form__group-label-help"
                        >
                          <HelpIcon noVerticalAlign />
                        </button>
                      </Popover>
                      }
                      fieldId="add-field-status">
                        <Radio
                          id="modal-with-form-field-status-open"
                          name="modal-with-form-field-status"
                          label="Open"
                          defaultChecked
//                          value="Open"
                          onChange={handleFieldOpenChange}
                        />
                        <Radio
                          id="modal-with-form-field-status-closed"
                          name="modal-with-form-field-status"
                          label="Closed"
//                          value="Closed"
                          onChange={handleFieldClosedChange}
                        />
                     </FormGroup>
                     <FormGroup
                       label="Reason"
                       labelIcon={
                         <Popover
                           headerContent={
                             <div>Reason this field is Open or Closed</div>
                           }
                           bodyContent={
                             <div>Enter a short Field Open/Closed reason.</div>
                           }
                         >
                           <button
                             type="button"
                             aria-label="More info for the Field Reason"
                             onClick={e => e.preventDefault()}
                             aria-describedby="add-field-reason"
                             className="pf-c-form__group-label-help"
                           >
                             <HelpIcon noVerticalAlign />
                           </button>
                         </Popover>
                       }
                       fieldId="add-field-reason">
                        <TextInput
                          isRequired
                          type="text"
                          id="add-field-reason"
                          name="add-field-reason"
                          value={fieldReasonValue}
                          onChange={handleFieldReasonInputChange}
                        />
	                  </FormGroup>
	                </Form>
	              </Modal>
                <Button variant="primary" onClick={handleAddFieldsFileClick}>
	                Add Fields from File
	              </Button>{' '}
	              <Text component="br" />
	              <Text component="br" />
      	        <Text component="hr" />
              </TabContentBody>
            </TabContent>
            <TabContent key={3} eventKey={3} id={`tabContent${3}`} activeKey={activeTabKey} hidden={3 !== activeTabKey}>
              <TabContentBody>
                <Gallery hasGutter>
                  <GalleryItem>
                    Tournament Info here!
                  </GalleryItem>
                </Gallery>
              </TabContentBody>
            </TabContent>
            <TabContent key={4} eventKey={4} id={`tabContent${4}`} activeKey={activeTabKey} hidden={4 !== activeTabKey}>
              <TabContentBody>
                <Gallery hasGutter>
                  <GalleryItem>
                    Localities Info here!
                  </GalleryItem>
                </Gallery>
              </TabContentBody>
            </TabContent>
            <TabContent key={5} eventKey={5} id={`tabContent${5}`} activeKey={activeTabKey} hidden={5 !== activeTabKey}>
              <TabContentBody>
                <AdminBoardMemberModal />
    	          <Text component="br" />
      	        <Text component="br" />
	              <Text component="hr" />
                <AdminBoardMemberTable />
              </TabContentBody>
            </TabContent>
            <TabContent key={6} eventKey={6} id={`tabContent${6}`} activeKey={activeTabKey} hidden={6 !== activeTabKey}>
              <TabContentBody>
                <Gallery hasGutter>
                  <GalleryItem>
                    Board Meeting/Minutes Info here!
                  </GalleryItem>
                </Gallery>
              </TabContentBody>
            </TabContent>
            <TabContent key={7} eventKey={7} id={`tabContent${7}`} activeKey={activeTabKey} hidden={7 !== activeTabKey}>
              <TabContentBody>
                <Gallery hasGutter>
                  <GalleryItem>
                    Admin Users here!
                  </GalleryItem>
                </Gallery>
              </TabContentBody>
            </TabContent>
	  </FlexItem>
	</Flex>
      </PageSection>
    </div>
  );
}

export default Admin;

