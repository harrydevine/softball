import React from 'react';
import {
  Button,
  ButtonVariant,
  Bullseye,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  ToolbarFilter,
  ToolbarToggleGroup,
  ToolbarGroup,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  DropdownToggle,
  InputGroup,
  Title,
  Select,
  SelectOption,
  SelectVariant,
  TextInput,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions
} from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

class AdminPlayersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        name: [],
        division: []
      },
      currentCategory: 'Name',
      isFilterDropdownOpen: false,
      isCategoryDropdownOpen: false,
      nameInput: '',
      columns: [
        { title: 'Player' },
        { title: 'Number' },
        { title: 'Division' }
      ],
      rows: [
        { cells: ['Amanda D', '2', '10U'] },
        { cells: ['Kasey C', '9', '12U'] },
        { cells: ['Sariah R', '13', '12U'] },
        { cells: ['Maggie L', '7', '8U'] },
        { cells: ['Lenna R', '1', '6U'] },
        { cells: ['Lily T', '12', '14U'] },
        { cells: ['Mary D', '8', '16U'] }
      ],
      inputValue: ''
    };

    this.onDelete = (type = '', id = '') => {
      if (type) {
        this.setState(prevState => {
          prevState.filters[type.toLowerCase()] = prevState.filters[type.toLowerCase()].filter(s => s !== id);
          return {
            filters: prevState.filters
          };
        });
      } else {
        this.setState({
          filters: {
            name: [],
            division: []
          }
        });
      }
    };

    this.onCategoryToggle = isOpen => {
      this.setState({
        isCategoryDropdownOpen: isOpen
      });
    };

    this.onCategorySelect = event => {
      this.setState({
        currentCategory: event.target.innerText,
        isCategoryDropdownOpen: !this.state.isCategoryDropdownOpen
      });
    };

    this.onFilterToggle = isOpen => {
      this.setState({
        isFilterDropdownOpen: isOpen
      });
    };

    this.onFilterSelect = event => {
      this.setState({
        isFilterDropdownOpen: !this.state.isFilterDropdownOpen
      });
    };

    this.onInputChange = newValue => {
      this.setState({ inputValue: newValue });
    };

    this.onRowSelect = (event, isSelected, rowId) => {
      let rows;
      if (rowId === -1) {
        rows = this.state.rows.map(oneRow => {
          oneRow.selected = isSelected;
          return oneRow;
        });
      } else {
        rows = [...this.state.rows];
        rows[rowId].selected = isSelected;
      }
      this.setState({
        rows
      });
    };

    this.onStatusSelect = (event, selection) => {
      const checked = event.target.checked;
      this.setState(prevState => {
        const prevSelections = prevState.filters['status'];
        return {
          filters: {
            ...prevState.filters,
            status: checked ? [...prevSelections, selection] : prevSelections.filter(value => value !== selection)
          }
        };
      });
    };

    this.onNameInput = event => {
      if (event.key && event.key !== 'Enter') {
        return;
      }

      const { inputValue } = this.state;
      this.setState(prevState => {
        const prevFilters = prevState.filters['name'];
        return {
          filters: {
            ...prevState.filters,
            ['name']: prevFilters.includes(inputValue) ? prevFilters : [...prevFilters, inputValue]
          },
          inputValue: ''
        };
      });
    };

    this.onDivisionSelect = (event, selection) => {
      this.setState(prevState => {
        return {
          filters: {
            ...prevState.filters,
            ['division']: [selection]
          }
        };
      });
      this.onFilterSelect();
    };
  }

  buildCategoryDropdown() {
    const { isCategoryDropdownOpen, currentCategory } = this.state;

    return (
      <ToolbarItem>
        <Dropdown
          onSelect={this.onCategorySelect}
          position={DropdownPosition.left}
          toggle={
            <DropdownToggle onToggle={this.onCategoryToggle} style={{ width: '100%' }}>
              <FilterIcon /> {currentCategory}
            </DropdownToggle>
          }
          isOpen={isCategoryDropdownOpen}
          dropdownItems={[
            <DropdownItem key="cat1">Name</DropdownItem>,
            <DropdownItem key="cat2">Division</DropdownItem>,
          ]}
          style={{ width: '100%' }}
        ></Dropdown>
      </ToolbarItem>
    );
  }

  buildFilterDropdown() {
    const { currentCategory, isFilterDropdownOpen, inputValue, filters } = this.state;

    const divisionMenuItems = [
      <SelectOption key="6u" value="6U" />,
      <SelectOption key="8u" value="8U" />,
      <SelectOption key="10u" value="10U" />,
      <SelectOption key="12u" value="12U" />,
      <SelectOption key="14u" value="14U" />,
      <SelectOption key="16u" value="16U" />
    ];

//    const statusMenuItems = [
//      <SelectOption key="statusRunning" value="Running" />,
//      <SelectOption key="statusStopped" value="Stopped" />,
//      <SelectOption key="statusDown" value="Down" />,
//      <SelectOption key="statusDegraded" value="Degraded" />,
//      <SelectOption key="statusMaint" value="Needs Maintainence" />
//    ];

    return (
      <React.Fragment>
        <ToolbarFilter
          chips={filters.division}
          deleteChip={this.onDelete}
          categoryName="Division"
          showToolbarItem={currentCategory === 'Division'}
        >
          <Select
            aria-label="Division"
            onToggle={this.onFilterToggle}
            onSelect={this.onDivisionSelect}
            selections={filters.division[0]}
            isOpen={isFilterDropdownOpen}
            placeholderText="Any"
          >
            {divisionMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          chips={filters.name}
          deleteChip={this.onDelete}
          categoryName="Name"
          showToolbarItem={currentCategory === 'Name'}
        >
          <InputGroup>
            <TextInput
              name="nameInput"
              id="nameInput1"
              type="search"
              aria-label="name filter"
              onChange={this.onInputChange}
              value={inputValue}
              placeholder="Filter by name..."
              onKeyDown={this.onNameInput}
            />
            <Button
              variant={ButtonVariant.control}
              aria-label="search button for search input"
              onClick={this.onNameInput}
            >
              <SearchIcon />
            </Button>
          </InputGroup>
        </ToolbarFilter>
      </React.Fragment>
    );
  }

  renderToolbar() {
    const { filters } = this.state;
    return (
      <Toolbar id="toolbar-with-chip-groups" clearAllFilters={this.onDelete} collapseListedFiltersBreakpoint="xl">
        <ToolbarContent>
          <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
            <ToolbarGroup variant="filter-group">
              {this.buildCategoryDropdown()}
              {this.buildFilterDropdown()}
            </ToolbarGroup>
          </ToolbarToggleGroup>
        </ToolbarContent>
      </Toolbar>
    );
  }

  render() {
    const { loading, rows, columns, filters } = this.state;

    const filteredRows =
      filters.name.length > 0 || filters.division.length > 0 ? rows.filter(row => {
            return (
              (filters.name.length === 0 ||
                filters.name.some(name => row.cells[0].toLowerCase().includes(name.toLowerCase()))) &&
              (filters.division.length === 0 || filters.division.includes(row.cells[2]))
            );
          })
        : rows;

    let tableRows = filteredRows;
    if (!loading && filteredRows.length === 0) {
      tableRows = [
        {
          heightAuto: true,
          cells: [
            {
              props: { colSpan: 8 },
              title: (
                <Bullseye>
                  <EmptyState>
                    <EmptyStateIcon icon={SearchIcon} />
                    <Title headingLevel="h5" size="lg">
                      Clear all filters and try again.
                    </Title>
                    <EmptyStateBody>
                      No results match this filter criteria. Remove all filters or clear all filters to show results.
                    </EmptyStateBody>
                    <EmptyStateSecondaryActions>
                      <Button
                        variant="link"
                        onClick={() => {
                          this.onDelete(null);
                        }}
                      >
                        Clear all filters
                      </Button>
                    </EmptyStateSecondaryActions>
                  </EmptyState>
                </Bullseye>
              )
            }
          ]
        }
      ];
    } else if (loading) {
      tableRows = [
        {
          heightAuto: true,
          cells: [
            {
              props: { colSpan: 8 },
              title: (
                <Title headingLevel="h2" size="3xl">
                  Please wait while loading data
                </Title>
              )
            }
          ]
        }
      ];
    }

    return (
      <React.Fragment>
        {this.renderToolbar()}
        <Table cells={columns} rows={tableRows} onSelect={this.onRowSelect} aria-label="Filterable Players Table">
          <TableHeader />
          <TableBody />
        </Table>
      </React.Fragment>
    );
  }
}

export default AdminPlayersTable;

