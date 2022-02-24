import React, { useEffect } from 'react';
import {
  Button,
  DualListSelector,
  Modal,
  ModalVariant
} from '@patternfly/react-core';

//class AdminAddPlayerToTeamModal extends React.Component{
const AdminAddPlayerToTeamModal = ( {children, ...props }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [availablePlayers, setAvailablePlayers] = React.useState([]);
  const [chosenPlayers, setChosenPlayers] = React.useState([]);
  const {players, teams} = props;

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };
    
  const handleAddPlayer = () => {
    console.log(this.state.chosenPlayers);
    setModalOpen(!isModalOpen);
  };
    
  const handleAddPlayerCancel = () => {
    console.log("Hit handleAddPlayerToTeamCancel....")
    setModalOpen(!isModalOpen);
  };
    
  const onListChange = (newAvailablePlayers, newChosenPlayers) => {
    setAvailablePlayers(newAvailablePlayers.sort());
    setChosenPlayers(newChosenPlayers.sort());
    };

  return (
  <React.Fragment>
    <Button variant="primary" onClick={handleModalToggle}>Add Player to Team</Button>{'  '}
    <Modal
      variant={ModalVariant.medium}
      title="Add Player To Team"
      description="Adds a player to the selected team"
      isOpen={isModalOpen}
      onClose={handleAddPlayer}
      actions={[
        <Button key="addTeam" variant="primary" form="add-team-form" onClick={handleAddPlayer}>
          Add Player(s)
        </Button>,
        <Button key="cancelAddTeam" variant="link" onClick={handleAddPlayerCancel}>
          Cancel
        </Button>
      ]}
    >
      <DualListSelector
        availableOptionsTitle="Available Players"
        availableOptions={availablePlayers}
        chosenOptionsTitle="Current Teams"
        chosenOptions={chosenPlayers}
        onListChange={onListChange}
        id="basicSelector"
      />
    </Modal>
  </React.Fragment>
  )
}

export default AdminAddPlayerToTeamModal;
