/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
  const { m_szDocTitle, m_szSrcUrl } = props;
  return (
    <div className="link">
      <p className="title">
        {m_szDocTitle}
      </p>
      <small>
        <a href={m_szSrcUrl}>source</a>
      </small>
    </div>
  );
}
Result.propTypes = {
  m_szDocTitle: PropTypes.string.isRequired,
  m_szSrcUrl: PropTypes.string.isRequired,
};

export default Result;
