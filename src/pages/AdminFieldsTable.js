import React from 'react';
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
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';

class AdminBoardMemberTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldData: [],
      loading: true,
      err: []
    };
  };

  componentDidMount() {
    this.fetchFieldInfo();
  }

  // Fetch field data
  fetchFieldInfo() {
    this.setState({ loading: true });

    fetch("http://192.168.1.21:8081/fields")
      .then(resp => resp.json())
      .then(resp => this.setState({fieldData: resp, loading: false}))
      .catch(err => this.setState({err: err, loading: false}));
  }

  render() {
    const {fieldData, loading, error} = this.state;

    return (
      <React.Fragment>
        <AdminFieldsModal />
        <Text component="br" />
        <Text component="br" />
        <Text component="hr" />
        <TableComposable variant={TableVariant.default}  aria-label="Fields Table">
          <Thead>
	        <Tr>
	          <Th width={20}>Field Number</Th>
	          <Th width={30}>Field Status</Th>
            <Th width={50}>Field Reason</Th>
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
              <Tr key={row.id} isEditable>
                <Td dataLabel="fieldNum">{row.fieldNum}</Td>
                <Td dataLabel="fieldStatus">{row.fieldStatus}</Td>
                <Td dataLabel="fieldReason">{row.fieldReason}</Td>
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

