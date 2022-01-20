import React from 'react';
import {
  Banner,
  Text,
  TextContent,
  Bullseye,
  Spinner,
} from '@patternfly/react-core';
import { Thead, TableComposable, Tr, Th, Tbody, Td} from '@patternfly/react-table';

class BoardMinutes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      res: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    this.setState({ loading: true });
    fetch(`http://localhost:3000/meetings.json`)
      .then(resp => resp.json())
      .then(resp => this.setState({ res: resp, loading: false }))
      .catch(err => this.setState({ error: err, loading: false }));
  }

  render() {
    const {res, loading, error} = this.state;

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
              {!loading && res.map(post => (
                <Tr key={post.id}>
                  <Td dataLabel="Date">{post.id}</Td>
                  <Td dataLabel="Time">{post.time}</Td>
                </Tr>
              ))}
              {loading && (
                <Tr>
                  <Td colspan={2}>
                    <Bullseye>
                      <Spinner size="xl" />
                    </Bullseye>
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
              {!loading && res.map(post => (
                <Tr key={post.id}>
                  <Td dataLabel="Date">{post.id}</Td>
                  <Td dataLabel="Minutes"><a href={`/fakeurlminutes${post.id}.com`}>{post.date}</a></Td>
                </Tr>
              ))}
              {loading && (
                <Tr>
                  <Td colspan={2}>
                    <Bullseye>
                      <Spinner size="xl" />
                    </Bullseye>
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

