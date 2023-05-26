import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BookmarkItem from '../BookmarkItem/BookmarkItem';

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.shape({
        key: PropTypes.string,
        target: PropTypes.string,
      }),
    }),
  ),
  selected: PropTypes.number,
  onSelectChange: PropTypes.func,
  onClickBookmark: PropTypes.func,
};

const Bookmarks = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  list-style: none;
  margin: 0px;
  padding: 8px 10px;
  width: 100%;

  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  scroll-padding-block: 8px;
  overscroll-behavior: contain;
`;

const EmptyState = styled.p`
  color: var(--bp-extension-text-info);
  font-size: 2em;
  font-weight: 600px;
  display: grid;
  place-content: center;
`;

function BookmarkList({ bookmarks, selected, onSelectChange, onClickBookmark }) {
  const bookmarkListRef = React.useRef(null);

  const scrollBookmarkIntoView = React.useCallback((bookmarkElement) => {
    if (!bookmarkElement || !bookmarkListRef.current) return;

    const { offsetTop: elementOffsetTop, clientHeight: elementClientHeight } = bookmarkElement;
    const { scrollTop: listScrollTop, clientHeight: listClientHeight } = bookmarkListRef.current;
    const needToScroll =
      elementOffsetTop + elementClientHeight > listScrollTop + listClientHeight ||
      elementOffsetTop - elementClientHeight < listScrollTop;

    if (needToScroll) {
      bookmarkElement.scrollIntoView({ block: 'nearest' });
    }
  }, []);

  React.useEffect(() => {
    if (!bookmarks || bookmarks.length <= 0) return;

    const allRenderedBookmarks = bookmarkListRef.current.querySelectorAll('li');
    const selectedBookmark = allRenderedBookmarks[selected];
    scrollBookmarkIntoView(selectedBookmark);
  }, [selected, bookmarks, scrollBookmarkIntoView]);

  if (!bookmarks || bookmarks.length <= 0) {
    return <EmptyState>🔍 No results</EmptyState>;
  }

  return (
    <Bookmarks ref={bookmarkListRef} role="group">
      {bookmarks.map((bookmark, index) => {
        return (
          <BookmarkItem
            key={bookmark.item.id}
            active={index === selected}
            bookmark={bookmark}
            onClickBookmark={onClickBookmark}
            onSelectBookmark={() => onSelectChange(index)}
          />
        );
      })}
    </Bookmarks>
  );
}

export default BookmarkList;
