import React, { useCallback, useReducer, useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import type { SupportedKey, TransformedBookmark } from '../../types';
import useChromeMessage from '../../hooks/useChromeMessage';
import messageBackground from '../../utils/messageBackground';
import { BP_TOGGLE_BOOKMARKS_PALETTE, BP_SEARCH_BOOKMARKS } from '../../configs/constants';
import scoreBookmarks from '../../utils/scoring/scoreBookmarks';
import Filter from 'components/Filter/Filter';
import BookmarkList from 'components/Bookmark/BookmarkList';
import Footer from 'components/Footer/Footer';
import { Launcher, PaletteContainer } from './Palette.styles';

type PaletteState = {
  open: boolean;
  search: string;
  selected: number;
  scoredBookmarks: TransformedBookmark[];
};

type PaletteAction =
  | { type: 'TOGGLE_PALETTE' }
  | { type: 'DISMISS_PALETTE' }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_SELECTED'; payload: number }
  | { type: 'SET_SCORED_BOOKMARKS'; payload: TransformedBookmark[] };

const INITIAL_STATE: PaletteState = {
  open: false,
  search: '',
  selected: 0,
  scoredBookmarks: [],
};

function paletteReducer(state: PaletteState, action: PaletteAction): PaletteState {
  switch (action.type) {
    case 'TOGGLE_PALETTE':
      return {
        ...state,
        open: !state.open,
      };
    case 'DISMISS_PALETTE':
      return {
        ...state,
        search: '',
        selected: 0,
        open: false,
      };
    case 'SET_FILTER':
      return {
        ...state,
        search: action.payload,
        selected: 0,
      };
    case 'SET_SELECTED':
      return {
        ...state,
        selected: action.payload,
      };
    case 'SET_SCORED_BOOKMARKS':
      return {
        ...state,
        scoredBookmarks: action.payload,
      };
    default:
      return state;
  }
}

function Palette() {
  const [state, dispatch] = useReducer(paletteReducer, INITIAL_STATE);
  const bookmarksRef = useRef<TransformedBookmark[]>([]);

  const handleSearchValueChange = useCallback((value: string) => {
    dispatch({ type: 'SET_FILTER', payload: value });
  }, []);

  const handleSelectChange = useCallback((nextSelect: number) => {
    dispatch({ type: 'SET_SELECTED', payload: nextSelect });
  }, []);

  const dismissPalette = useCallback(() => {
    if (!state.open) return;
    dispatch({ type: 'DISMISS_PALETTE' });
  }, [state.open]);

  const togglePalette = useCallback(() => {
    if (state.open) {
      dismissPalette();
    } else {
      dispatch({ type: 'TOGGLE_PALETTE' });
    }
  }, [state.open, dismissPalette]);

  const handleNavigation = useCallback(
    (event: KeyboardEvent) => {
      const isArrowDown = event.key === 'ArrowDown';
      let nextIndex = isArrowDown ? state.selected + 1 : state.selected - 1;

      if (nextIndex >= state.scoredBookmarks.length) {
        nextIndex = 0;
      } else if (nextIndex < 0) {
        nextIndex = state.scoredBookmarks.length - 1;
      }

      dispatch({ type: 'SET_SELECTED', payload: nextIndex });
    },
    [state.selected, state.scoredBookmarks.length],
  );

  const openBookmark = useCallback(() => {
    if (!state.open) return;

    const { url } = state.scoredBookmarks[state.selected];
    if (url) {
      messageBackground({ action: 'bp-open-bookmark-from-palette', url });
    }

    dismissPalette();
  }, [state.open, state.scoredBookmarks, state.selected, dismissPalette]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      event.stopPropagation();

      const key = event.key as SupportedKey;

      switch (key) {
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault();
          handleNavigation(event.nativeEvent);
          return;

        case 'Enter':
          openBookmark();
          return;

        case 'Escape':
          dismissPalette();
          return;

        default:
          return;
      }
    },
    [handleNavigation, openBookmark, dismissPalette],
  );

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await messageBackground({ action: BP_SEARCH_BOOKMARKS });
        const bookmarkResponse = response as { bookmarks: TransformedBookmark[] };
        bookmarksRef.current = bookmarkResponse?.bookmarks || [];

        dispatch({
          type: 'SET_SCORED_BOOKMARKS',
          payload: scoreBookmarks(bookmarksRef.current, state.search),
        });
      } catch (err) {
        console.error('Bookmark palette: failed to fetch bookmarks:', err);
      }
    };

    fetchBookmarks();
  }, []);

  useEffect(() => {
    dispatch({
      type: 'SET_SCORED_BOOKMARKS',
      payload: scoreBookmarks(bookmarksRef.current, state.search),
    });
  }, [state.search]);

  useChromeMessage(BP_TOGGLE_BOOKMARKS_PALETTE, togglePalette);

  const handleLauncherClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (evt.target === evt.currentTarget) {
        dismissPalette();
      }
    },
    [dismissPalette],
  );

  return (
    state.open && (
      <FocusLock>
        <RemoveScroll>
          <Launcher onClick={handleLauncherClick}>
            <PaletteContainer onKeyDown={handleKeyDown}>
              <Filter value={state.search} onValueChange={handleSearchValueChange} />
              <BookmarkList
                bookmarks={state.scoredBookmarks}
                selected={state.selected}
                onSelectChange={handleSelectChange}
                onClickBookmark={openBookmark}
              />
              <Footer
                filteredBookmarkCount={state.scoredBookmarks.length}
                totalBookmarkCount={bookmarksRef.current.length}
              />
            </PaletteContainer>
          </Launcher>
        </RemoveScroll>
      </FocusLock>
    )
  );
}

export default Palette;
