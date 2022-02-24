import React from 'react';
import {
  Button,
  DatePicker,
  Form,
  FormGroup,
  Popover,
  TextInput,
  Modal,
  ModalVariant,
  TimePicker
} from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';

class AdminBoardMeetingModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      mtgDate: "",
      mtgTime: ""
    }

    const dateFormat = date => date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g,'-');
    const dateParse = date => {
      const split = date.split('-');
      if (split.length !== 3) {
        return new Date();
      }
      let month = split[0];
      let day = split[1];
      let year = split[2];
      return new Date(`${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`);
    };
  
    this.handleModalToggle = () => {
      this.setState(({ isModalOpen}) => ({
        isModalOpen: !isModalOpen
      }));
    };
  
    this.handleMeetingAdd = () => {
      this.setState(({ isModalOpen}) => ({
        isModalOpen: !isModalOpen
      }));
      console.log(this.state.mtgDate, " ", this.state.mtgTime);      
      
      /* Reset dialog fields for next time */
      this.setState({ mtgDate: "" });
      this.setState({ mtgTime: "" });
    };
  
    this.handleMeetingCancel = () => {
      console.log("Hit handleMeetingCancel....")
      this.setState(({ isModalOpen}) => ({
        isModalOpen: !isModalOpen
      }));
        
      /* Reset dialog fields for next time */
      this.setState({ mtgDate: "" });
      this.setState({ mtgTime: "" });
    };
  
    this.onDateChange = (str, date) => {
      console.log('str', str, 'date', date);
      this.setState({ mtgDate: date });
    }
  
    this.onTimeChange = (time, hour, minute, seconds, isValid) => {
      console.log('time', time);
      this.setState({ mtgTime: time});
    }
  
  };    

  render() {
    const { isModalOpen, mtgDate, mtgTime } = this.state;
    
    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleModalToggle}>Add New Board Meeting</Button>{'  '}
        <Modal
          variant={ModalVariant.medium}
          title="Add new Board Meeting"
          description="Adds a new Board Meeting"
          isOpen={isModalOpen}
          onClose={this.handleMeetingAdd}
          actions={[
            <Button key="addMeeting" variant="primary" form="add-mtg-form" onClick={this.handleMeetingAdd}>
              Add Meeting
            </Button>,
            <Button key="cancelMeetingAdd" variant="link" onClick={this.handleMeetingCancel}>
              Cancel
            </Button>
          ]}
        >
        <Form id="add-mtg-form">
          <FormGroup
            label="Date"
              labelIcon={
              <Popover
                headerContent={
                 <div>The date of the meeting</div>
                }
                bodyContent={
                  <div>Select meeting date</div>
                }   
              > 
              <button
                type="button"
                aria-label="More info for date field"
                onClick={e => e.preventDefault()}
                aria-describedby="add-mtg-date"
                className="pf-c-form__group-label-help"
              >
                <HelpIcon noVerticalAlign />
              </button>
              </Popover>
              }
              isRequired
              fieldId="add-mtg-date">
              <DatePicker
                value={"01-01-2022"}
                placeholder="MM-DD-YYYY"
                dateFormat={this.dateFormat}
                dateParse={this.dateParse}
                onChange={this.onDateChange}
              />
          </FormGroup>
          <FormGroup
            label="Time"
            labelIcon={
            <Popover
               headerContent={
                 <div>Meeting Start Time</div>
               }
               bodyContent={
                 <div>Select meeting start time</div>
               }
            >
            <button
              type="button"
              aria-label="More info for the time field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-mtg-time"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-mtg-time">
              <TimePicker
                time="4:00 PM"
                placeholder="hh:mm"
                onChange={this.onTimeChange}
                menuAppendTo={() => document.body}
              />
          </FormGroup>
        </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

export default AdminBoardMeetingModal;
