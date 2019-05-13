/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';

function searchMatch(searchQuery, namedFields) {
  return Object.keys(namedFields).reduce((result, key) => result.concat(namedFields[key]
    .filter((field, i) => field.match(new RegExp(searchQuery)) && i < 5)
    .map(field => (key === 'keywords' ? field : `${key}:${field}`))), []);
}

function Result(props) {
  const {
    searchQuery,
    m_szDocTitle,
    m_szSrcUrl,
    m_Companies,
    m_BiGrams,
    m_People,
    m_Places,
    m_TriGrams,
    m_szYear,
    m_szSourceType,
  } = props;
  const fields = {
    company: m_Companies,
    keywords: m_BiGrams.concat(m_TriGrams),
    person: m_People,
    place: m_Places,
  };
  return (
    <div className="link">
      <a className="title" href={m_szSrcUrl}>
        {m_szDocTitle}
      </a>
      <div className="meta">
        <small>
          {`${m_szSourceType.split('_')[1]} published in ${m_szYear}`}
        </small>
        {searchMatch(searchQuery, fields).map(value => <Badge key={value} pill variant="secondary">{value}</Badge>)}
      </div>
    </div>
  );
}

Result.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  m_szDocTitle: PropTypes.string.isRequired,
  m_szSrcUrl: PropTypes.string.isRequired,
  m_Companies: PropTypes.arrayOf(PropTypes.string).isRequired,
  m_BiGrams: PropTypes.arrayOf(PropTypes.string).isRequired,
  m_People: PropTypes.arrayOf(PropTypes.string).isRequired,
  m_Places: PropTypes.arrayOf(PropTypes.string).isRequired,
  m_TriGrams: PropTypes.arrayOf(PropTypes.string).isRequired,
  m_szYear: PropTypes.string.isRequired,
  m_szSourceType: PropTypes.string.isRequired,
};

export default Result;
