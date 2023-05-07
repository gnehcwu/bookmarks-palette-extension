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
  handleSelect: PropTypes.func,
};

function BookmarkList({ bookmarks, selected, handleSelect }) {
  const bookmarkListRef = React.useRef(null);
  const [highlightStyle, setHighlightStyle] = React.useState(null);

  const updateHighlight = React.useCallback((bookmark) => {
    const { offsetTop: elementOffsetTop, clientHeight: elementClientHeight } = bookmark;
    setHighlightStyle({
      transform: `translateY(${elementOffsetTop}px)`,
      height: `${elementClientHeight}px`,
    });
  }, []);

  const scrollBookmarkIntoView = React.useCallback((bookmark) => {
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

    handleSelect(nextIndex);
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

    handleSelect(index);
  }

  React.useEffect(() => {
    const allRenderedBookmarks = bookmarkListRef.current.querySelectorAll('li');
    const selectedBookmark = allRenderedBookmarks[selected];
    scrollBookmarkIntoView(selectedBookmark);
    updateHighlight(selectedBookmark);
  }, [selected, bookmarks, scrollBookmarkIntoView, updateHighlight]);

  useKeyDown('ArrowDown', handleNavigation);
  useKeyDown('ArrowUp', handleNavigation);

  if (!bookmarks || bookmarks.length <= 0) {
    return <p className={styles.empty}>🔍 No results</p>;
  }

  return (
    <ul className={styles.bookmarkList} ref={bookmarkListRef} role="group">
      <div className={styles.highlight} style={highlightStyle}></div>
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
