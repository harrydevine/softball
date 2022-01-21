import React from 'react';
import {
  Banner,
  Bullseye,
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Spinner,
  Text,
  TextContent,
  Title
} from '@patternfly/react-core';
import { Thead, TableComposable, Tr, Th, Tbody, Td} from '@patternfly/react-table';

class BoardMinutes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      upRes: [],
      upLoading: true,
      upErr: false,
      upError: null,
      mtgRes: [],
      mtgLoading: true,
      mtgErr: false,
      mtgError: null
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    this.setState({ upLoading: true, mtgLoading: true });

    // Fetch data for Upcoming Meetings
    fetch(`http://softball-pi4:3000/meetings.json`)
      .then(resp => resp.json())
      .then(resp => this.setState({ upRes: resp, upLoading: false }))
      .catch(err => this.setState({ upError: err, upLoading: false, upErr: true }));

    // Fetch data for Previous Meeting Minutes
    fetch(`http://softball-pi4:3000/minutes.json`)
      .then(resp => resp.json())
      .then(resp => this.setState({ mtgRes: resp, mtgLoading: false }))
      .catch(err => this.setState({ mtgError: err, mtgLoading: false, mtgErr: true }));

  }

  render() {
    const {upRes, upLoading, upErr, upError} = this.state;
    const {mtgRes, mtgLoading, mtgErr, mtgError} = this.state;

    return (
      <React.Fragment>
        <div>
          <TextContent>
            <Text component="h1">Board Meetings</Text>
            <Text component="h2">
              Board meetings will take place at the Field House at Childs-Kirk Memorial Park, located at 31 Idlewood Ave.  Meetings will usually take place at 6:30pm on the 3rd Sunday of the month, unless the board members schedule a meeting for a month to take place at another time.
            </Text>
            <Text component="hr" />
          </TextContent>
          <Banner variant="info">Upcoming Meetings</Banner>

          <TableComposable
            aria-label="Board Meeting Dates"
          >
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!upLoading && upRes.map(post => (
                <Tr key={post.id}>
                  <Td dataLabel="Date">{post.date}</Td>
                  <Td dataLabel="Time">{post.time}</Td>
                </Tr>
              ))}
              {upLoading && (
                <Tr>
                  <Td colSpan={2}>
                    <Bullseye>
                      <Spinner size="xl" />
                    </Bullseye>
                  </Td>
                </Tr>
              )}
              {upErr && (
                <Tr>
                  <Td colSpan={2}>
                    <EmptyState variant={EmptyStateVariant.small}>
                      <Title headingLevel="h2" size="lg">
                        Unable to connect
                      </Title>
                      <EmptyStateBody>
                        There was an error retrieving data.  Check your connection and reload the page.
                      </EmptyStateBody>
                    </EmptyState>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </TableComposable>

          <Banner variant="info">Previous Meeting Minutes</Banner>
          <TableComposable
            aria-label="Board Meeting minutes"
          >
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Minutes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!mtgLoading && mtgRes.map(post => (
                <Tr key={post.id}>
                  <Td dataLabel="Date">{post.date}</Td>
                    <Td dataLabel="Minutes">
		      {post.link && (<a href={`${post.link}`} target="_blank">Minutes for {post.date}</a>)}
		      {!post.link && `No minutes exist for ${post.date}`}
		    </Td>
                </Tr>
              ))}
              {mtgLoading && (
                <Tr>
                  <Td colSpan={2}>
                    <Bullseye>
                      <Spinner size="xl" />
                    </Bullseye>
                  </Td>
                </Tr>
              )}
              {mtgErr && (
                <Tr>
                  <Td colSpan={2}>
                    <EmptyState variant={EmptyStateVariant.small}>
                      <Title headingLevel="h2" size="lg">
		        Unable to connect
		      </Title>
		      <EmptyStateBody>
		        There was an error retrieving data.  Check your connection and reload the page.
		      </EmptyStateBody>
                    </EmptyState>
                  </Td>
                </Tr>
              )}
	    </Tbody>
          </TableComposable>
        </div>
      </React.Fragment>
    );
  }
}

export default BoardMinutes;

