import React from 'react';
import PropTypes from 'prop-types';

import useKeyDown from '../../hooks/useKeyDown';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import * as styles from './BookmarkList.module.css';

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
  onSelectChanged: PropTypes.func,
};

function BookmarkList({ bookmarks, selected, onSelectChanged }) {
  const bookmarkListRef = React.useRef(null);

  const scrollBookmarkIntoView = React.useCallback((bookmark) => {
    if (!bookmark || !bookmarkListRef.current) return;

    const { offsetTop: elementOffsetTop, clientHeight: elementClientHeight } = bookmark;
    const { scrollTop: listScrollTop, clientHeight: listClientHeight } = bookmarkListRef.current;
    const needToScroll =
      elementOffsetTop + elementClientHeight > listScrollTop + listClientHeight ||
      elementOffsetTop - elementClientHeight < listScrollTop;

    if (needToScroll) {
      bookmark.scrollIntoView({ block: 'nearest' });
    }
  }, []);

  function handleNavigation(event) {
    const isArrowDown = event.key === 'ArrowDown';
    let nextIndex = isArrowDown ? selected + 1 : selected - 1;
    if (nextIndex >= bookmarks.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = bookmarks.length - 1;
    }

    onSelectChanged(nextIndex);
  }

  function handleClickBookmark(event) {
    if (event.key === 'Enter') return;

    event.preventDefault();
    event.target.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      }),
    );
  }

  function handleSelectBookmark(event, index) {
    event.preventDefault();

    onSelectChanged(index);
  }

  React.useEffect(() => {
    if (!bookmarks || bookmarks.length <= 0) return;

    const allRenderedBookmarks = bookmarkListRef.current.querySelectorAll('li');
    const selectedBookmark = allRenderedBookmarks[selected];
    scrollBookmarkIntoView(selectedBookmark);
  }, [selected, bookmarks, scrollBookmarkIntoView]);

  useKeyDown('ArrowDown', handleNavigation);
  useKeyDown('ArrowUp', handleNavigation);

  if (!bookmarks || bookmarks.length <= 0) {
    return <p id={styles.bpEmpty}>🔍 No results</p>;
  }

  return (
    <ul id={styles.bpBookmarkList} ref={bookmarkListRef} role="group">
      {bookmarks.map((bookmark, index) => {
        return (
          <BookmarkItem
            key={bookmark.item.id}
            active={index === selected}
            bookmark={bookmark}
            handleClickBookmark={handleClickBookmark}
            handleSelectBookmark={(event) => handleSelectBookmark(event, index)}
          />
        );
      })}
    </ul>
  );
}

export default BookmarkList;
