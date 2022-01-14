import React from "react";
import {
  Card,
  CardBody,
  CardTitle
} from '@patternfly/react-core';

class FieldInfo extends React.Component {
  render() {
    return (
      <div>
	<Card>
	  <CardTitle>Field Information</CardTitle>
	  <CardBody>Field Information should go here!</CardBody>
	</Card>
      </div>
    );
  }
}

export default FieldInfo;

