import React from 'react';
import PropTypes from 'prop-types';

import Highlight from '../Highlight';
import Favicon from '../Favicon/Favicon';
import * as styles from './BookmarkItem.module.css';

BookmarkItem.propTypes = {
  bookmark: PropTypes.shape({
    item: PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
      domain: PropTypes.string,
      url: PropTypes.string,
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
    item: { title, path, domain, url },
    matches = [],
  } = bookmark;

  function renderPaths() {
    const paths = path.split('/');

    return paths.map((subPath, index) => {
      return (
        <span key={index} id={styles.bpPath}>
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
      id={styles.bpBookmarkItem}
      className={`${active ? styles.bpActive : ''}`}
      role="option"
      aria-selected={active ? true : false}
      onClick={handleClickBookmark}
      onKeyDown={handleClickBookmark}
      onMouseEnter={handleSelectBookmark}
    >
      <Favicon url={url} />
      <div id={styles.bpContent}>
        <span id={styles.bpBookmarkContent}>{renderContent('title')}</span>
        <span id={styles.bpDomainContent}>{renderContent('domain')}</span>
      </div>
      <div id={styles.bpPaths}>{renderPaths()}</div>
    </li>
  );
}

export default BookmarkItem;
