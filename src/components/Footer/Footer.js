import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { DEFAULT_RECORDS_SHOWN } from '../../configs/constants';

const FooterWrapper = styled.div`
  padding: 16px;
  border-top: 1px solid var(--bp-extension-separator);
  color: var(--bp-extension-text-secondary);

  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
  justify-content: right;
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
  font-size: 1.25em;
`;

const ResultNumber = styled.span`
  color: var(--bp-extension-brand);
  font-weight: 600;
`;

const ActionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 24px;
  justify-content: right;
  font-size: 1.15em;
`;

const Action = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: 6px;
  align-items: center;
`;

const MarkSign = styled.span`
  padding: 3px 5px;
  font-size: 1em;
  display: inline-grid;
  place-content: center;
  background-color: var(--bp-extension-surface-info);
  border-radius: 4px;
  line-height: 100%;
`;

const TextMarkSign = styled(MarkSign)`
  padding: 5px;
  font-size: 0.85em;
`;

Footer.propTypes = {
  filteredBookmarkCount: PropTypes.number,
  totalBookmarkCount: PropTypes.number,
};

function Footer({ filteredBookmarkCount = DEFAULT_RECORDS_SHOWN, totalBookmarkCount }) {
  const searchedResult = `${Math.min(
    filteredBookmarkCount,
    totalBookmarkCount,
  )} / ${totalBookmarkCount}`;

  return (
    <FooterWrapper>
      <Result>
        <ResultNumber>{searchedResult}</ResultNumber> results
      </Result>
      <ActionWrapper>
        <Action>
          <TextMarkSign>ESC</TextMarkSign> to close
        </Action>
        <Action>
          <MarkSign>⏎</MarkSign> to open
        </Action>
        <Action>
          <MarkSign>↑</MarkSign>
          <MarkSign>↓</MarkSign> to navigate
        </Action>
      </ActionWrapper>
    </FooterWrapper>
  );
}

export default React.memo(Footer);
