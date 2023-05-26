import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

Filter.propTypes = {
  filter: PropTypes.string,
  handleFilterChange: PropTypes.func,
};

const Form = styled.form`
  position: relative;
  margin: 0px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid var(--bp-extension-separator);
`;

const Input = styled.input.attrs(() => ({
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

function Filter({ filter, handleFilterChange }) {
  function handleInput(event) {
    const inputValue = event.target.value;
    handleFilterChange(inputValue);
  }

  return (
    <Form>
      <Input
        placeholder={'Type to search bookmarks by title, domain'}
        value={filter}
        onChange={handleInput}
      />
    </Form>
  );
}

export default Filter;
