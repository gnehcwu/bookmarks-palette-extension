import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Highlight from '../Highlight';
import Favicon from '../Favicon/Favicon';

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
  onClickBookmark: PropTypes.func,
  onSelectBookmark: PropTypes.func,
};

const BookmarkListItem = styled.li`
  max-inline-size: 100%;
  margin: 0;
  padding: 8px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  column-gap: 16px;
  background-color: ${(props) =>
    props.$active ? 'var(--bp-extension-surface-content)' : 'inherit'};
`;

const BookmarkContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8em;
`;

const Title = styled.span`
  color: var(--bp-extension-text-primary);
  font-size: 1.6em;
  word-break: break-all;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Domain = styled(Title)`
  opacity: 0.75;
  font-size: 1.25em;
  color: var(--bp-extension-text-secondary);
`;

const Paths = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: end;
  grid-column-gap: 8px;
  align-items: center;
  font-size: 1.1em;
  color: var(--bp-extension-text-secondary);
  line-height: 1.3em;
`;

const Path = styled.span`
  background-color: var(--bp-extension-surface-info);
  border-radius: 4px;
  padding: 5px 7px;
  font-size: 1.25em;
  white-space: nowrap;
`;

function BookmarkItem({ bookmark, active, onClickBookmark, onSelectBookmark }) {
  const {
    item: { title, path, domain, url },
    matches = [],
  } = bookmark;

  function renderPaths() {
    const paths = path.split('/');

    return paths.map((subPath, index) => {
      return <Path key={index}>{subPath}</Path>;
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
    <BookmarkListItem
      role="option"
      aria-selected={active ? true : false}
      $active={active}
      onClick={onClickBookmark}
      onPointerMove={onSelectBookmark}
    >
      <Favicon url={url} />
      <BookmarkContent>
        <Title>{renderContent('title')}</Title>
        <Domain>{renderContent('domain')}</Domain>
      </BookmarkContent>
      <Paths>{renderPaths()}</Paths>
    </BookmarkListItem>
  );
}

export default BookmarkItem;
