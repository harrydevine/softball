import React, { useEffect } from 'react';
import {
  Alert,
  AlertGroup,
  AlertVariant,
  AlertActionCloseButton,
  Bullseye,
  Button,
  EmptyState,
  EmptyStateVariant,
  EmptyStateBody,
  EmptyStateIcon,
  Spinner,
  Text,
  Title
} from '@patternfly/react-core';
import { Thead, TableComposable, TableVariant, Tr, Th, Tbody, Td} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import AdminBoardMemberModal from './AdminBoardMemberModal';

//class AdminBoardMemberTable extends React.Component {
const AdminBoardMemberTable = ({ children }) => {
  const [boardData, setBoardData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);
  const [boardMemberAdded, setBoardMemberAdded] = React.useState(false);

  //  constructor(props) {
//    super(props);
//    this.state = {
//      boardData: [],
//      loading: true,
//      alerts: [],
//    };
//  };

//  componentDidMount() {
//    this.fetchBoardMembers();
//  }

  // Fetch data for Upcoming Meetings
//  fetchBoardMembers() {
//    this.setState({ loading: true });

//    fetch("http://192.168.1.21:8081/board")
//      .then(resp => resp.json())
//      .then(resp => this.setState({boardData: resp, loading: false}))
//      .catch(err => this.setState({err: err, loading: false}));
//  }
  useEffect(() => {
  // Fetch data for Board Members
    fetch(`http://192.168.1.21:8081/board`)
      .then(async resp => {
        const jsonResponse = await resp.json()
        setBoardData(jsonResponse);
        setBoardMemberAdded(false);
        setLoading(false);
      })
      .catch(err => {
        setErr(err);
        setLoading(false);
      })
    }, []);

    useEffect(() => {
      // Fetch data for Board Members when new member added
        fetch(`http://192.168.1.21:8081/board`)
          .then(async resp => {
            const jsonResponse = await resp.json()
            console.log("Modal set added to ", boardMemberAdded);
            setBoardData(jsonResponse);
            setBoardMemberAdded(false);
            setLoading(false);
          })
          .catch(err => {
            setErr(err);
            setLoading(false);
          })
        }, [boardMemberAdded]);
/*        
    const addAlerts = (incomingAlerts) => {
      this.setState({ alerts: [...this.state.alerts, ...incomingAlerts] });
    };
    const getUniqueId = () =>(
      (String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now())
    );
    const addSuccessAlert = () => {
      addAlerts([{ title: "Board Member added successfully", variant: 'success', key: getUniqueId() }])
    };
    const addFailureAlert = () => {
      addAlerts([{ title: "Error adding Board Member", variant: 'danger', key: getUniqueId() }])
    };
    this.removeAlert = key => {
      this.setState({ alerts: [...this.state.alerts.filter(el => el.key !== key)] });
    };
*/    
    return (
      <div>
        <React.Fragment>
          <AdminBoardMemberModal setBoardMemberAdded={setBoardMemberAdded} />
          <Text component="br" />
          <Text component="br" />
          <Text component="hr" />
          <TableComposable variant={TableVariant.default}  aria-label="Board Members Table">
            <Thead>
	          <Tr>
	            <Th width={25}>Name</Th>
	            <Th width={25}>Title</Th>
              <Th width={25}>Phone</Th>
  	          <Th width={25}>Email</Th>
	          </Tr>
	          </Thead>
            <Tbody>
              {!loading && boardData?.data.length === 0 && (
                <Tr key="0">
                  <Td colSpan={4}>
                    <Bullseye>
                      <EmptyState variant={EmptyStateVariant.small}>
                        <EmptyStateIcon icon={SearchIcon} />
                        <Title headingLevel="h2" size="lg">
                          No Board Member information retrieved!
                        </Title>
                        <EmptyStateBody>
                          Check your network connection or contact the system administrator.
                        </EmptyStateBody>
                      </EmptyState>
                    </Bullseye>
                  </Td>
                </Tr>
              )}
 	            {!loading && boardData?.data.map(row => (
                <Tr key={row.id} isEditable>
                  <Td dataLabel="Name">{row.name}</Td>
                  <Td dataLabel="Title">{row.title}</Td>
                  <Td dataLabel="Phone">{row.phone}</Td>
                  <Td dataLabel="Email">{row.email}</Td>
                </Tr>
              ))}
	            {loading && (
                <Tr>
                  <Td colSpan={4}>
  		              <Bullseye>
	  	                <Spinner size="xl" />
		                </Bullseye>
		             </Td>
                </Tr>
              )}
	         </Tbody>
          </TableComposable>
        </React.Fragment>
      </div>
    );
}

export default AdminBoardMemberTable;

