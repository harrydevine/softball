import React from 'react';
import {
  Gallery,
  GalleryItem,
  Title,
  TitleSizes
} from '@patternfly/react-core';

class Tournaments extends React.Component {

  render() {
    return (
      <div>
        <React.Fragment>
          <Title headingLevel="h1" size={TitleSizes['4xl']}>2022 Tournament Schedule</Title>
          <Gallery 
	    hasGutter 
	    gutter='lg'
	    minWidths={{
              md: '100px',
              lg: '150px',
              xl: '200px',
              '2xl': '300px'
            }}
	  >
           <GalleryItem><img src='/images/Swing_into_Spring.jpg' alt='Swing Into Spring' /></GalleryItem>
           <GalleryItem><img src='/images/MAY_MAHEM.jpg' alt='May Mayhem' /></GalleryItem>
           <GalleryItem><img src='/images/Summer_Frenzy.jpg' alt='Summer Frenzy' /></GalleryItem>
          </Gallery>
        </React.Fragment>
      </div>
    );
  }
}

export default Tournaments;

