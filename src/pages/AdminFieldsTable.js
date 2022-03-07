import React, { useEffect } from 'react';
import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateVariant,
  EmptyStateBody,
  EmptyStateIcon,
  Spinner,
  Text,
  Title
} from '@patternfly/react-core';
import AdminFieldsModal from './AdminFieldsModal';
import FieldsEditTableRow from './FieldsEditTableRow';
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';

export const columnNames = {
  fieldNum: "Field Number",
  fieldStatus: "Field Status",
  fieldReason: "Field Status Reason"
}

const AdminFieldsTable = ({ children }) => {
  const [fieldData, setFieldData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);
  const [fieldAdded, setFieldAdded] = React.useState(false);

  useEffect(() => {
  // Fetch data for Board Members
    fetchFieldInfo();
    setFieldAdded(false);
  }, []);

  useEffect(() => {
  // Fetch data for Fields
    fetchFieldInfo();
  }, [fieldAdded]);

  // Fetch field data
  const fetchFieldInfo = () => {
    fetch(`http://192.168.1.21:8081/fields`)
    .then(async resp => {
      const jsonResponse = await resp.json()
      setFieldData(jsonResponse);
      setLoading(false);
    })
    .catch(err => {
      setErr(err);
      setLoading(false);
    })
  }

  return (
    <React.Fragment>
      <AdminFieldsModal setFieldAdded={setFieldAdded} />
      <Text component="br" />
      <Text component="br" />
      <Text component="hr" />
      <TableComposable variant={TableVariant.default}  aria-label="Fields Table">
        <Thead>
       <Tr>
         <Th width={20}>{columnNames.fieldNum}</Th>
         <Th width={30}>{columnNames.fieldStatus}</Th>
          <Th width={50}>{columnNames.fieldReason}</Th>
       </Tr>
       </Thead>
        <Tbody>
          {!loading && fieldData?.data.length === 0 && (
            <Tr key="0">
              <Td colSpan={4}>
                <Bullseye>
                  <EmptyState variant={EmptyStateVariant.small}>
                    <EmptyStateIcon icon={SearchIcon} />
                    <Title headingLevel="h2" size="lg">
                      No Field information retrieved!
                    </Title>
                    <EmptyStateBody>
                      Check your network connection or contact the system administrator.
                    </EmptyStateBody>
                  </EmptyState>
                </Bullseye>
              </Td>
            </Tr>
          )}
          {!loading && fieldData?.data.map(row => (
             <FieldsEditTableRow
               key={row.id}
               currentField={row}
               fetchFieldInfo={fetchFieldInfo}
             />
          ))}
         {loading && (
            <Tr>
              <Td colSpan={4}>
              <Bullseye>
                <Spinner size="xl" />
              </Bullseye>
           </Td>
            </Tr>
          )}
      </Tbody>
      </TableComposable>
    </React.Fragment>
  );
}

export default AdminFieldsTable;
