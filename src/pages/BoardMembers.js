import React, { useEffect } from 'react';
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
  Gallery,
  GalleryItem,
  Spinner,
  Title,
  TitleSizes
} from '@patternfly/react-core';

const BoardMembers = ({ children }) => {
  const [boardData, setBoardData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
  // Fetch data for Board Members
    fetch(`https://softball-pi4/board`)
      .then(async resp => {
        const jsonResponse = await resp.json()
        setBoardData(jsonResponse);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      })
    }, []);

  return (
    <div>
      {loading && (
        <Bullseye>
          <Spinner size="xl" />
        </Bullseye>
      )}
      <Title headingLevel="h1" size={TitleSizes['4xl']}>{(new Date().getFullYear())} Board Members</Title>
      <Gallery 
        hasGutter
        minWidths={{
          default: '100%',
          md: '100px',
          xl: '500px'
        }}
        maxWidths={{
          md: '750px',
          xl: '1fr'
        }}              
      >
        {boardData?.data.map((board) => (
          <GalleryItem key={board.id}>
            <Card isSelectable>
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

export default BoardMembers;

