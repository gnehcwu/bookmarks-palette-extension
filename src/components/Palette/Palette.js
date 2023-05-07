import React from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';

import Filter from '../Filter';
import BookmarkList from '../BookmarkList';
import Footer from '../Footer';
import useKeyDown from '../../hooks/useKeyDown';
import useChromeMessage from '../../hooks/useChromeMessage';
import search from '../../utils/search';
import messageBackground from '../../utils/messageBackground';
import * as styles from './Palette.module.css';

function Palette() {
  const [isShown, setIsShown] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [selected, setSelected] = React.useState(0);
  const [filteredBookmarks, setFilteredBookmarks] = React.useState([]);
  const [totalBookmarkCount, setTotalBookmarkCount] = React.useState(0);

  function handleFilterChange(value) {
    setFilter(value);
    setSelected(0);
  }

  function handleSelectChange(nextSelect) {
    setSelected(nextSelect);
  }

  function resetFilterSelected() {
    setFilter('');
    setSelected(0);
  }

  function togglePalette() {
    setIsShown(!isShown);
    resetFilterSelected();
  }

  function dismissPalette() {
    setIsShown(false);
    resetFilterSelected();
  }

  function handleAction(event) {
    if (!isShown) return;

    event.preventDefault();

    const { item: { url } = {} } = filteredBookmarks[selected];

    if (url) {
      dismissPalette();
      messageBackground({ action: 'bp-open-bookmark-from-palette', url });
    }
  }

  const trimmedFilter = filter.trim();

  React.useEffect(() => {
    messageBackground({ action: 'bp-search-bookmarks' })
      .then((response) => {
        if (response && response.bookmarks) {
          setTotalBookmarkCount(response.bookmarks.length);
          setFilteredBookmarks(search(response.bookmarks, trimmedFilter));
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [trimmedFilter]);

  // Dismiss plugin content when Escape key been pressed
  useKeyDown('Escape', dismissPalette);
  useKeyDown('Enter', handleAction);

  // Toggle plugin content modal when bp-toggle-bookmarks-palette message been sent
  useChromeMessage('bp-toggle-bookmarks-palette', togglePalette);

  if (!isShown) return null;

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <div id={styles.bpWrapper}>
          <div id={styles.bpBackdrop} onClick={dismissPalette}></div>
          <div id={styles.bpPalette}>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <BookmarkList
              bookmarks={filteredBookmarks}
              selected={selected}
              onSelectChanged={handleSelectChange}
            />
            <Footer
              filteredBookmarkCount={filteredBookmarks.length}
              totalBookmarkCount={totalBookmarkCount}
            />
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}

export default Palette;
