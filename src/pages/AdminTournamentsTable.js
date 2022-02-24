import React, { useEffect } from 'react';
import {
  Bullseye,
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
import AdminTournamentsModal from './AdminTournamentsModal';

const AdminTournamentsTable = ({ children }) => {
  const [tournamentData, setTournamentData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);

  useEffect(() => {
  // Fetch Tournament data
    fetch(`http://192.168.1.21:8081/tournaments`)
      .then(async resp => {
        const jsonResponse = await resp.json()
        setTournamentData(jsonResponse);
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
          <AdminTournamentsModal />
          <Text component="br" />
          <Text component="br" />
          <Text component="hr" />
          <TableComposable variant={TableVariant.default}  aria-label="Tournaments Table">
            <Thead>
	          <Tr key="touraments_header">
	            <Th width={10}>Title</Th>
                <Th width={10}>Date Start</Th>
                <Th width={10}>Date End</Th>
                <Th width={20}>Description</Th>
                <Th width={20}>Details</Th>
                <Th width={10}>Divisions</Th>
                <Th width={10}>Tournament Image</Th>
                <Th width={10}>Registration URL</Th>
                </Tr>
	          </Thead>
            <Tbody>
              {!loading && tournamentData?.data.length === 0 && (
                <Tr key="tournamentEmptyState">
                  <Td colSpan={4}>
                    <Bullseye>
                      <EmptyState variant={EmptyStateVariant.small}>
                        <EmptyStateIcon icon={SearchIcon} />
                        <Title headingLevel="h2" size="lg">
                          No Tournment information retrieved!
                        </Title>
                        <EmptyStateBody>
                          Check your network connection or contact the system administrator.
                        </EmptyStateBody>
                      </EmptyState>
                    </Bullseye>
                  </Td>
                </Tr>
              )}
 	            {!loading && tournamentData?.data.map((row, index) => (
                <Tr key={"tournamentData" + index} isEditable>
                  <Td dataLabel="title">{row.title}</Td>
                  <Td dataLabel="dateStart">{row.dateStart}</Td>
                  <Td dataLabel="dateEnd">{row.dateEnd}</Td>
                  <Td dataLabel="description">{row.description}</Td>
                  <Td dataLabel="details">{row.details}</Td>
                  <Td dataLabel="divisions">{row.divisions}</Td>
                  <Td dataLabel="tourneyImg">{row.tourneyImg}</Td>
                  <Td dataLabel="registrationURL">{row.registerURL}</Td>
                </Tr>
              ))}
	            {loading && (
                <Tr key="tournament_loading">
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

export default AdminTournamentsTable;

