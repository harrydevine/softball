import * as React from 'react';
import { 
  Alert, 
  AlertGroup,
  AlertActionCloseButton,
  AlertVariant,
  Button, 
  Select,
  SelectDirection,
  SelectOption,
  SelectVariant,
  TextInput
} from '@patternfly/react-core';
import { Tr, Td } from '@patternfly/react-table';
import { columnNames } from './AdminCoachTable';
import ConfirmDialog from './ConfirmDialog';
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon';
import Remove2Icon from '@patternfly/react-icons/dist/esm/icons/remove2-icon';
import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon';
import CheckIcon from '@patternfly/react-icons/dist/esm/icons/check-icon';

const CoachTeamEditTableRow = ({ children, ...props }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const {key, currentRow, division, teamName, fetchCoach, addSuccessAlert, addFailureAlert } = props;
  const [editedName, setEditedName] = React.useState(currentRow.name);
  const [editedPhone, setEditedPhone] = React.useState(currentRow.phone);
  const [editedEmail, setEditedEmail] = React.useState(currentRow.email);
  const [isConfirmDlgOpen, setConfirmDlgOpen] = React.useState(false);

  async function updateCoachInDatabase (url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PUT',
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

  async function removeCoachFromTeam  (url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PUT',
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

  const updateCoach = (id) => {
    updateCoachInDatabase('http://softball-pi4:8081/coach/'+ id, { name: editedName, phone: editedPhone, email: editedEmail })      
    .then(data => {
      if (data.message === "Coach updated successfully") {
        addSuccessAlert(editedName + " updated successfully");
        fetchCoach();
      }
      else {
        addFailureAlert(editedName + " update unsuccessful");
        fetchCoach();
        console.log("Error updating " + editedName);
      }
    });
  }

  const removeFromTeam = async (id) => {
      setIsEditMode(false);
      removeCoachFromTeam('http://softball-pi4:8081/coach/resetTeam/'+ id, {})
      .then(data => {
        if (data.message === "Coach/Team assignment reset successfully") {
          addSuccessAlert(editedName + " removed from " + teamName + " successfully");
          fetchCoach();
        }
        else {
          addFailureAlert(editedName + " removal unsuccessful");
          fetchCoach();
          console.log("Error removing " + editedName + "from " + teamName);
        }
      });
  }

  const handleYes = () => {
    removeFromTeam(currentRow.id);
    setConfirmDlgOpen(false);
  }

  const handleNo = () => {
    setConfirmDlgOpen(false);
  }

  return (
    <React.Fragment>
      <ConfirmDialog title={"Are you sure you want to remove " + editedName + " from " + teamName + "?"} isModalOpen={isConfirmDlgOpen} handleYes={handleYes} handleNo={handleNo}/>
      <Tr key={key}>
        <Td dataLabel={columnNames.coachName}>
          {isEditMode ? (
            <TextInput
              value={editedName}
              type="text"
              aria-label="edit-player-name"
              onChange={(value) => {
                setEditedName(value);
              } } />
          ) : (
            editedName
          )}
        </Td>
        <Td dataLabel={columnNames.coachPhone}>
          {isEditMode ? (
            <TextInput
              value={editedPhone}
              type="text"
              aria-label="edit-coach-phone"
              onChange={(value) => {
                setEditedPhone(value);
              } } />
          ) : (
            editedPhone
          )}
        </Td>
        <Td dataLabel={columnNames.coachEmail}>
          {isEditMode ? (
            <TextInput
              value={editedEmail}
              type="text"
              aria-label="edit-coach-email"
              onChange={(value) => {
                setEditedEmail(value);
              } } />
          ) : (
            editedEmail
          )}
        </Td>
        <Td modifier="nowrap">
          {!isEditMode ? (
            <React.Fragment>
              <Button
                variant="link"
                icon={<PencilAltIcon />}
                iconPosition="right"
                onClick={() => {
                  setIsEditMode(true);
                } }
              >
                Edit
              </Button>
              <Button
                variant="link"
                icon={<Remove2Icon />}
                iconPosition="right"
                onClick={() => {
                  setConfirmDlgOpen(true);
                }}
              >
                Remove From Team
              </Button>
            </React.Fragment>
          ) : (
            <>
              <Button
                variant="link"
                icon={<CheckIcon />}
                onClick={() => {
                  setIsEditMode(false);
                  updateCoach(currentRow.id);
                } } />
              <Button
                variant="plain"
                icon={<TimesIcon />}
                onClick={() => {
                  setIsEditMode(false);
                } }
              >
                <TimesIcon />
              </Button>
            </>
          )}
        </Td>
      </Tr>
      </React.Fragment>
  );
}

export default CoachTeamEditTableRow;
