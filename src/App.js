import React, { Component } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  DataSearch, ReactiveBase, ReactiveList, RangeInput, MultiList,
} from '@appbaseio/reactivesearch';

import Result from './result';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: new URLSearchParams(window.location.search).get('search') || '',
    };
    this.searchChange = this.searchChange.bind(this);
  }

  searchChange(value) {
    this.setState({
      searchQuery: value,
    });
  }

  render() {
    const { searchQuery } = this.state;
    return (
      <Container fluid>
        <ReactiveBase app="amplyfi" url={process.env.REACT_APP_SEARCH_API}>
          <Row>
            <Col sm={9} className="search">
              <DataSearch
                componentId="search"
                URLParams
                dataField={[
                  'm_szDocTitle',
                  'm_Companies',
                  'm_BiGrams',
                  'm_People',
                  'm_Places',
                  'm_TriGrams',
                ]}
                value={searchQuery}
                onChange={this.searchChange}
                debounce={200}
              />
            </Col>
            <Col sm={3}>
              Amplyfi Article Search
            </Col>
          </Row>
          <Row>
            <Col sm={9}>
              {searchQuery.length > 0 && (
                <ReactiveList
                  componentId="SearchResult"
                  dataField="m_szDocID"
                  react={{
                    and: ['search', 'year', 'source'],
                  }}
                  includeFields={[
                    'm_szDocID', 'm_szDocTitle', 'm_szSrcUrl',
                    'm_Companies',
                    'm_BiGrams',
                    'm_People',
                    'm_Places',
                    'm_TriGrams',
                    'm_szYear',
                    'm_szSourceType',
                  ]}
                  pagination
                  renderItem={res => (
                    <Result
                      key={res.m_szDocID}
                      searchQuery={searchQuery}
                      {...res}
                    />
                  )}
                />
              )}
            </Col>
            <Col sm={3}>
              <Row>
                <Col className="filters">
                  <RangeInput
                    componentId="year"
                    dataField="m_szYear"
                    URLParams
                    title="Publication year"
                    showFilter
                    showHistogram
                    range={{
                      start: 1990,
                      end: new Date().getFullYear() + 1,
                    }}
                  />
                  <MultiList
                    componentId="source"
                    dataField="m_szSourceType"
                    title="Source Type"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </ReactiveBase>
      </Container>
    );
  }
}

export default App;
