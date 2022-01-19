import React from 'react';
import {
  Banner,
  Bullseye,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Spinner,
  Text,
  TextContent,
  Title
} from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from 'react-query'

const queryClient = new QueryClient();

function MeetingData() {
  constructor(props) {
    super(props);
    this.state = {
      res: []
    };
  };

  const rows = 0;
  const {isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch("http://localhost/meetings.json").then((res) => res.json())
  );

  if (isLoading) return <Spinner size="xl" />
  if (error) {
   return (
     rows = [
        {
          heightAuto: true,
          cells: [
            {
              props: { colSpan: 2 },
              title: (
                <EmptyState variant={EmptyStateVariant.small}>
                  <Title headingLevel="h2" size="lg">
                    Unable to connect
                  </Title>
                  <EmptyStateBody>
                    There was an error retrieving data. Check your connection and reload the page.
                  </EmptyStateBody>
                </EmptyState>
              )
            }
          ]
        }
      ] 
    )
  }

  return (
    rows = {res.map(post => [post.date, post.time])}
  );
}

class BoardMinutes extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <MeetingData />
      </QueryClientProvider>

	<div>
	  <TextContent>
	    <Text component="h1">Board Meetings</Text>
	    <Text component="h2">
	      Board meetings will take place at the Field House at Childs-Kirk Memorial Park, located at 31 Idlewood Ave.  Meetings will usually take place at 6:30pm on the 3rd Sunday of the month, unless the board members schedule a meeting for a month to take place at another time.
	    </Text>
	    <Text component="hr" />
	  </TextContent>
          <Banner variant="info">Upcoming Meetings</Banner>
          <Table
            cells={['Date','Time']}
	    rows={res.map(post => [post.date, post.time])}
            aria-label="Board Meeting Dates"
          >
            <TableHeader />
            <TableBody />
          </Table>
          <Banner variant="info">Previous Meeting Minutes</Banner>	    
          <QueryClientProvider client={queryClient}>
            <MeetingData />
          </QueryClientProvider>
	  <Table
	    cells={['Date','Minutes']}
	    rows={rows}
	    aria-label="Board Meeting Minutes"
	  >
            <TableHeader />
            <TableBody />
          </Table>
	</div>
    );
  }
}

export default BoardMinutes;

