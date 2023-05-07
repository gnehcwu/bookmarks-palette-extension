import React from 'react';
import PropTypes from 'prop-types';

import Highlight from '../Highlight';
import * as styles from './BookmarkItem.module.css';

BookmarkItem.propTypes = {
  bookmark: PropTypes.shape({
    item: PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
      domain: PropTypes.string,
    }),
    matches: PropTypes.arrayOf(
      PropTypes.shape({
        indices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      }),
    ),
  }),
  active: PropTypes.bool,
  handleClickBookmark: PropTypes.func,
  handleSelectBookmark: PropTypes.func,
};

function BookmarkItem({ bookmark, active, handleClickBookmark, handleSelectBookmark }) {
  const {
    item: { title, path, domain },
    matches = [],
  } = bookmark;

  function renderPaths() {
    const paths = path.split('/');

    return paths.map((subPath, index) => {
      return (
        <span key={index} className={styles.path}>
          {subPath}
        </span>
      );
    });
  }

  function renderContent(type = 'title') {
    const source = type === 'title' ? title : domain;
    const match = matches.find((match) => match.key === type);
    if (match) {
      return <Highlight indices={match.indices} source={source} />;
    } else {
      return source;
    }
  }

  return (
    <li
      role="option"
      aria-selected={active ? true : false}
      className={`${styles.bookmarkItem}`}
      onClick={handleClickBookmark}
      onKeyDown={handleClickBookmark}
      onMouseEnter={handleSelectBookmark}
    >
      <div className={styles.content}>
        <span className={styles.bookmarkContent}>{renderContent('title')}</span>
        <span className={styles.domainContent}>{renderContent('domain')}</span>
      </div>
      <div className={styles.paths}>{renderPaths()}</div>
    </li>
  );
}

export default BookmarkItem;
