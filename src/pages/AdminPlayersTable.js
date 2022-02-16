import React from 'react';
import {
  Button,
  ButtonVariant,
  Bullseye,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  DropdownToggle,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  EmptyStateVariant,
  InputGroup,
  Select,
  SelectOption,
  SelectVariant,
  Spinner,
  TextInput,
  Title,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  ToolbarFilter,
  ToolbarToggleGroup,
  ToolbarGroup
} from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td} from '@patternfly/react-table';

class AdminPlayersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: [],
      loading: true,
      err: [],
      name: [],
      division: [],
    };
  };

  componentDidMount() {
    this.fetchPlayers();
  }

  // Fetch Player data
  fetchPlayers() {
    this.setState({ loading: true });

    fetch("http://192.168.1.21:8081/players")
      .then(resp => resp.json())
      .then(resp => this.setState({playerData: resp, loading: false}))
      .catch(err => this.setState({err: err, loading: false}));
  }

  render() {
    const { playerData, loading, err, name, division, activeSortIndex, activeSortDirection } = this.state;

    return (
      <React.Fragment>
        <TableComposable variant={TableVariant.default}  aria-label="Players Table">
          <Thead>
	        <Tr>
            <Th width={50}>Name</Th>
            <Th width={25}>Jersey Number</Th>
            <Th width={25}>Division</Th>
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
 	          {!loading && playerData?.data.map(row => (
              <Tr key={row.id} isEditable>
              <Td dataLabel="name">{row.playerName}</Td>
              <Td dataLabel="jersey">{row.playerNumber}</Td>
              <Td dataLabel="division">{row.division}</Td>
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
}

export default AdminPlayersTable;

