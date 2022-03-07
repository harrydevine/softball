import * as React from 'react';
import { 
  Alert, 
  AlertGroup,
  AlertActionCloseButton,
  AlertVariant,
  Button, 
  TextInput, 
  Switch
} from '@patternfly/react-core';
import { Tr, Td } from '@patternfly/react-table';
import { columnNames } from './AdminFieldsTable';
import ConfirmDialog from './ConfirmDialog';
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon';
import Remove2Icon from '@patternfly/react-icons/dist/esm/icons/remove2-icon';
import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon';
import CheckIcon from '@patternfly/react-icons/dist/esm/icons/check-icon';

const FieldsEditTableRow = ({ children, ...props }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const {key, currentField, fetchFieldInfo, loading } = props;
  const [editedFieldNum, setEditedFieldNum] = React.useState(currentField.fieldNum);
  const [editedFieldStatus, setEditedFieldStatus] = React.useState(currentField.fieldStatus);
  const [editedFieldReason, setEditedFieldReason] = React.useState(currentField.fieldReason);
  const [alerts, setAlerts] = React.useState([]);
  const [isConfirmDlgOpen, setConfirmDlgOpen] = React.useState(false);

  const addAlert = (title, variant, key) => {
    setAlerts([ ...alerts, {title: title, variant: variant, key }]);
  };

  const removeAlert = key => {
    setAlerts([...alerts.filter(el => el.key !== key)]);
  };

  const getUniqueId = () => (new Date().getTime());

  const addSuccessAlert = ( string ) => { 
    addAlert(string, 'success', getUniqueId());
  };
      
  const addFailureAlert = ( string ) => { 
    addAlert(string, 'danger', getUniqueId()) 
  };

  async function updateFieldInfoInDatabase (url = '', data = {}) {
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

  async function removeFieldInfoInDatabase (url = '', data = {}) {
    const response = await fetch(url, {
      method: 'DELETE',
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

  const updateFieldInfo = (id) => {
    updateFieldInfoInDatabase('http://192.168.1.21:8081/fields/'+ id, { fieldNum: editedFieldNum, fieldStatus: editedFieldStatus ? 1 : 0, fieldReason: editedFieldReason })      
    .then(data => {
      if (data.message === "Field Info updated successfully") {
        addSuccessAlert("Field " + editedFieldNum + " updated successfully");
        fetchFieldInfo();
      }
      else {
        addFailureAlert("Field update unsuccessful");
        console.log("Error updating field info!")
      }
  });
  }

  const removeFieldInfo = async (id) => {
//      setIsEditMode(false);
      removeFieldInfoInDatabase('http://192.168.1.21:8081/fields/'+ id, {})
      .then(data => {
        if (data.message === "Field Info deleted successfully") {
          addSuccessAlert("Field " + editedFieldNum + " deleted successfully");
          fetchFieldInfo();
        }
        else {
          addFailureAlert("Field removal unsuccessful");
          console.log("Error removing field!")
        }
      });
  }

  return (
    <React.Fragment>
      <ConfirmDialog title={"Are you sure you want to delete this field?"} isModalOpen={isConfirmDlgOpen}/>
      <AlertGroup isToast isLiveRegion>
        {alerts.map(({ key, variant, title }) => (
          <Alert
            variant={AlertVariant[variant]}
            title={title}
            timeout={5000}
            actionClose={<AlertActionCloseButton
              title={title}
              variantLabel={`variant} alert`}
              onClose={() => removeAlert(key)} />}
            key={key} />
        ))}
      </AlertGroup>
      <Tr key={key}>
        <Td dataLabel={columnNames.fieldNum}>
          {isEditMode ? (
            <TextInput
              value={editedFieldNum}
              type="text"
              aria-label="field-number"
              onChange={(value) => {
                setEditedFieldNum(value);
              } } />
          ) : (
            editedFieldNum
          )}
        </Td>
        <Td dataLabel={columnNames.fieldStatus}>
          {isEditMode ? (
            <Switch
              id={`switch-${currentField.id}`}
              label="Open"
              labelOff="Closed"
              isChecked={editedFieldStatus}
              onChange={(isChecked) => {
                setEditedFieldStatus(isChecked);
              } } />
          ) : (
            editedFieldStatus ? "Open" : "Closed"
          )}
        </Td>
        <Td dataLabel={columnNames.fieldReason}>
          {isEditMode ? (
            <TextInput
              value={editedFieldReason}
              type="text"
              aria-label="field-reason"
              onChange={(value) => {
                setEditedFieldReason(value);
              } } />
          ) : (
            editedFieldReason
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
        //                  removeFieldInfo(currentField.id);
//                  console.log("In remove field logic....")
                }}
              >
                Remove
              </Button>
            </React.Fragment>
          ) : (
            <>
              <Button
                variant="link"
                icon={<CheckIcon />}
                onClick={() => {
                  setIsEditMode(false);
                  console.log(currentField.id, editedFieldNum ? 1 : 0, editedFieldStatus, editedFieldReason);
                  updateFieldInfo(currentField.id);
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

export default FieldsEditTableRow;
