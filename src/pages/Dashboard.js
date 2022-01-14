import React from 'react';
import {
  Banner,
  Card,
  CardBody,
  CardTitle
} from '@patternfly/react-core';

class Dashboard extends React.Component {

  render() {
    return (
      <div>
	<Banner variant="info">Latest News</Banner>
        <Card isSelectable>
          <CardTitle><u>Spring 2022 Signups!</u></CardTitle>
          <CardBody>Click <a href="https://ehtsoftballbaberuth.sportssignup.com/site/" target="_blank" rel="noreferrer">here</a> to sign up for the 2022 Spring season!</CardBody>
        </Card>
	<Card isSelectable>
          <CardTitle><u>Next Board Meeting</u></CardTitle>
          <CardBody>Date: February 20, 2022 </CardBody>
          <CardBody>Time: 6:00PM </CardBody>
          <CardBody>Location: EHT Softball Complex, 31 Idlewood Ave, Egg Harbor Twp NJ 08234 </CardBody>	    
	</Card>
        <Banner>Who we are</Banner>
        <Card isSelectable>
          <CardBody>
            Egg Harbor Township Youth Softball is proud of it's 6-16U EHT Tornadoes Recreational League. EHT has a long heritage of championship recreational Babe Ruth All-Star teams, winning numerous titles at all age levels. EHT Youth Softball is open to all EHT girls from ages 5-17. You must be a resident of EHT to join our recreation program.  A regular season schedule is played week nights from April through June culminating in an ABRSL league Championship. From June through July, the All-star teams play in District, State, and Regional tournaments leading up to the Babe Ruth World Series.<br /><br />
From September through November, EHTYS hosts a Fall softball league, where all games are played here at the Child's Kirk Memorial Park in EHT on Sundays. This is the perfect opportunity to take advantage for next level preparation, or simply to stay on top of your game for the next spring season. There are no standings kept, no playoffs, and no pressure. It's also the best time to introduce any new player to the wonderful game of softball!
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Dashboard;

