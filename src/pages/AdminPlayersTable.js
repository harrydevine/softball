import React, { useEffect } from 'react';
import {
  Bullseye,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateVariant,
  Spinner,
  Text,
  Title
} from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td, Caption} from '@patternfly/react-table';
import AdminPlayerModal from './AdminPlayerModal';

const AdminPlayersTable = ({ children }) => {
  const [playerData, setPlayerData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);
  const columnNames = {
    playerName: 'Name',
    playerNumber: 'Jersey Number',
    division: 'Division'
  };
  const [activeSortIndex, setActiveSortIndex] = React.useState(0);
  const [activeSortDirection, setActiveSortDirection] = React.useState('asc');
  const getSortableRowValues = players => {
    const {playerName, playerNumber, division} = players;
    return [playerName, playerNumber, division];
  };

  if (playerData?.data.length > 0) {
    let sortedPlayers = playerData?.data;
    if (sortedPlayers !== null) {
      sortedPlayers = playerData?.data.sort((a, b) => {
        const aValue = getSortableRowValues(a)[activeSortIndex];
        const bValue = getSortableRowValues(b)[activeSortIndex];
        if ((aValue === null) || (bValue === null)) {
          return 0;
        }
        if (typeof aValue === 'number') {
          if (activeSortDirection === 'asc') {
            return aValue - bValue;
          }
          return bValue - aValue;
        } else {
          if (activeSortDirection === 'asc') {
            return aValue.localeCompare(bValue);
          }
          return bValue.localeCompare(aValue);
        }
      });
    }
  }

  const getSortParams = columnIndex => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex
  });

useEffect(() => {
  // Fetch data for Players
  fetch(`http://192.168.1.21:8081/players`)
    .then(async resp => {
      const jsonResponse = await resp.json()
      setPlayerData(jsonResponse);
      setLoading(false);
    })
    .catch(err => {
      setErr(err);
      setLoading(false);
    })
  }, []);

  return (
    <React.Fragment>
      <AdminPlayerModal />
      <Text component="br" />
      <Text component="br" />
      <Text component="hr" />
      <TableComposable variant={TableVariant.default}  aria-label="Players Table">
        <Caption>EHT Softball - Players</Caption>
        <Thead>
       <Tr>
          <Th sort={getSortParams(0)}>{columnNames.playerName}</Th>
          <Th sort={getSortParams(1)}>{columnNames.playerNumber}</Th>
          <Th sort={getSortParams(2)}>{columnNames.division}</Th>
       </Tr>
       </Thead>
        <Tbody>
          {!loading && playerData?.data.length === 0 && (
            <Tr key="0">
              <Td colSpan={4}>
                <Bullseye>
                  <EmptyState variant={EmptyStateVariant.small}>
                    <EmptyStateIcon icon={SearchIcon} />
                    <Title headingLevel="h2" size="lg">
                      No Player information retrieved!
                    </Title>
                    <EmptyStateBody>
                      Check your network connection or contact the system administrator.
                    </EmptyStateBody>
                  </EmptyState>
                </Bullseye>
              </Td>
            </Tr>
          )}
          {!loading && playerData?.data.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            <Td dataLabel={columnNames.name}>{row.playerName}</Td>
            <Td dataLabel={columnNames.jersey}>{row.playerNumber}</Td>
            <Td dataLabel={columnNames.division}>{row.division}</Td>
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
  );
}

export default AdminPlayersTable;

