import React from 'react';
import {
  Banner,
  Bullseye,
  Spinner,
  Text,
  TextContent
} from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

class BoardMinutes extends React.Component {
  constructor(props) {
    super(props);
//    const [data,setData]=useState([]);
    this.state = {
      res: []
    };
  }

  getMeetings=()=>{
    fetch('meetings.json',
    {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    ).then(function(response){
      console.log(response);
      return response.json();
    }).then(function(myJson) {
      console.log(myJson);
      this.setState({ res: myJson })
//      setData(myJson);
    });
  }
  
  getMeetingData() {
    this.getMeetings();
  }

  render() {
    const { res } = this.state;
    const rows = [
      {
        heightAuto: true,
	cells: [
          {
            props: { colSpan: 2 },
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

