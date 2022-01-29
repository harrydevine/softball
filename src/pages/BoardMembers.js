import React from 'react';
import {
  Bullseye,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  Flex,
  FlexItem,
  Gallery,
  GalleryItem,
  Spinner,
  Title
} from '@patternfly/react-core';

class BoardMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    this.fetchBoard();
  }

  fetchBoard() {
    this.setState({ loading: true });

    // Fetch data for Upcoming Meetings
    fetch(`http://softball-pi4:3000/board.json`)
      .then(resp => resp.json())
      .then(resp => this.setState({ data: resp, loading: false }))
      .catch(err => this.setState({ error: err, loading: false }));
  }

  render() {
    const {data, loading, error} = this.state;
    console.log({data, loading, error});
    return (
	<div>
	  <Gallery hasGutter>
	  {data.map((board) => (
	  <GalleryItem>
              <Card isSelectable key={board.id}>
  	      <CardTitle>
  	        <Title headingLevel="h2" size="xl" className="board_member_title">{board.title}</Title>
	      </CardTitle>
	      <CardHeader className="board_member_name">{board.name}</CardHeader>
	      <CardBody className="board_member_description">
	        <DescriptionList>
	          <DescriptionListGroup>
	            <DescriptionListTerm>Phone</DescriptionListTerm>
	            <DescriptionListDescription>{board.phone}</DescriptionListDescription>
	          </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Email Address</DescriptionListTerm>
                    <DescriptionListDescription>{board.email}</DescriptionListDescription>
                  </DescriptionListGroup>
	        </DescriptionList>
	      </CardBody>
	    </Card>
          </GalleryItem>
	      ))}
      </Gallery>
      </div>
    );
  }
}

export default BoardMembers;

