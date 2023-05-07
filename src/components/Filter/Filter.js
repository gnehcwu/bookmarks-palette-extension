import React from 'react';
import PropTypes from 'prop-types';

import useKeyDown from '../../hooks/useKeyDown';
import * as styles from './Filter.module.css';

Filter.propTypes = {
  filter: PropTypes.string,
  handleFilterChange: PropTypes.func,
};

function Filter({ filter, handleFilterChange }) {
  function handleInput(event) {
    const inputValue = event.target.value;
    handleFilterChange(inputValue);
  }

  function disableArrowUpDownKeys(event) {
    event.preventDefault();
  }

  // Prevent cursor moving in input when navigating with arrow keys
  useKeyDown('ArrowDown', disableArrowUpDownKeys);
  useKeyDown('ArrowUp', disableArrowUpDownKeys);

  return (
    <form id={styles.bpFilterForm}>
      <input
        id={styles.bpFilterInput}
        type="text"
        autoComplete="off"
        placeholder={'Type to search bookmarks by title, domain'}
        value={filter}
        onChange={handleInput}
      />
    </form>
  );
}

export default Filter;
