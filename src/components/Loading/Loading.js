import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

Loading.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  delegated: PropTypes.object,
};

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.span`
  display: inline-block;
  border: 2px solid var(--bp-extension-surface-info);
  border-top-color: var(--bp-extension-brand);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  border-width: 1.5px;
  animation: ${rotate} 1s linear infinite;
  transform-origin: center;
`;

function Loading({ children, className = '', ...delegated }) {
  return (
    <>
      <Rotate {...delegated} className={className} />
      {children}
    </>
  );
}

export default Loading;
