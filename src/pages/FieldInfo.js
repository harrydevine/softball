import React, { useState, useEffect } from "react";
import {
    Card,
    CardFooter,
    CardHeader,
    CardBody,
    Flex,
    FlexItem,
    Label,
    Level,
    LevelItem,
    List,
    ListItem,
    PageSection,
    PageSectionVariants,
    Tabs,
    Tab,
    TabContent,
    TabContentBody,
    TabTitleText,
    Text,
    Title
} from '@patternfly/react-core';
import SoftballGoogleMaps from './GoogleMaps';
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import ArrowUpIcon from '@patternfly/react-icons/dist/js/icons/arrow-up-icon';
import ArrowDownIcon from '@patternfly/react-icons/dist/js/icons/arrow-down-icon';

const FieldInfo = ({ children }) => {
    const [activeTabKey, setActiveTabKey] = React.useState(0);
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
      // Fetch data for Upcoming Meetings
      fetch(`http://softball-pi4:3000/fields.json`)
        .then(resp => {
           setData(resp.json());
           setLoading(false);
        })
        .catch(err => {
          setError(err); 
          setLoading(false);
	});
    }, []);

    console.log({data, loading, error});

    // Toggle currently active tab
    const handleTabClick = (event, tabIndex) => {
      setActiveTabKey(tabIndex);
    };

      return (
      <div>
        <PageSection isWidthLimited variant={PageSectionVariants.light}>
          <Flex
            spaceItems={{ default: 'spaceItemsMd' }}
            alignItems={{ default: 'alignItemsFlexStart' }}
            flexWrap={{ default: 'noWrap' }}
          >
            <FlexItem>
              <Title headingLevel="h1" size="2xl">
                EHT Softball Complex - Field Information
              </Title>
            </FlexItem>
            <FlexItem flex={{ default: 'flexNone' }}>
              <Label color="orange" icon={<CheckCircleIcon />}>Partial</Label>
            </FlexItem>
          </Flex>
        </PageSection>
        <PageSection type="tabs" variant={PageSectionVariants.light} isWidthLimited>
          <Tabs activeKey={activeTabKey} onSelect={handleTabClick} usePageInsets id="field-tabs-list">
            <Tab eventKey={0} title={<TabTitleText>Status</TabTitleText>} tabContentId={`tabContent${0}`} />
            <Tab eventKey={1} title={<TabTitleText>Directions</TabTitleText>} tabContentId={`tabContent${1}`} />
            <Tab eventKey={2} title={<TabTitleText>Current Field Schedule</TabTitleText>} tabContentId={`tabContent${2}`} />
          </Tabs>
        </PageSection>
        <PageSection isWidthLimited variant={PageSectionVariants.light}>
          <TabContent key={0} eventKey={0} id={`tabContent${0}`} activeKey={activeTabKey} hidden={0 !== activeTabKey}>
            <TabContentBody>
	      <Level>
	        <LevelItem>
	          <Card>
	            <CardHeader>Field 1</CardHeader>
	            <CardBody>
                      <ArrowUpIcon color="green" style={{ height: '50px' }} />
	            </CardBody>
                    <CardFooter>Open</CardFooter>
	          </Card>
	        </LevelItem>
                <LevelItem>
                  <Card>
                    <CardHeader>Field 2</CardHeader>
                    <CardBody>
                      <ArrowUpIcon color="green" style={{ height: '50px' }} />
                    </CardBody>
                    <CardFooter>Open</CardFooter>
                  </Card>
                </LevelItem>
                <LevelItem>
                  <Card>
                    <CardHeader>Field 3</CardHeader>
                    <CardBody>
                      <ArrowUpIcon color="green" style={{ height: '50px' }} />
                    </CardBody>
                    <CardFooter>Open</CardFooter>
                  </Card>
                </LevelItem>
                <LevelItem>
                  <Card>
                    <CardHeader>Field 4</CardHeader>
                    <CardBody>
                      <ArrowUpIcon color="green" style={{ height: '50px' }} />
                    </CardBody>
                    <CardFooter>Open</CardFooter>
                  </Card>
                </LevelItem>
                <LevelItem>
                  <Card>
                    <CardHeader>Field 5</CardHeader>
                    <CardBody>
                      <ArrowUpIcon color="green" style={{ height: '50px' }} />
                    </CardBody>
                    <CardFooter>Open</CardFooter>
                  </Card>
                </LevelItem>
                <LevelItem>
                  <Card>
                    <CardHeader>Field 6</CardHeader>
                    <CardBody>
                      <ArrowUpIcon color="green" style={{ height: '50px' }} />
                    </CardBody>
                    <CardFooter>Open</CardFooter>
                  </Card>
                </LevelItem>
                <LevelItem>
                  <Card>
                    <CardHeader>Field 7</CardHeader>
                    <CardBody>
                      <ArrowDownIcon color="red" style={{ height: '50px' }} />
                    </CardBody>
                    <CardFooter>Closed (Maintenance)</CardFooter>
                  </Card>
                </LevelItem>
	      </Level>
              <Text>{"\n\n\n"}</Text>
	      <Text component="hr" />
	      <Text component="center">
                <img src="/eht_fields.png" alt="EHT Field Map" height="500" width="500" />  
	      </Text>
	    </TabContentBody>
          </TabContent>
          <TabContent key={1} eventKey={1} id={`tabContent${1}`} activeKey={activeTabKey} hidden={1 !== activeTabKey}>
            <TabContentBody>
	      <Flex direction={{ default: 'column' }}>
	        <FlexItem>
	          <Card>
	            <CardHeader>
	              <Title headingLevel="h1" size="lg">Egg Harbor Township</Title>
	            </CardHeader>
	            <CardBody>
	              Childs Kirk Memorial Park
	              31 Idlewood Ave.
	              Egg Harbor Township, NJ 08234
	              <SoftballGoogleMaps center={{ lat: 39.41159, lng: -74.55954 }} />

	              A 7-field softball complex with 2 lighted fields (1 and 5).  Complete with a fully stocked concession stand, restrooms, and ample parking onsite.  Located close to the Garden State Parkway, Atlantic City Expressway, and the Black Horse Pike (Route 322).

	              <List isPlain>
	                <ListItem>Fields 1 & 5: host games for the 14u and 16u Divisions</ListItem>
	                <ListItem>Fields 6 & 7: host games for the 12u Division</ListItem>
	                <ListItem>Fields 2 & 3: host games for the 10u Division</ListItem>
	                <ListItem>Fields 2, 3, & 4: host games for the 8u Division</ListItem>
	                <ListItem>Field 4: host games for the 6u Division</ListItem>
	              </List>
	            </CardBody>
	            <CardFooter>
	              Directions: From Tilton Road, turn down Idlewood Ave and continue heading straight after the stop sign to enter the complex parking lot.  The first lot, located on the right, is used for fields 1, 3, and 4.  If this lot is full, drive up to the fence and park in the lot on the left.  Fields 2, 5, 6, and 7 also have parking in front of the snack stand.
	            </CardFooter>
	          </Card>
	        </FlexItem>
                <FlexItem>
                  <Card>
                    <CardHeader>
	              <Title headingLevel="h1" size="lg">Folsom Borough Fields</Title>
	            </CardHeader>
                    <CardBody>
                      1700 12th Street
                      Hammonton, NJ 08037
	              <SoftballGoogleMaps center={{ lat: 39.60161, lng: -74.84462 }} />
	            </CardBody>
                    <CardFooter>
                      Directions: This field sits behind the Municipal Building on Route 54.  Head west on Mays Landing Road (from Route 322 West).  Take a left on Route 54 and the Municipal Building is on the right.
                    </CardFooter>
                  </Card>
                </FlexItem>
                <FlexItem>
                  <Card>
                    <CardHeader>
	              <Title headingLevel="h1" size="lg">Folsom 13th Street Fields</Title>
	            </CardHeader>
                    <CardBody>
                      13th Street
                      Folsom, NJ 08094
	              <SoftballGoogleMaps center={{ lat: 39.60547, lng: -74.85163 }} />
                    </CardBody>
                    <CardFooter>
                      Directions: Turn onto Mays Landing Road from Route 54.  Make first left onto 13th street.  Field is located on the corner.
                    </CardFooter>
                  </Card>
                </FlexItem>
                <FlexItem>
                  <Card>
                    <CardHeader>
	              <Title headingLevel="h1" size="lg">Galloway Fields</Title>
	            </CardHeader>
                    <CardBody>
                      W. Duerer Street and S. Zurich Ave.
                      Absecon, NJ 08205
	              <SoftballGoogleMaps center={{ lat: 39.48614, lng: -74.56184 }} />
                    </CardBody>
                    <CardFooter>
                      Fields 1 -5 and T-Ball
                    </CardFooter>
                  </Card>
                </FlexItem>
                <FlexItem>
                  <Card>
                    <CardHeader>
	              <Title headingLevel="h1" size="lg">Mullica Fields</Title>
	            </CardHeader>
                    <CardBody>
                      1501 Elwood Road
                      Mullica Township, NJ 08037
	              <SoftballGoogleMaps center={{ lat: 39.59397, lng: -74.69057 }} />
                    </CardBody>
                    <CardFooter>
                      Fields 1 and 3 are used for softball.
                    </CardFooter>
                  </Card>
                </FlexItem>
                <FlexItem>
                  <Card>
                    <CardHeader>
	              <Title headingLevel="h1" size="lg">Mays Landing Fields</Title>
	            </CardHeader>
                    <CardBody>
                      1 Old Egg Harbor Road
                      Mays Landing, NJ 08330
	              <SoftballGoogleMaps center={{ lat: 39.45249, lng: -74.71952 }} />
                    </CardBody>
                    <CardFooter>
                      Mays Landing Underhill Field is the location for all 6u games ONLY.
                    </CardFooter>
                  </Card>
                </FlexItem>
                <FlexItem>
                  <Card>
                    <CardHeader>
	              <Title headingLevel="h1" size="lg">Mays Landing Fields 3 and 4</Title>
	            </CardHeader>
                    <CardBody>
                      3155 Leipzig Ave.
                      Mays Landing, NJ 08030
	              <SoftballGoogleMaps center={{ lat: 39.48418, lng: -74.62307 }} />
                    </CardBody>
                  </Card>
                </FlexItem>
                <FlexItem>
                  <Card>
                    <CardHeader>
	              <Title headingLevel="h1" size="lg">Ventor Fields</Title>
	            </CardHeader>
                    <CardBody>
                      401 N. Surrey Ave
                      Ventnor, NJ 08406
	              <SoftballGoogleMaps center={{ lat: 39.34776, lng: -74.47846 }} />
                    </CardBody>
                  </Card>
                </FlexItem>
	      </Flex>
	    </TabContentBody>
          </TabContent>
          <TabContent key={2} eventKey={2} id={`tabContent${2}`} activeKey={activeTabKey} hidden={2 !== activeTabKey}>
            <TabContentBody>
	    </TabContentBody>
          </TabContent>
        </PageSection>
      </div>
    );
}

export default FieldInfo;
