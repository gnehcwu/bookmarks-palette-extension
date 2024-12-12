import styled from 'styled-components';

export const FooterWrapper = styled.div`
  padding: 16px;
  border-top: 1px solid var(--bp-extension-separator);
  color: var(--bp-extension-text-secondary);

  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
  justify-content: right;
`;

export const Result = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
  font-size: 1.25em;
`;

export const ResultNumber = styled.span`
  color: var(--bp-extension-brand);
  font-weight: 600;
`;

export const ActionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 24px;
  justify-content: right;
  font-size: 1.15em;
`;

export const Action = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: 6px;
  align-items: center;
`;

export const MarkSign = styled.span`
  padding: 3px 5px;
  font-size: 1em;
  display: inline-grid;
  place-content: center;
  background-color: var(--bp-extension-surface-info);
  border-radius: 4px;
  line-height: 100%;
`;

export const TextMarkSign = styled(MarkSign)`
  padding: 5px;
  font-size: 0.85em;
`;