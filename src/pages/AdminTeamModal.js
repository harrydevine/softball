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

class AdminTeamModal extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false,
        isDivisionOpen: false,
        isColorOpen: false,
        team: "",
        teamColor: "",
        coachname: "",
        coachphone: "",
        coachemail: "",
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

      this.teamColorItems = [
        <SelectOption key={0} value="Select a Team Color" isPlaceholder />,
        <SelectOption key={1} value="Pink" />,
        <SelectOption key={2} value="Yellow" />,
        <SelectOption key={3} value="Teal" />,
        <SelectOption key={4} value="Purple" />,
        <SelectOption key={5} value="Green" />,
        <SelectOption key={6} value="Blue" />,
        <SelectOption key={7} value="Light Blue" />,
        <SelectOption key={8} value="Red" />,
        <SelectOption key={9} value="Orange" />,
        <SelectOption key={10} value="White" />
      ];
      
      this.handleModalToggle = () => {
        this.setState(({ isModalOpen}) => ({
          isModalOpen: !isModalOpen
        }));
      };
      this.handleTeamAdd = () => {
        this.setState(({ isModalOpen}) => ({
            isModalOpen: !isModalOpen
          }));
        console.log(this.state.team, " ", this.state.teamColor, " ", this.state.coachname, " ", this.state.coachphone, " ", this.state.coachemail, " ", this.state.division);
        /* Add Board Member to database...*/
//        addBoardMemberToDatabase('http://192.168.1.21:8081/board', { name: boardMemberNameValue, title: boardMemberPositionValue, phone: boardMemberPhoneNumberValue, email: boardMemberEmailValue })
//        .then(data => {
//          console.log(data);
//        });
    
        /* Reset dialog fields for next time */
        this.setState({ team: "" });
        this.setState({ teamColor: "" });
        this.setState({ coachname: "" });
        this.setState({ coachphone: "" });
        this.setState({ coachemail: "" });
        this.setState({ division: "" });
      };
      this.handleTeamCancel = () => {
        console.log("Hit handleTeamCancel....")
        this.setState(({ isModalOpen}) => ({
            isModalOpen: !isModalOpen
          }));
      
        /* Reset dialog fields for next time */
        this.setState({ team: "" });
        this.setState({ teamColor: "" });
        this.setState({ coachname: "" });
        this.setState({ coachphone: "" });
        this.setState({ coachemail: "" });
        this.setState({ division: "" });
      };
      this.onTeamChange = newValue => {
        console.log("New value for team: ", newValue)
        this.setState(({ team: newValue }));
    };
    this.onCoachNameChange = newValue => {
        console.log("New value for coachname: ", newValue)
        this.setState(({ coachname: newValue }));
    };
    this.onCoachPhoneChange = newValue => {
        console.log("New value for coachphone: ", newValue)
        this.setState(({ coachphone: newValue }));
    };
    this.onCoachEmailChange = newValue => {
        console.log("New value for coachemail: ", newValue)
        this.setState(({ coachemail: newValue }));
    };
    this.onEscapePress = () => {
      this.setState(({ isDivisionOpen }) => ({
        isDivisionOpen: !isDivisionOpen
      }));
      this.setState(({ isColorOpen }) => ({
        isColorOpen: !isColorOpen
      }));
    };
    this.onDivisionToggle = isDivisionOpen => {
      console.log("isDivisionOpen: ", isDivisionOpen);
      this.setState({ isDivisionOpen });
    };
    this.onColorToggle = isColorOpen => {
      console.log("isColorOpen: ", isColorOpen);
      this.setState({ isColorOpen });
    };
        
    this.onDivisionSelect = (event, selection, isPlaceholder) => {
        console.log("Hit onDivisionSelect ", selection);
        if (isPlaceholder) {
          this.setState({ division: ""});
          this.setState({ isDivisionOpen: false })
      }
      else {
        console.log("New value for division: ", selection)
        this.setState({ division: selection});
        this.setState({ isOpen: false })
      }
    };
    this.onColorSelect = (event, selection, isPlaceholder) => {
        console.log("Hit onColorSelect ", selection);
        if (isPlaceholder) {
          this.setState({ teamColor: ""});
          this.setState({ isColorOpen: false })
      }
      else {
        console.log("New value for teamColor: ", selection)
        this.setState({ teamColor: selection});
        this.setState({ isColorOpen: false })
      }
    };
            
  }

  render() {
    const { isModalOpen, isDivisionOpen, isColorOpen, team, teamColor, coachname, coachphone, coachemail, division } = this.state;
    
    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleModalToggle}>Add New Team</Button>{'  '}
        <Modal
          variant={ModalVariant.medium}
          title="Add New Team"
          description="Adds a new team to the EHT Softball League"
          isOpen={isModalOpen}
          onClose={this.handleTeamAdd}
          actions={[
            <Button key="addTeam" variant="primary" form="add-team-form" onClick={this.handleTeamAdd}>
              Add Team
            </Button>,
            <Button key="cancelAddTeam" variant="link" onClick={this.handleTeamCancel}>
              Cancel
            </Button>
          ]}
          onEscapePress={this.onEscapePress}
        >
        <Form id="add-team-form">
          <FormGroup
            label="Team Name"
              labelIcon={
              <Popover
                headerContent={
                 <div>The name of the team</div>
                }
                bodyContent={
                  <div>Enter Team Name</div>
                }   
              > 
              <button
                type="button"
                aria-label="More info for Team Name field"
                onClick={e => e.preventDefault()}
                aria-describedby="add-team-modal-team"
                className="pf-c-form__group-label-help"
              >
                <HelpIcon noVerticalAlign />
              </button>
              </Popover>
              }
              isRequired
              fieldId="add-team-modal-team">
              <TextInput
                isRequired
                type="text"
                id="add-team-name"
                name="add-team-name"
                value={this.team}
                onChange={this.onTeamChange}
              />
          </FormGroup>
          <FormGroup
            label="Team Color"
            labelIcon={
            <Popover
               headerContent={
                 <div>What color will this team use?</div>
               }
               bodyContent={
                 <div>Select a color from the list</div>
               }
            >
            <button
              type="button"
              aria-label="More info for the color field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-player-color"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-team-color">
            <Select
              variant={SelectVariant.single}
              aria-label="Select Team Color"
              onToggle={this.onColorToggle}
              onSelect={this.onColorSelect}
              selections={teamColor}
              isOpen={isColorOpen}
              aria-labelledby="select-team-color-id"
              direction={SelectDirection.down}
              menuAppendTo={() => document.body}
            >
                { this.teamColorItems }
            </Select>
          </FormGroup>
          <FormGroup
            label="Coach Name"
            labelIcon={
            <Popover
              headerContent={
                <div>The team's coach name</div>
              }
              bodyContent={
                <div>Enter the team's coach.</div>
              }
            >
            <button
              type="button"
              aria-label="More info for coach name field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-team-coachname"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-team-coachname">
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-coachname"
              name="modal-with-form-coachname"
              value={this.coachname}
              onChange={this.onCoachNameChange}
            />
          </FormGroup>
          <FormGroup
            label="Coach Phone"
            labelIcon={
            <Popover
              headerContent={
                <div>The coach's phone number</div>
              }
              bodyContent={
                <div>Enter the coach's phone number.</div>
              }
            >
            <button
              type="button"
              aria-label="More info for coach phone field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-team-coachphone"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-team-coachphone">
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-coachphone"
              name="modal-with-form-coachphone"
              value={this.coachphone}
              onChange={this.onCoachPhoneChange}
            />
          </FormGroup>
          <FormGroup
            label="Coach Email"
            labelIcon={
            <Popover
              headerContent={
                <div>The team's coach email</div>
              }
              bodyContent={
                <div>Enter the coach's email.</div>
              }
            >
            <button
              type="button"
              aria-label="More info for coach email field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-team-coachemail"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-team-coachemail">
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-coachemail"
              name="modal-with-form-coachemail"
              value={this.coachemail}
              onChange={this.onCoachEmailChange}
            />
          </FormGroup>
          <FormGroup
            label="Division"
            labelIcon={
            <Popover
               headerContent={
                 <div>What division will this team compete in?</div>
               }
               bodyContent={
                 <div>Choose either 6U, 8U, 10U, 12U, 14U, or 16U.</div>
               }
            >
            <button
              type="button"
              aria-label="More info for the Division field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-team-division"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-team-division">
            <Select
              variant={SelectVariant.single}
              aria-label="Select Division"
              onToggle={this.onDivisionToggle}
              onSelect={this.onDivisionSelect}
              selections={division}
              isOpen={isDivisionOpen}
              aria-labelledby="select-team-division-id"
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

export default AdminTeamModal;
