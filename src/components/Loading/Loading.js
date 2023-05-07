import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Loading.module.css';

Loading.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  delegated: PropTypes.object,
};

function Loading({ children, className = '', ...delegated }) {
  const loadingClassName = `${styles.bpLoadingCircle} ${className}`;
  return (
    <>
      <span {...delegated} className={loadingClassName}></span>
      {children}
    </>
  );
}

export default Loading;
