import React, { Component } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DataSearch, ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';

import Result from './result';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
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
            <Col sm={8}>
              <DataSearch
                componentId="search"
                dataField={[
                  'm_Companies',
                  'm_BiGrams',
                  'm_szDocTitle',
                  'm_People',
                  'm_Places',
                  'm_TriGrams',
                ]}
                value={searchQuery}
                onChange={this.searchChange}
                debounce={200}
              />
            </Col>
            <Col sm={2}>
              Amplyfi Article Search
            </Col>
          </Row>
          {searchQuery.length > 0 && (
            <Row>
              <Col>
                <ReactiveList
                  componentId="SearchResult"
                  dataField="m_szDocID"
                  react={{
                    and: ['search'],
                  }}
                  includeFields={['m_szDocID', 'm_szDocTitle', 'm_szSrcUrl']}
                  pagination
                  renderItem={res => <Result key={res.m_szDocID} {...res} />}
                />
              </Col>
            </Row>
          )}
        </ReactiveBase>
      </Container>
    );
  }
}

export default App;
