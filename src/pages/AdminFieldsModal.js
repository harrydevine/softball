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

class AdminFieldsModal extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false,
        isOpen: false,
        selected: [],
        fieldNum: "",
        fieldReason: "",
        fieldStatus: ""
      };
      this.statusDropdownItems = [
        <SelectOption key={0} value="Select a Status" isPlaceholder />,
        <SelectOption key={1} value="Open" />,
        <SelectOption key={2} value="Closed" />
      ];
      
      this.handleModalToggle = () => {
        this.setState(({ isModalOpen}) => ({
          isModalOpen: !isModalOpen
        }));
      };
      this.handleFieldAdd = () => {
        this.setState(({ isModalOpen}) => ({
            isModalOpen: !isModalOpen
          }));
        console.log(this.fieldNum, " ", this.fieldStatus, " ", this.fieldReason)      
        /* Add Board Member to database...*/
//        addBoardMemberToDatabase('http://192.168.1.21:8081/board', { name: boardMemberNameValue, title: boardMemberPositionValue, phone: boardMemberPhoneNumberValue, email: boardMemberEmailValue })
//        .then(data => {
//          console.log(data);
//        });
    
        /* Reset dialog fields for next time */
        this.setState({ fieldNum: "" });
        this.setState({ fieldStatus: "" });
        this.setState({ fieldReason: "" });
      };
      this.handleFieldCancel = () => {
        console.log("Hit handleFieldCancel....")
        this.setState(({ isModalOpen}) => ({
            isModalOpen: !isModalOpen
          }));
      
        /* Reset dialog fields for next time */
        this.setState({ fieldNum: "" });
        this.setState({ fieldStatus: "" });
        this.setState({ fieldReason: "" });
      };
    this.onFieldNumChange = newValue => {
        console.log("New value for fieldNum: ", newValue)
        this.setState(({ fieldNum: newValue }));
    };
    this.onFieldReasonChange = newValue => {
        console.log("New value for fieldReason: ", newValue)
        this.setState(({ fieldReason: newValue }));
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
        this.setState({ fieldStatus: ""});
        this.setState({ isOpen: false })
      }
      else {
        console.log("New value for fieldStatus: ", selection)
        this.setState({ fieldStatus: selection});
        this.setState({ isOpen: false })
      }
    };
            
  }

  render() {
    const { isModalOpen, isOpen, selected } = this.state;
    
    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleModalToggle}>Add New Field</Button>{'  '}
        <Modal
          variant={ModalVariant.medium}
          title="Add New Field"
          description="Adds a new field to the EHT Softball League"
          isOpen={isModalOpen}
          onClose={this.handleFieldAdd}
          actions={[
            <Button key="addField" variant="primary" form="add-field-form" onClick={this.handleFieldAdd}>
              Add Field
            </Button>,
             <Button key="cancelAddField" variant="link" onClick={this.handleFieldCancel}>
              Cancel
            </Button>
          ]}
          onEscapePress={this.onEscapePress}
        >
        <Form id="add-field-form">
          <FormGroup
            label="Field Number"
              labelIcon={
              <Popover
                headerContent={
                 <div>The number of the field</div>
                }
                bodyContent={
                  <div>EHT Field Number (1 - 7)</div>
                }   
              > 
              <button
                type="button"
                aria-label="More info for Field Number field"
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
                id="add-field-number"
                name="add-field-number"
                value={this.fieldNum}
                onChange={this.onFieldNumChange}
              />
          </FormGroup>
          <FormGroup
            label="Field Status"
            labelIcon={
            <Popover
               headerContent={
                 <div>Current status of this field</div>
               }
               bodyContent={
                 <div>Choose either Open or Closed.</div>
               }
            >
            <button
              type="button"
              aria-label="More info for the Field Status field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-field-status"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-field-status">
            <Select
              variant={SelectVariant.single}
              aria-label="Select Field Status"
              onToggle={this.onToggle}
              onSelect={this.onSelect}
              selections={selected}
              isOpen={isOpen}
              aria-labelledby="select-field-status"
              direction={SelectDirection.down}
              menuAppendTo={() => document.body}
            >
                { this.statusDropdownItems }
            </Select>
          </FormGroup>
          <FormGroup
            label="Field Reason"
            labelIcon={
            <Popover
              headerContent={
                <div>Reason for current field status</div>
              }
              bodyContent={
                <div>Practice, Maintenance, etc.</div>
              }
            >
            <button
              type="button"
              aria-label="More info for field reason field"
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
              id="modal-with-form-field-reason"
              name="modal-with-form-field-reason"
              value={this.fieldReason}
              onChange={this.onFieldReasonChange}
            />
          </FormGroup>
        </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

export default AdminFieldsModal;
