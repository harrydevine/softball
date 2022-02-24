import React, { useEffect } from 'react';
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

const BoardMinutes = ({ children }) => {
//  class BoardMinutes extends React.Component {
  const [mtgData, setMtgData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);
  const [minutesData, setMinutesData] = React.useState(null);
  const [minutesLoading, setMinutesLoading] = React.useState(true);
  const [minutesErr, setMinutesErr] = React.useState(null);

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

  useEffect(() => {
    fetch(`http://softball-pi4:3000/minutes.json`)
    .then(async resp => {
      const jsonResponse = await resp.json()
      setMinutesData(jsonResponse);
      setMinutesLoading(false);
    })
    .catch(err => {
      setMinutesErr(err);
      setMinutesLoading(false);
    })
  }, []);

/*  constructor(props) {
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
*/
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
              {!loading && mtgData?.data.map(row => (
                <Tr key={row.id}>
                  <Td dataLabel="Date">{row.date}</Td>
                  <Td dataLabel="Time">{row.time}</Td>
                </Tr>
              ))}
              {loading && (
                <Tr>
                  <Td colSpan={2}>
                    <Bullseye>
                      <Spinner size="xl" />
                    </Bullseye>
                  </Td>
                </Tr>
              )}
              {!loading && mtgData?.data.length === 0 && (
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
              {!minutesLoading && minutesData.map(post => (
                <Tr key={post.id}>
                  <Td dataLabel="Date">{post.date}</Td>
                  <Td dataLabel="Minutes">
		                {post.link && (<a href={`${post.link}`} target="_blank" rel="noreferrer">Minutes for {post.date}</a>)}
		                {!post.link && `No minutes exist for ${post.date}`}
		              </Td>
                </Tr>
              ))}
              {minutesLoading && (
                <Tr>
                  <Td colSpan={2}>
                    <Bullseye>
                      <Spinner size="xl" />
                    </Bullseye>
                  </Td>
                </Tr>
              )}
              {minutesErr && (
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
//  }
}

export default BoardMinutes;

