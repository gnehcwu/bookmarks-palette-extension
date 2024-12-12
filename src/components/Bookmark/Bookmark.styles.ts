import styled from 'styled-components';

export const Bookmarks = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  list-style: none;
  margin: 0px;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;

  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  scroll-padding-block: 8px;
  overscroll-behavior: contain;
`;

export const EmptyState = styled.p`
  color: var(--bp-extension-text-info);
  font-size: 2em;
  font-weight: 600px;
  display: grid;
  place-content: center;
`;

export const BookmarkVirtualItem = styled.div`
  padding: 0px 12px;
`;

export const BookmarkItemWrapper = styled.div<{ $active: boolean }>` 
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

export const BookmarkContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8em;
`;

export const Title = styled.span`
  color: var(--bp-extension-text-primary);
  font-size: 1.6em;
  word-break: break-all;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Domain = styled(Title)`
  opacity: 0.75;
  font-size: 1.25em;
  color: var(--bp-extension-text-secondary);
`;

export const Paths = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: end;
  grid-column-gap: 8px;
  align-items: center;
  color: var(--bp-extension-text-secondary);
  line-height: 1.3em;
`;

export const Path = styled.span`
  background-color: var(--bp-extension-surface-info);
  border-radius: 4px;
  padding: 5px 7px;
  font-size: 1.15em;
  white-space: nowrap;
`;

export const Icon = styled.img`
  --favicon-size: 18px;
  display: inline-block;
  border-radius: 4px;
  width: var(--favicon-size);
  height: var(--favicon-size);
`;