import React from 'react';
import {
  Banner,
  Title
} from '@patternfly/react-core';

class Tournaments extends React.Component {

  render() {
    return (
      <div>
	<Banner variant="info">EHT 2022 Tournaments</Banner>
        <Title headingLevel="h1" size="2x1">
	  Coming Soon!
	</Title>
      </div>
    );
  }
}

export default Tournaments;

