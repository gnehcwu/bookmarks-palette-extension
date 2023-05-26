import React from 'react';
import styled from 'styled-components';
import FocusLock from 'react-focus-lock';

import Filter from '../Filter';
import BookmarkList from '../BookmarkList';
import Footer from '../Footer';
import useChromeMessage from '../../hooks/useChromeMessage';
import search from '../../utils/search';
import messageBackground from '../../utils/messageBackground';
import useDisablePageScrolling from '../../hooks/useDisablePageScrolling';

const Wrapper = styled.div`
  color-scheme: light;
  user-select: none;
  accent-color: var(--bp-extension-brand);
  block-size: 100%;
  caret-color: var(--bp-extension-brand);

  position: fixed;
  inset: 0;
  display: grid;
  place-content: center;
  z-index: var(--bp-extension-layer-important);
  font-family: var(--bp-extension-font-sans);

  & *,
  & ::after,
  & ::before {
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: no-preference) {
    scroll-behavior: smooth;
  }

  @media (prefers-color-scheme: dark) {
    color-scheme: dark;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: var(--bp-extension-surface-backdrop);
  transition: background-color 600ms ease-in;
`;

const Content = styled.div`
  position: relative;
  background-color: var(--bp-extension-surface-primary);
  border-radius: 12px;
  box-shadow: var(--bp-extension-shadow-strength);
  animation-duration: 125ms;
  width: min(789px, 100vw);
  height: 520px;
  box-shadow: var(--bp-extension-shadow);

  display: grid;
  grid-template-rows: min-content 1fr min-content;
  font-size: 10px;

  @media (prefers-color-scheme: dark) {
    border: 1px solid var(--bp-extension-separator);
  }
`;

function Palette() {
  const [isShown, setIsShown] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [selected, setSelected] = React.useState(0);
  const totalBookmarks = React.useRef(0);
  const [filteredBookmarks, setFilteredBookmarks] = React.useState([]);

  function setFilterAndSelected(filter, selected) {
    setFilter(filter);
    setSelected(selected);
  }

  function handleFilterChange(value) {
    setFilterAndSelected(value, 0);
  }

  function handleSelectChange(nextSelect) {
    setSelected(nextSelect);
  }

  function togglePalette() {
    setIsShown(!isShown);
    setFilterAndSelected('', 0);
  }

  function dismissPalette() {
    if (!isShown) return;

    setIsShown(false);
    setFilterAndSelected('', 0);
  }

  function handleNavigation(event) {
    const isArrowDown = event.key === 'ArrowDown';
    let nextIndex = isArrowDown ? selected + 1 : selected - 1;

    if (nextIndex >= filteredBookmarks.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = filteredBookmarks.length - 1;
    }

    setSelected(nextIndex);
  }

  function handleKeyDown(event) {
    // Stop events leaking into current page
    event.stopPropagation();

    const { key } = event;
    if (['ArrowUp', 'ArrowDown'].includes(key)) {
      event.preventDefault();
      handleNavigation(event);
    } else if (key === 'Enter') {
      openBookmark();
    } else if (key === 'Escape') {
      dismissPalette();
    }
  }

  async function openBookmark() {
    if (!isShown) return;

    const { item: { url } = {} } = filteredBookmarks[selected];
    if (url) {
      messageBackground({ action: 'bp-open-bookmark-from-palette', url });
    }

    dismissPalette();
  }

  const trimmedFilter = filter?.trim();

  React.useEffect(() => {
    if (!isShown) return;

    messageBackground({ action: 'bp-search-bookmarks' })
      .then((response) => {
        if (response && response.bookmarks) {
          totalBookmarks.current = response.bookmarks.length;
          setFilteredBookmarks(search(response.bookmarks, trimmedFilter));
        }
      })
      .catch(() => {});
  }, [isShown, trimmedFilter]);

  // Disable page scrolling based on extension open status
  useDisablePageScrolling(isShown);

  // Toggle plugin content modal when bp-toggle-bookmarks-palette message been sent
  useChromeMessage('bp-toggle-bookmarks-palette', togglePalette);

  if (!isShown) return null;

  return (
    <FocusLock returnFocus={true}>
      <Wrapper onKeyDown={handleKeyDown}>
        <Backdrop onClick={dismissPalette} />
        <Content>
          <Filter filter={filter} handleFilterChange={handleFilterChange} />
          <BookmarkList
            bookmarks={filteredBookmarks}
            selected={selected}
            onSelectChange={handleSelectChange}
            onClickBookmark={openBookmark}
          />
          <Footer
            filteredBookmarkCount={filteredBookmarks.length}
            totalBookmarkCount={totalBookmarks.current}
          />
        </Content>
      </Wrapper>
    </FocusLock>
  );
}

export default Palette;
