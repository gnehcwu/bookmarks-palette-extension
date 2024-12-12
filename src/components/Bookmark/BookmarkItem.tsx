import { memo } from 'react';
import { TransformedBookmark } from 'types';
import getFavicon from '../../utils/getFavicon';
import {
  BookmarkItemWrapper,
  BookmarkContent,
  Title,
  Domain,
  Paths,
  Path,
  Icon,
} from './Bookmark.styles';

interface BookmarkItemProps {
  bookmark: TransformedBookmark;
  active: boolean;
  onClick: () => void;
  onSelect: () => void;
}

const Favicon = memo(({ url }: { url: string }) => {
  const iconSrc = getFavicon(url);
  return (
    <Icon 
      src={iconSrc}
      alt="Website favicon"
    />
  );
});

function BookmarkItem({ bookmark, active, onClick, onSelect }: BookmarkItemProps) {
  const { title, path, domain, url } = bookmark;

  const renderPaths = () => {
    if (!path) return null;

    return path
      .split('/')
      .filter(Boolean)
      .map((subPath, idx) => <Path key={`${subPath}-${idx}`}>{subPath}</Path>);
  };

  return (
    <BookmarkItemWrapper
      role="option"
      aria-selected={active}
      aria-label={`${title} - ${domain}`}
      $active={active}
      onClick={onClick}
      onPointerMove={onSelect}
    >
      <Favicon url={url} />
      <BookmarkContent>
        <Title>{title}</Title>
        <Domain>{domain}</Domain>
      </BookmarkContent>
      <Paths>{renderPaths()}</Paths>
    </BookmarkItemWrapper>
  );
}

export default memo(BookmarkItem);
