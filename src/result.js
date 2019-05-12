import React, { Component } from 'react';

class Result extends Component {

    render() {
        return (
            <div>
                <p>
                    {this.props.m_szDocTitle}
                    <small>
                        (<a href={this.props.m_szSrcUrl}>source</a>)
                    </small>
                </p>
                <p>{this.props.m_szDocSumamry}</p>
            </div>
        );
    }
}
export default Result;
