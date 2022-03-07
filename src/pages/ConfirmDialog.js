import React from 'react';
import {
  Button,
  Modal,
  ModalVariant
} from '@patternfly/react-core';

class ConfirmDialog extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false
      };

      this.handleModalToggle = () => {
        this.setState(({ isModalOpen}) => ({
          isModalOpen: !isModalOpen
        }));
      };
      this.handleYes = () => {
        this.setState(({ isModalOpen}) => ({
            isModalOpen: !isModalOpen
          }));
        console.log("clicked yes");
      };

    this.handleNo = () => {
      this.setState(({ isModalOpen}) => ({
          isModalOpen: !isModalOpen
      }));
      console.log("clicked no");
    };

  }

  render() {
//    const { isModalOpen } = this.state;
    const { isModalOpen } = this.props.isModalOpen;

    return (
      <React.Fragment>
        <Modal
          variant={ModalVariant.medium}
          title={this.props.title}
          isOpen={isModalOpen}
          onClose={this.handleToggleModalToggle}
          actions={[
            <Button key="confirmYes" variant="primary" form="confirmYes" onClick={this.handleYes}>
              Yes
            </Button>,
            <Button key="confirmNo" variant="primary" onClick={this.handleNo}>
              No
            </Button>
          ]}
        >
        </Modal>
      </React.Fragment>
    )
  }
}

export default ConfirmDialog;
