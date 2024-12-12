import styled from "styled-components";

export const Form = styled.form`
  position: relative;
  margin: 0px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid var(--bp-extension-separator);
`;

export const Input = styled.input.attrs(() => ({
  type: 'text',
  autoComplete: 'off',
}))`
  box-shadow: none;
  outline: none;
  border: none;
  border: none;
  outline: none;
  font-family: var(--bp-extension-font-sans);
  caret-color: var(--bp-extension-brand);

  width: 100%;
  margin: 16px 16px 8px 16px;
  padding: 8px;
  font-size: 1.85em;
  color: var(--bp-extension-text-primary);
  background-color: transparent;

  &::placeholder {
    color: var(--bp-extension-text-info);
  }

  &:focus,
  &:active {
    outline: none;
  }
`;