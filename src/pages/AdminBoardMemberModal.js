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

class AdminBoardMemberModal extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false,
        isPositionDropdownOpen: false,
        name: "",
        position: "",
        phone: "",
        email: ""
      };
      this.handleModalToggle = () => {
        this.setState(({ isModalOpen}) => ({
          isModalOpen: !isModalOpen
        }));
      };
      this.handleBMAdd = () => {
        this.setState(({ isModalOpen}) => ({
            isModalOpen: !isModalOpen
          }));
      
        /* Add Board Member to database...*/
//        addBoardMemberToDatabase('http://192.168.1.21:8081/board', { name: boardMemberNameValue, title: boardMemberPositionValue, phone: boardMemberPhoneNumberValue, email: boardMemberEmailValue })
//        .then(data => {
//          console.log(data);
//        });
    
        /* Reset dialog fields for next time */
        this.setState({ name: "" });
        this.setState({ position: "" });
        this.setState({ phone: "" });
        this.setState({ email: "" });
      };
      this.handleBMCancel = () => {
        this.setState(({ isModalOpen}) => ({
            isModalOpen: !isModalOpen
          }));
      
        /* Reset dialog fields for next time */
        this.setState({ name: "" });
        this.setState({ position: "" });
        this.setState({ phone: "" });
        this.setState({ email: "" });
      };
      this.onNameChange = newValue => {
        this.setState(({ name: newValue }));
    };
    this.onPhoneChange = newValue => {
        this.setState(({ phone: newValue }));
    };
    this.onEmailChange = newValue => {
        this.setState(({ email: newValue }));
    };
    this.onEscapePress = () => {
      this.setState(({ isPositionDropdownOpen }) => ({
        isPositionDropdownOpen: !isPositionDropdownOpen
      }));
    };
    this.handlePositionDropdownToggle = isPositionDropdownOpen => {
      console.log("isPositionDropdownOpen: ", isPositionDropdownOpen);
      this.setState({ isPositionDropdownOpen });
    };
    
    this.handlePositionDropdownSelect = (event, selection, isPlaceholder) => {
        console.log("Hit handlePositionDropdownSelect ", selection);
        if (isPlaceholder) {
        this.setState({ position: ""});
        this.setState({ isPositionDropdownOpen: false })
      }
      else {
        this.setState({ position: selection});
        this.setState({ isPositionDropdownOpen: false })
      }
    };
            
  }

  render() {
    const { isModalOpen } = this.state;
    const positionDropdownItems = [
        <SelectOption key={0} value="Select a Position" isPlaceholder />,
        <SelectOption key={1} value="President" />,
        <SelectOption key={2} value="Vice-President" />,
        <SelectOption key={3} value="Treasurer" />,
        <SelectOption key={4} value="Secretary" />,
        <SelectOption key={5} value="Equipment Maintenance" />,
        <SelectOption key={6} value="Field Maintenance" />,
        <SelectOption key={7} value="Field Coordinator" />,
        <SelectOption key={8} value="Stand Coordinator" />,
        <SelectOption key={9} value="Stand Scheduler" />,
        <SelectOption key={10} value="Website Coordinator" />
      ];
    
    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleModalToggle}>Add Board Member</Button>{'  '}
        <Modal
          variant={ModalVariant.medium}
          title="Add New Board Member"
          description="Adds a new Board Member to the EHT Softball League"
          isOpen={isModalOpen}
          onClose={this.handleBMAdd}
          actions={[
            <Button key="addBoardMember" variant="primary" form="add-player-form" onClick={this.handleBMAdd}>
              Add Board Member
            </Button>,
            <Button key="cancelAddBoardMember" variant="link" onClick={this.handleBMCancel}>
              Cancel
            </Button>
          ]}
          onEscapePress={this.onEscapePress}
        >
        <Form id="add-boardmember-form">
          <FormGroup
            label="Name"
              labelIcon={
              <Popover
                headerContent={
                 <div>The name of the Board Member</div>
                }
                bodyContent={
                  <div>Enter Board Member's Name</div>
                }   
              > 
              <button
                type="button"
                aria-label="More info for Name field"
                onClick={e => e.preventDefault()}
                aria-describedby="add-boardmember-modal-name"
                className="pf-c-form__group-label-help"
              >
                <HelpIcon noVerticalAlign />
              </button>
              </Popover>
              }
              isRequired
              fieldId="add-boardmember-modal-name">
              <TextInput
                isRequired
                type="text"
                id="add-boardmember-name"
                name="add-boardmember-name"
                value={this.name}
                onChange={this.handleNameChange}
              />
          </FormGroup>
          <FormGroup
            label="Position"
            labelIcon={
            <Popover
               headerContent={
                 <div>What Position will this Board Member hold?</div>
               }
               bodyContent={
                 <div>Choose either President, Vice-President, Secretary, Treasurer, Equipment Maintenance, Field Maintenance, Stand Coordinator, Stand Scheduler, Field Coordinator, Website Coordinator.</div>
               }
            >
            <button
              type="button"
              aria-label="More info for the Position field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-boardmember-position"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-boardmember-position">
            <Select
              variant={SelectVariant.single}
              aria-label="Select Position"
              onToggle={this.handlePositionDropdownToggle}
              onSelect={this.handlePostionDropdownSelect}
              selections={this.position}
              isOpen={this.isPositionDropdownOpen}
              aria-labelledby="select-boardmember-position-id"
              direction={SelectDirection.down}
              menuAppendTo={() => document.body}
            >
              {positionDropdownItems}
            </Select>
          </FormGroup>
          <FormGroup
            label="Phone"
            labelIcon={
            <Popover
              headerContent={
                <div>The Board Member's Phone Number</div>
              }
              bodyContent={
                <div>Phone Number</div>
              }
            >
            <button
              type="button"
              aria-label="More info for phone number field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-boardmember-phone-number"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-boardmember-phone-number">
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-form-phone"
              name="modal-with-form-form-phone"
              value={this.phone}
              onChange={this.handlePhoneChange}
            />
          </FormGroup>
          <FormGroup
            label="Email Address"
            labelIcon={
            <Popover
              headerContent={
                <div>The Board Member's Email Address</div>
              }
              bodyContent={
                <div>Email Address</div>
              }
            >
            <button
              type="button"
              aria-label="More info for Email field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-boardmember-email"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-boardmember-phone-email">
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-form-email"
              name="modal-with-form-form-email"
              value={this.email}
              onChange={this.handleEmailChange}
            />
          </FormGroup>
        </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

export default AdminBoardMemberModal;
