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
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import AdminBoardMeetingModal from './AdminBoardMeetingModal';

const AdminBoardMeetingTable = ({ children }) => {
  const [mtgData, setMtgData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);
  
  useEffect(() => {
  // Fetch data for Board Meetings
    fetch(`http://192.168.1.21:8081/boardmtg`)
      .then(async resp => {
        const jsonResponse = await resp.json()
        setMtgData(jsonResponse);
        setLoading(false);
      })
      .catch(err => {
        setErr(err);
        setLoading(false);
      })
    }, []);

    return (
      <div>
        <React.Fragment>
          <AdminBoardMeetingModal />
          <Text component="br" />
          <Text component="br" />
          <Text component="hr" />
          <TableComposable variant={TableVariant.default}  aria-label="Board Meetings Table">
            <Thead>
	          <Tr>
	            <Th width={50}>Date</Th>
	            <Th width={50}>Time</Th>
	          </Tr>
	          </Thead>
            <Tbody>
              {!loading && mtgData?.data.length === 0 && (
                <Tr key="0">
                  <Td colSpan={4}>
                    <Bullseye>
                      <EmptyState variant={EmptyStateVariant.small}>
                        <EmptyStateIcon icon={SearchIcon} />
                        <Title headingLevel="h2" size="lg">
                          No Board Meeting information retrieved!
                        </Title>
                        <EmptyStateBody>
                          Check your network connection or contact the system administrator.
                        </EmptyStateBody>
                      </EmptyState>
                    </Bullseye>
                  </Td>
                </Tr>
              )}
 	            {!loading && mtgData?.data.map(row => (
                <Tr key={row.id} isEditable>
                  <Td dataLabel="Date">{row.date}</Td>
                  <Td dataLabel="Time">{row.time}</Td>
                </Tr>
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
      </div>
    );
}

export default AdminBoardMeetingTable;

