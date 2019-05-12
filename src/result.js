/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
  const { m_szDocTitle, m_szSrcUrl, m_szDocSumamry } = props;
  return (
    <div>
      <p>
        {m_szDocTitle}
        <small>
          <a href={m_szSrcUrl}>source</a>
        </small>
      </p>
      <p>{m_szDocSumamry}</p>
    </div>
  );
}
Result.propTypes = {
  m_szDocTitle: PropTypes.string.isRequired,
  m_szSrcUrl: PropTypes.string.isRequired,
  m_szDocSumamry: PropTypes.string.isRequired,
};

export default Result;
