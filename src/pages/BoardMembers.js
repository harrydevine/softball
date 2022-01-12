import ReactDOM from 'react-dom';

import React from 'react';
import ContactCard from "./ContactCard";
import contacts from "./contacts";

function createCard(contact) {
  return (
    <ContactCard
      key={contact.id}
      name={contact.name}
      image={contact.imgURL}
      tel={contact.phone}
      email={contact.email}
      title={contact.title}
    />
  );
}

class BoardMembers extends React.Component {

  render() {
    return (
	<div>
	  <h1 className="heading">2022 Board Members</h1>
	  {contacts.map(createCard)}
	</div>
    );
  }
}

export default BoardMembers;

