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

class AdminTournamentsModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      dateStart: "",
      dateEnd: "",
      description: "",
      tourneyImg: "",
      title: "",
      divisions: "",
      details: "",
      registerURL: ""
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
  
    this.handleTournamentAdd = () => {
      this.setState(({ isModalOpen}) => ({
        isModalOpen: !isModalOpen
      }));
      console.log(this.state.dateStart, " ", this.state.dateEnd, " ", this.state.description, " ", this.state.tourneyImg, " ", this.state.title, " ", this.state.divisions, " ", this.state.details, " ", this.state.registerURL);      
      
      /* Reset dialog fields for next time */
      this.setState({ dateStart: "" });
      this.setState({ dateEnd: "" });
      this.setState({ description: "" });
      this.setState({ tourneyImg: "" });
      this.setState({ title: "" });
      this.setState({ divisions: "" });
      this.setState({ details: "" });
      this.setState({ registerURL: "" });
    };
  
    this.handleTournamentCancel = () => {
      console.log("Hit handleTournamentCancel....")
      this.setState(({ isModalOpen}) => ({
        isModalOpen: !isModalOpen
      }));
        
      /* Reset dialog fields for next time */
      this.setState({ dateStart: "" });
      this.setState({ dateEnd: "" });
      this.setState({ description: "" });
      this.setState({ tourneyImg: "" });
      this.setState({ title: "" });
      this.setState({ divisions: "" });
      this.setState({ details: "" });
      this.setState({ registerURL: "" });
    };
  
    this.onStartDateChange = (str, date) => {
        console.log('str', str, 'date', date);
        this.setState({ dateStart: date });
      }
  
    this.onEndDateChange = (str, date) => {
      console.log('str', str, 'date', date);
      this.setState({ endDate: date });
    }
  
    this.onDescriptionChange = newValue => {
        console.log('description', newValue);
        this.setState({ description: newValue });
      }

    this.onTitleChange = newValue => {
      console.log('title', newValue);
      this.setState({ title: newValue });
    }

    this.onDetailsChange = newValue => {
      console.log('details', newValue);
      this.setState({ details: newValue });
    }
  
    this.onDivisionsChange = newValue => {
      console.log('divisions', newValue);
      this.setState({ divisions: newValue });
    }

    this.onImageChange = newValue => {
        console.log('tourneyImg', newValue);
        this.setState({ tourneyImage: newValue });
    }

    this.onURLChange = newValue => {
      console.log('registerURL', newValue);
      this.setState({ registerURL: newValue });
    }
  
  };    

  render() {
    const { isModalOpen, startDate, endDate, description, tourneyImg, title, divisions, details, registerURL } = this.state;
    
    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleModalToggle}>Add New Tournament</Button>{'  '}
        <Modal
          variant={ModalVariant.medium}
          title="Add new Tournament"
          description="Adds a new Tournament"
          isOpen={isModalOpen}
          onClose={this.handleTournamentAdd}
          actions={[
            <Button key="addTournament" variant="primary" form="add-tournament-form" onClick={this.handleTournamentAdd}>
              Add Tournament
            </Button>,
            <Button key="cancelTournamentAdd" variant="link" onClick={this.handleTournamentCancel}>
              Cancel
            </Button>
          ]}
        >
        <Form id="add-tourament-form">
          <FormGroup
            label="Start Date"
              labelIcon={
              <Popover
                headerContent={
                 <div>The start date of the tourament</div>
                }
                bodyContent={
                  <div>Select start date</div>
                }   
              > 
              <button
                type="button"
                aria-label="More info for start date field"
                onClick={e => e.preventDefault()}
                aria-describedby="add-mtg-start-date"
                className="pf-c-form__group-label-help"
              >
                <HelpIcon noVerticalAlign />
              </button>
              </Popover>
              }
              isRequired
              fieldId="add-tourament-start-date">
              <DatePicker
                value={"01-01-2022"}
                placeholder="MM-DD-YYYY"
                dateFormat={this.dateFormat}
                dateParse={this.dateParse}
                onChange={this.onDateChange}
              />
          </FormGroup>
          <FormGroup
            label="End Date"
              labelIcon={
              <Popover
                headerContent={
                 <div>The end date of the tourament</div>
                }
                bodyContent={
                  <div>Select end date</div>
                }   
              > 
              <button
                type="button"
                aria-label="More info for end date field"
                onClick={e => e.preventDefault()}
                aria-describedby="add-mtg-end-date"
                className="pf-c-form__group-label-help"
              >
                <HelpIcon noVerticalAlign />
              </button>
              </Popover>
              }
              isRequired
              fieldId="add-tourament-end-date">
              <DatePicker
                value={"01-01-2022"}
                placeholder="MM-DD-YYYY"
                dateFormat={this.dateFormat}
                dateParse={this.dateParse}
                onChange={this.onDateChange}
              />
          </FormGroup>
          <FormGroup
            label="Title"
            labelIcon={
            <Popover
              headerContent={
                <div>The tourament title</div>
              }
              bodyContent={
                <div>Enter the tourament title</div>
              }
            >
            <button
              type="button"
              aria-label="More info for title field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-tournament-title"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-tournament-title">
            <TextInput
              isRequired
              type="text"
              id="modal-add-tournament-title"
              name="modal-add-tournament-title"
              value={this.title}
              onChange={this.onTitleChange}
            />
          </FormGroup>
          <FormGroup
            label="Description"
            labelIcon={
            <Popover
              headerContent={
                <div>The tourament description</div>
              }
              bodyContent={
                <div>Enter any description information (who to contact, etc)</div>
              }
            >
            <button
              type="button"
              aria-label="More info for description field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-tournament-description"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-tournament-description">
            <TextInput
              isRequired
              type="text"
              id="modal-add-tournament-description"
              name="modal-add-tournament-description"
              value={this.description}
              onChange={this.onDescriptionChange}
            />
          </FormGroup>
          <FormGroup
            label="Details"
            labelIcon={
            <Popover
              headerContent={
                <div>The tourament details</div>
              }
              bodyContent={
                <div>Enter the tourament details (i.e price / umpire fees / santioning body)</div>
              }
            >
            <button
              type="button"
              aria-label="More info for details field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-tournament-details"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-tournament-details">
            <TextInput
              isRequired
              type="text"
              id="modal-add-tournament-details"
              name="modal-add-tournament-details"
              value={this.details}
              onChange={this.onDetailsChange}
            />
          </FormGroup>
          <FormGroup
            label="Divisions"
            labelIcon={
            <Popover
              headerContent={
                <div>The divisions eligible for this tournament</div>
              }
              bodyContent={
                <div>Enter the tourament divisions, usually comma separated (i.e 10BC,12BC)</div>
              }
            >
            <button
              type="button"
              aria-label="More info for divisions field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-tournament-divisions"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-tournament-divisions">
            <TextInput
              isRequired
              type="text"
              id="modal-add-tournament-divisions"
              name="modal-add-tournament-divisions"
              value={this.divisions}
              onChange={this.onDivisionsChange}
            />
          </FormGroup>
          <FormGroup
            label="Tourament Image"
            labelIcon={
            <Popover
              headerContent={
                <div>The tourament flyer image</div>
              }
              bodyContent={
                <div>Enter the tourament flyer image location (usually "/images/&lt;filename&gt;"); Website coordinator can upload the image file;</div>
              }
            >
            <button
              type="button"
              aria-label="More info for image field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-tournament-image"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-tournament-image">
            <TextInput
              isRequired
              type="text"
              id="modal-add-tournament-image"
              name="modal-add-tournament-image"
              value={this.tourneyImg}
              onChange={this.onImageChange}
            />
          </FormGroup>
          <FormGroup
            label="Registration URL"
            labelIcon={
            <Popover
              headerContent={
                <div>The tourament registration URL</div>
              }
              bodyContent={
                <div>Enter the tourament registration URL (usually in the form of "http://&lt;URL&gt;")</div>
              }
            >
            <button
              type="button"
              aria-label="More info for registration field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-tournament-registration"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-tournament-registration">
            <TextInput
              isRequired
              type="text"
              id="modal-add-tournament-registration"
              name="modal-add-tournament-registration"
              value={this.registerURL}
              onChange={this.onURLChange}
            />
          </FormGroup>
        </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

export default AdminTournamentsModal;
