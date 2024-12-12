import React, { useEffect, useCallback } from 'react';
import { FixedSizeList } from 'react-window';
import { TransformedBookmark } from 'types';
import BookmarkItem from './BookmarkItem';
import { Bookmarks, EmptyState, BookmarkVirtualItem } from './Bookmark.styles';

interface BookmarkListProps {
  bookmarks: TransformedBookmark[];
  selected: number;
  onSelectChange: (index: number) => void;
  onClickBookmark: (bookmark: TransformedBookmark) => void;
}

function BookmarkList({ bookmarks, selected, onSelectChange, onClickBookmark }: BookmarkListProps) {
  const bookmarkListRef = React.useRef<FixedSizeList>(null);

  const handleClickBookmark = useCallback(
    (bookmark: TransformedBookmark) => {
      onClickBookmark(bookmark);
    },
    [onClickBookmark]
  );

  const handleSelectChange = useCallback(
    (index: number) => {
      onSelectChange(index);
    },
    [onSelectChange]
  );

  const Row = React.memo(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const bookmark = bookmarks[index];
    return (
      <BookmarkVirtualItem style={style}>
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          active={index === selected}
          onClick={() => handleClickBookmark(bookmark)}
          onSelect={() => handleSelectChange(index)}
        />
      </BookmarkVirtualItem>
    );
  });

  useEffect(() => {
    bookmarkListRef.current?.scrollToItem(selected, 'smart');
  }, [selected]);

  if (!bookmarks || bookmarks.length <= 0) {
    return <EmptyState aria-label="No bookmarks found">🔍 No results found.</EmptyState>;
  }

  return (
    <Bookmarks role="group" aria-label="Bookmark list">
      <FixedSizeList
        ref={bookmarkListRef}
        height={390}
        width="100%"
        itemCount={bookmarks.length}
        itemSize={50}
        overscanCount={5}
      >
        {Row}
      </FixedSizeList>
    </Bookmarks>
  );
}

export default BookmarkList;
