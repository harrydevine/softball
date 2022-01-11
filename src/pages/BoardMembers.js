import ReactDOM from 'react-dom';

import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  PageSection
} from '@patternfly/react-core';

class BoardMembers extends React.Component {

  render() {
    return (
	<div>
          <Card>
            <CardTitle>Board Members</CardTitle>
            <CardBody> Board Members should go here!</CardBody>
          </Card>
	</div>
    );
  }
}

export default BoardMembers;

