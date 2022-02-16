import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Popover,
  Select,
  SelectDirection,
  SelectOption,
  SelectVariant,
  TextInput,
  Modal,
  ModalVariant
} from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';

class AdminPlayerModal extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false,
        isOpen: false,
        name: "",
        jersey: "",
        division: ""
      };
      this.divisionDropdownItems = [
        <SelectOption key={0} value="Select a Division" isPlaceholder />,
        <SelectOption key={1} value="6U" />,
        <SelectOption key={2} value="8U" />,
        <SelectOption key={3} value="10U" />,
        <SelectOption key={4} value="12U" />,
        <SelectOption key={5} value="14U" />,
        <SelectOption key={6} value="16U" />
      ];
      
      this.handleModalToggle = () => {
        this.setState(({ isModalOpen}) => ({
          isModalOpen: !isModalOpen
        }));
      };
      this.handlePlayerAdd = () => {
        this.setState(({ isModalOpen}) => ({
            isModalOpen: !isModalOpen
          }));
        console.log(this.state.name, " ", this.state.jersey, " ", this.state.division)      
        /* Add Board Member to database...*/
//        addBoardMemberToDatabase('http://192.168.1.21:8081/board', { name: boardMemberNameValue, title: boardMemberPositionValue, phone: boardMemberPhoneNumberValue, email: boardMemberEmailValue })
//        .then(data => {
//          console.log(data);
//        });
    
        /* Reset dialog fields for next time */
        this.setState({ name: "" });
        this.setState({ jersey: "" });
        this.setState({ division: "" });
      };
      this.handlePlayerCancel = () => {
        console.log("Hit handlePlayerCancel....")
        this.setState(({ isModalOpen}) => ({
            isModalOpen: !isModalOpen
          }));
      
        /* Reset dialog fields for next time */
        this.setState({ name: "" });
        this.setState({ jersey: "" });
        this.setState({ division: "" });
      };
    this.onNameChange = newValue => {
        console.log("New value for name: ", newValue)
        this.setState(({ name: newValue }));
    };
    this.onJerseyChange = newValue => {
        console.log("New value for jersey: ", newValue)
        this.setState(({ jersey: newValue }));
    };
    this.onEscapePress = () => {
      this.setState(({ isOpen }) => ({
        isOpen: !isOpen
      }));
    };
    this.onToggle = isOpen => {
      console.log("isOpen: ", isOpen);
      this.setState({ isOpen });
    };
    
    this.onSelect = (event, selection, isPlaceholder) => {
        console.log("Hit onSelect ", selection);
        if (isPlaceholder) {
          this.setState({ division: ""});
          this.setState({ isOpen: false })
      }
      else {
        console.log("New value for division: ", selection)
        this.setState({ division: selection});
        this.setState({ isOpen: false })
      }
    };
            
  }

  render() {
    const { isModalOpen, isOpen, name, jersey, division } = this.state;
    
    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleModalToggle}>Add New Player</Button>{'  '}
        <Modal
          variant={ModalVariant.medium}
          title="Add New Player"
          description="Adds a new player to the EHT Softball League"
          isOpen={isModalOpen}
          onClose={this.handlePlayerAdd}
          actions={[
            <Button key="addPlayer" variant="primary" form="add-player-form" onClick={this.handlePlayerAdd}>
              Add Player
            </Button>,
            <Button key="cancelAddPlayer" variant="link" onClick={this.handlePlayerCancel}>
              Cancel
            </Button>
          ]}
          onEscapePress={this.onEscapePress}
        >
        <Form id="add-player-form">
          <FormGroup
            label="Name"
              labelIcon={
              <Popover
                headerContent={
                 <div>The name of the Player</div>
                }
                bodyContent={
                  <div>Enter as follows (for privacy): &lt;First Name&gt;&lt;space&gt;&lt;Last Name&gt;space</div>
                }   
              > 
              <button
                type="button"
                aria-label="More info for Name field"
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
                value={this.name}
                onChange={this.onNameChange}
              />
          </FormGroup>
          <FormGroup
            label="Jersey Number"
            labelIcon={
            <Popover
              headerContent={
                <div>The player's jersey number</div>
              }
              bodyContent={
                <div>Usually a number between 0 - 99.</div>
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
              type="text"
              id="modal-with-form-jersey"
              name="modal-with-form-jersey"
              value={this.jersey}
              onChange={this.onJerseyChange}
            />
          </FormGroup>
          <FormGroup
            label="Division"
            labelIcon={
            <Popover
               headerContent={
                 <div>What division will this player compete in?</div>
               }
               bodyContent={
                 <div>Choose either 6U, 8U, 10U, 12U, 14U, or 16U.</div>
               }
            >
            <button
              type="button"
              aria-label="More info for the Division field"
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
              onToggle={this.onToggle}
              onSelect={this.onSelect}
              selections={division}
              isOpen={isOpen}
              aria-labelledby="select-player-division-id"
              direction={SelectDirection.down}
              menuAppendTo={() => document.body}
            >
                { this.divisionDropdownItems }
            </Select>
          </FormGroup>
        </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

export default AdminPlayerModal;
