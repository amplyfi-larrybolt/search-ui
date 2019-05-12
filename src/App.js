import React, { Component } from 'react';
import './App.css';

import { ReactiveBase, DataSearch, ReactiveList } from '@appbaseio/reactivesearch';
import Result from './result';

class App extends Component {

	render() {
		return (
			<ReactiveBase app="amplyfi" url={process.env.REACT_APP_SEARCH_API}>
				<div>
					<DataSearch
						componentId="search"
						dataField={[
							"m_Companies",
							'm_BiGrams',
                            'm_szDocTitle',
							'm_People',
							'm_Places',
							'm_TriGrams',
						]}
					/>
				</div>
                <ReactiveList
					componentId="SearchResult"
					dataField="m_szDocID"
					react={{
						"and": ["search"]
					}}
                    includeFields={['m_szDocID', 'm_szDocTitle', 'm_szSrcUrl']}
                    pagination={true}
					renderItem={(res) => <Result key={res.m_szDocID} {...res}/>}
				/>
			</ReactiveBase>
		);
	}
}
export default App;
