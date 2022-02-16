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

class AdminLocalitiesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localityData: [],
      loading: true,
      err: []
    };
  };

  componentDidMount() {
    this.fetchLocalities();
  }

  // Fetch data for Localities
  fetchLocalities() {
    this.setState({ loading: true });

    fetch("http://192.168.1.21:8081/localities")
      .then(resp => resp.json())
      .then(resp => this.setState({localityData: resp, loading: false}))
      .catch(err => this.setState({err: err, loading: false}));
  }

  render() {
    const {localityData, loading, error} = this.state;

    return (
      <React.Fragment>
        <TableComposable variant={TableVariant.default}  aria-label="Localities Table">
          <Thead>
	        <Tr>
	          <Th width={10}>Name</Th>
	          <Th width={10}>Street</Th>
              <Th width={10}>City</Th>
              <Th width={5}>State</Th>
              <Th width={10}>Zip Code</Th>
              <Th width={15}>Latitude</Th>
              <Th width={15}>Longitude</Th>
              <Th width={25}>Description</Th>
	        </Tr>
	        </Thead>
            <Tbody>
            {!loading && localityData?.data.length === 0 && (
              <Tr key="0">
                <Td colSpan={4}>
                  <Bullseye>
                    <EmptyState variant={EmptyStateVariant.small}>
                      <EmptyStateIcon icon={SearchIcon} />
                      <Title headingLevel="h2" size="lg">
                        No Localities retrieved!
                      </Title>
                      <EmptyStateBody>
                        Check your network connection or contact the system administrator.
                      </EmptyStateBody>
                    </EmptyState>
                  </Bullseye>
                </Td>
              </Tr>
            )}
 	          {!loading && localityData?.data.map(row => (
              <Tr key={row.id} isEditable>
                <Td dataLabel="Name">{row.name}</Td>
                <Td dataLabel="Street">{row.street}</Td>
                <Td dataLabel="City">{row.city}</Td>
                <Td dataLabel="State">{row.state}</Td>
                <Td dataLabel="Zip Code">{row.zip}</Td>
                <Td dataLabel="Latitude">{row.lat}</Td>
                <Td dataLabel="Longitude">{row.lng}</Td>
                <Td dataLabel="Description">{row.description}</Td>
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

export default AdminLocalitiesTable;

