import React from 'react';
import {
  FooterWrapper,
  Result,
  ResultNumber,
  ActionWrapper,
  Action,
  MarkSign,
  TextMarkSign,
} from './Footer.styles';

interface FooterProps {
  filteredBookmarkCount: number;
  totalBookmarkCount: number;
}

const KEYBOARD_SYMBOLS = {
  ENTER: '⏎',
  UP: '↑',
  DOWN: '↓',
  ESC: 'ESC',
} as const;

function Footer({ filteredBookmarkCount, totalBookmarkCount }: FooterProps) {
  const searchedResult = `${Math.min(
    filteredBookmarkCount,
    totalBookmarkCount,
  )} / ${totalBookmarkCount}`;

  return (
    <FooterWrapper role="contentinfo" aria-label="Search results and keyboard shortcuts">
      <Result>
        <ResultNumber aria-label={`Showing ${searchedResult} bookmarks`}>
          {searchedResult}
        </ResultNumber>
      </Result>
      <ActionWrapper>
        <Action>
          <TextMarkSign aria-label="Escape key">{KEYBOARD_SYMBOLS.ESC}</TextMarkSign>
          <span>to close</span>
        </Action>
        <Action>
          <MarkSign aria-label="Enter key">{KEYBOARD_SYMBOLS.ENTER}</MarkSign>
          <span>to open</span>
        </Action>
        <Action>
          <MarkSign aria-label="Up arrow key">{KEYBOARD_SYMBOLS.UP}</MarkSign>
          <MarkSign aria-label="Down arrow key">{KEYBOARD_SYMBOLS.DOWN}</MarkSign>
          <span>to navigate</span>
        </Action>
      </ActionWrapper>
    </FooterWrapper>
  );
}

export default React.memo(Footer);
