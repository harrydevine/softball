import React from 'react';
import {
  Banner, Bullseye, Spinner,
  Text,
  TextContent,
} from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

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

    const loadingRows = [
      {
        heightAuto: true,
        cells: [
          {
            props: { colSpan: 8 },
            title: (
              <Bullseye>
                <Spinner size="xl" />
              </Bullseye>
            )
          }
        ]
      }
    ];
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
          {loading && (
            <Table cells={['Date', 'Time']} rows={loadingRows} aria-label="Board Meeting Dates">
              <TableHeader />
              <TableBody />
            </Table>
          )}
          {!loading && !error && (
            <Table
              cells={['Date','Time']}
              rows={res.map(post => [post.id, post.time])}
              aria-label="Board Meeting Dates"
            >
              <TableHeader />
              <TableBody />
            </Table>
          )}
          <Banner variant="info">Previous Meeting Minutes</Banner>
          {loading && (
            <Table cells={['Date', 'Minutes']} rows={loadingRows} aria-label="Board Meeting minutes">
              <TableHeader />
              <TableBody />
            </Table>
          )}
          {!loading && !error && (
            <Table
              cells={['Date','Minutes']}
              rows={res.map(post => [post.id, post.date])}
              aria-label="Board Meeting Minutes"
            >
              <TableHeader />
              <TableBody />
            </Table>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default BoardMinutes;

