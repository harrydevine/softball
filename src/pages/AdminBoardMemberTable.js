import React from 'react';
import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateVariant,
  EmptyStateBody,
  EmptyStateIcon,
  Spinner,
  Title
} from '@patternfly/react-core';
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';

class AdminBoardMemberTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: [],
      loading: true,
      err: []
    };
  };

  componentDidMount() {
    this.fetchBoardMembers();
  }

  // Fetch data for Upcoming Meetings
  fetchBoardMembers() {
    this.setState({ loading: true });

    fetch("http://192.168.1.21:8081/board")
      .then(resp => resp.json())
      .then(resp => this.setState({boardData: resp, loading: false}))
      .catch(err => this.setState({err: err, loading: false}));
  }

  handleAddBMButton () {
    console.log("Add new BM button clicked");
  }

  render() {
    const {boardData, loading, error} = this.state;

    return (
      <React.Fragment>
        <TableComposable variant={TableVariant.default}  aria-label="Board Members Table">
          <Thead>
	    <Tr>
	      <Th width={25}>Name</Th>
	      <Th width={25}>Title</Th>
              <Th width={25}>Phone</Th>
	      <Th width={25}>Email</Th>
	    </Tr>
	  </Thead>
          <Tbody>
            {!loading && boardData?.data.length === 0 && (
              <Tr key="0">
                <Td colSpan={4}>
                  <Bullseye>
                    <EmptyState variant={EmptyStateVariant.small}>
                      <EmptyStateIcon icon={SearchIcon} />
                      <Title headingLevel="h2" size="lg">
                        No Board Member information retrieved!
                      </Title>
                      <EmptyStateBody>
                        Check your network connection or contact the system administrator.
                      </EmptyStateBody>
                    </EmptyState>
                  </Bullseye>
                </Td>
              </Tr>
            )}
	    {!loading && boardData?.data.map(row => (
              <Tr key={row.id} isEditable>
                <Td dataLabel="Name">{row.name}</Td>
                <Td dataLabel="Title">{row.title}</Td>
                <Td dataLabel="Phone">{row.phone}</Td>
                <Td dataLabel="Email">{row.email}</Td>
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

export default AdminBoardMemberTable;

