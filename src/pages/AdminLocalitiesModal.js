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
  ModalVariant,
  getUniqueId
} from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';

class AdminLocalitiesModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      name: "",
      street: "",
      city: "",
      usstate: "",
      zip: "",
      lat: 0,
      lng: 0,
      description: ""
    };
     
    this.handleModalToggle = () => {
      this.setState(({ isModalOpen}) => ({
        isModalOpen: !isModalOpen
      }));
    };
    this.handleLocalityAdd = () => {
      this.setState(({ isModalOpen}) => ({
          isModalOpen: !isModalOpen
        }));
      console.log(this.state.name, " ", this.state.street, " ", this.state.city, " ", this.state.usstate, " ", this.state.zip, " ", this.state.lat, " ", this.state.lng, " ", this.state.description);

      /* Reset dialog fields for next time */
      this.setState({ name: "" });
      this.setState({ street: "" });
      this.setState({ city: "" });
      this.setState({ usstate: "" });
      this.setState({ zip: ""});
      this.setState({ lat: 0});
      this.setState({ lng: 0});
      this.setState({ description: ""});
    };
    this.handleLocalityCancel = () => {
      console.log("Hit handleLocalityCancel....");
      this.setState(({ isModalOpen}) => ({
          isModalOpen: !isModalOpen
        }));
      
      /* Reset dialog fields for next time */
      this.setState({ name: "" });
      this.setState({ street: "" });
      this.setState({ city: "" });
      this.setState({ usstate: "" });
      this.setState({ zip: ""});
      this.setState({ lat: 0});
      this.setState({ lng: 0});
      this.setState({ description: ""});
  };

  /*
    async function addBoardMemberToDatabase (url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      });
      return response.json();
    };
*/
    this.onNameChange = newValue => {
        console.log("New value for name: ", newValue)
        this.setState(({ name: newValue }));
    };
    this.onStreetChange = newValue => {
        console.log("New value for street: ", newValue)
        this.setState(({ street: newValue }));
    };
    this.onCityChange = newValue => {
        console.log("New value for city: ", newValue)
        this.setState(({ city: newValue }));
    };
    this.onUSStateChange = newValue => {
        console.log("New value for state: ", newValue)
        this.setState(({ usstate: newValue }));
    };
    this.onZipChange = newValue => {
        console.log("New value for zip: ", newValue)
        this.setState(({ zip: newValue }));
    };
    this.onLatChange = newValue => {
        console.log("New value for latitude: ", newValue)
        this.setState(({ lat: newValue }));
    };
    this.onLngChange = newValue => {
        console.log("New value for longitude: ", newValue)
        this.setState(({ lng: newValue }));
    };
    this.onDescriptionChange = newValue => {
        console.log("New value for description: ", newValue)
        this.setState(({ description: newValue }));
    };
  }

  render() {
    const { isModalOpen, isOpen, name, street, city, usstate, zip, lat, lng, description } = this.state;

    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.handleModalToggle}>Add Locality</Button>{'  '}
        <Modal
          variant={ModalVariant.medium}
          title="Add New Locality"
          description="Adds a new locality to the EHT Softball League"
          isOpen={isModalOpen}
          onClose={this.handleLocalityAdd}
          actions={[
            <Button key="addLocality" variant="primary" form="add-player-form" onClick={this.handleLocalityAdd}>
              Add Locality
            </Button>,
            <Button key="cancelAddLocality" variant="link" onClick={this.handleLocalityCancel}>
              Cancel
            </Button>
          ]}
        >
        <Form id="add-locality-form">
          <FormGroup
            label="Name"
              labelIcon={
              <Popover
                headerContent={
                 <div>The name of the town/locality</div>
                }
                bodyContent={
                  <div>Enter Town/Locality Name</div>
                }   
              > 
              <button
                type="button"
                aria-label="More info for Name field"
                onClick={e => e.preventDefault()}
                aria-describedby="add-locality-modal-name"
                className="pf-c-form__group-label-help"
              >
                <HelpIcon noVerticalAlign />
              </button>
              </Popover>
              }
              isRequired
              fieldId="add-locality-modal-name">
              <TextInput
                isRequired
                type="text"
                id="add-locality-name"
                name="add-locality-name"
                value={this.name}
                onChange={this.onNameChange}
              />
          </FormGroup>
          <FormGroup
            label="Street"
            labelIcon={
            <Popover
              headerContent={
                <div>The Town/Locality Street Address</div>
              }
              bodyContent={
                <div>Street Address</div>
              }
            >
            <button
              type="button"
              aria-label="More info for street field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-locality-street"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-locality-street">
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-form-street"
              name="modal-with-form-form-street"
              value={this.street}
              onChange={this.onStreetChange}
            />
          </FormGroup>
          <FormGroup
            label="City"
            labelIcon={
            <Popover
              headerContent={
                <div>The Town/Locality City</div>
              }
              bodyContent={
                <div>City name</div>
              }
            >
            <button
              type="button"
              aria-label="More info for city field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-locality-city"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-locality-city">
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-form-city"
              name="modal-with-form-form-city"
              value={this.city}
              onChange={this.onCityChange}
            />
          </FormGroup>
          <FormGroup
            label="State"
            labelIcon={
            <Popover
              headerContent={
                <div>The Town/Locality State</div>
              }
              bodyContent={
                <div>State</div>
              }
            >
            <button
              type="button"
              aria-label="More info for state field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-locality-state"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-locality-state">
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-form-state"
              name="modal-with-form-form-state"
              value={this.usstate}
              onChange={this.onUSStateChange}
            />
          </FormGroup>
          <FormGroup
            label="Zip Code"
            labelIcon={
            <Popover
              headerContent={
                <div>The Town/Locality Zip Code</div>
              }
              bodyContent={
                <div>Postal Zip Code</div>
              }
            >
            <button
              type="button"
              aria-label="More info for zip field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-locality-zip"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-locality-zip">
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-form-zip"
              name="modal-with-form-form-zip"
              value={this.zip}
              onChange={this.onZipChange}
            />
          </FormGroup>
          <FormGroup
            label="Latitude"
            labelIcon={
            <Popover
              headerContent={
                <div>The Town/Locality Latitude</div>
              }
              bodyContent={
                <div>Town/Locality Latitude (can be retrieved from Google Maps; should be entered as a number)</div>
              }
            >
            <button
              type="button"
              aria-label="More info for latitude field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-locality-latitude"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-locality-latitude">
            <TextInput
              isRequired
              type="number"
              id="modal-with-form-form-lat"
              name="modal-with-form-form-lat"
              value={this.lat}
              onChange={this.onLatChange}
            />
          </FormGroup>
          <FormGroup
            label="Longitude"
            labelIcon={
            <Popover
              headerContent={
                <div>The Town/Locality Longitude</div>
              }
              bodyContent={
                <div>Town/Locality Longitude (can be retrieved from Google Maps; should be entered as a number)</div>
              }
            >
            <button
              type="button"
              aria-label="More info for longitude field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-locality-longitude"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-locality-longitude">
            <TextInput
              isRequired
              type="number"
              id="modal-with-form-form-lng"
              name="modal-with-form-form-lng"
              value={this.lng}
              onChange={this.onLngChange}
            />
          </FormGroup>
          <FormGroup
            label="Description"
            labelIcon={
            <Popover
              headerContent={
                <div>The Town/Locality Description</div>
              }
              bodyContent={
                <div>Enter any details required to let users know about this locality (directions, field locations, etc.).</div>
              }
            >
            <button
              type="button"
              aria-label="More info for description field"
              onClick={e => e.preventDefault()}
              aria-describedby="add-locality-description"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
            </Popover>
            }
            fieldId="add-locality-description">
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-form-description"
              name="modal-with-form-form-description"
              value={this.description}
              onChange={this.onDescriptionChange}
            />
          </FormGroup>
        </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

export default AdminLocalitiesModal;
