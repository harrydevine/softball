import React, { useEffect } from "react";
import {
  Bullseye,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  Flex,
  FlexItem,
  Gallery,
  GalleryItem,
  Label,
  Level,
  LevelItem,
  PageSection,
  PageSectionVariants,
  Spinner,
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
    const [fieldData, setFieldData] = React.useState(null);
    const [localityData, setLocalityData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
      // Fetch data for Field Status
      fetch("http://192.168.1.21:8081/fields")
        .then(async (resp) => {
           const jsonResponse = await resp.json();
           setFieldData(jsonResponse);
           setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
     }, []);
	
     useEffect(() => {
      // Fetch data for Locality locations
      fetch("http://192.168.1.21:8081/localities")
        .then(async (resp) => {
           const jsonResponse = await resp.json();
           setLocalityData(jsonResponse);
           setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
     }, []);

     /* Determine the field status and color for presentation */
     let count = 0;
     let fieldStatus = "Open";
     let statusColor = "green";
     if (fieldData?.data.length > 0) {
       fieldData.data.map((field) => {
         if (field.fieldStatus === 0) {
           count++;
         }
       });
     }
     if (count > 0 && count < 7) {
       fieldStatus = "Partial"
       statusColor = "orange"
     }
     if (count === 7) {
       fieldStatus = "Closed"
       statusColor = "red"	       
     }

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
                <Label color={statusColor}  icon={<CheckCircleIcon />}>{fieldStatus}</Label>
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
	              {loading && (
                  <Bullseye>
                    <Spinner size="xl" />
                  </Bullseye>
                )}
                {Array.isArray(fieldData?.data) && fieldData?.data.map((field) => (
	                <LevelItem key={field.id}>
	                  <Card key={"field"+field.fieldNum}>
                    <CardHeader>Field {field.fieldNum}</CardHeader>
                      {field.fieldStatus === 1 && (
                      <CardBody>
		                    <ArrowUpIcon color="green" style={{ height: '50px' }} />
			                    Open
                          <Text component="br" />
                            {field.fieldReason}				
                      </CardBody>
                      )}
                      {field.fieldStatus === 0 && (
                      <CardBody>
                        <ArrowDownIcon color="red" style={{ height: '50px' }} />
			                  Closed
                        <Text component="br" />
			                  {field.fieldReason}
                      </CardBody>
                      )}
	                  </Card>
	                </LevelItem>
		            ))}
	            </Level>
              <Text>{"\n\n\n"}</Text>
	            <Text component="hr" />
	            <Text component="center">
                <img src="/images/eht_fields.png" alt="EHT Field Map" height="500" width="500" />  
	            </Text>
	          </TabContentBody>
          </TabContent>
          <TabContent key={1} eventKey={1} id={`tabContent${1}`} activeKey={activeTabKey} hidden={1 !== activeTabKey}>
            <TabContentBody>
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
                {Array.isArray(localityData?.data) && localityData?.data.map((locality) => (
                <GalleryItem key={"locality"+locality.id}>
                  <Card key={locality.id}>
	                  <CardHeader>
	                    <Title headingLevel="h1" size="lg">{locality.name}</Title>
	                  </CardHeader>
	                  <CardBody>
                      {locality.street}
                      <Text component="br" />
                      {locality.city}, {locality.state} {locality.zip}
                      <Text component="br" />
	                    <SoftballGoogleMaps lat={locality.lat} lng={locality.lng} />
                      <Text component="br" />
                      <Text component="br" />
                      {locality.description}
	                  </CardBody>
	                  <CardFooter>
	                  </CardFooter>
	                  </Card>
                </GalleryItem>
  	            ))}
              </Gallery>
	          </TabContentBody>
          </TabContent>
          <TabContent key={2} eventKey={2} id={`tabContent${2}`} activeKey={activeTabKey} hidden={2 !== activeTabKey}>
            <TabContentBody>
              Coming soon!
	          </TabContentBody>
          </TabContent>
        </PageSection>
      </div>
    );
}

export default FieldInfo;
