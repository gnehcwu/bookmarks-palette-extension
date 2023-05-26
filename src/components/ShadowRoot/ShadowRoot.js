import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { createPortal } from 'react-dom';
import cssText from 'bundle-text:./ShadowRoot.css';

ShadowRoot.propTypes = {
  children: PropTypes.element,
};

function ShadowRoot({ children }) {
  const shadowElementRef = React.useRef(null);
  const onceMountRef = React.useRef(false);
  const [shadowRoot, setShadowRoot] = React.useState(null);

  React.useEffect(() => {
    const shadowElement = shadowElementRef.current;
    if (shadowElement && onceMountRef.current === false) {
      onceMountRef.current = true;
      const attachedShadowRoot = shadowElement.attachShadow({ mode: 'open' });
      setShadowRoot(attachedShadowRoot);

      const styleElement = document.createElement('style');
      styleElement.setAttribute('type', 'text/css');
      styleElement.textContent = cssText;
      attachedShadowRoot.appendChild(styleElement);
    }
  }, []);

  return (
    <div ref={shadowElementRef}>
      {shadowRoot &&
        createPortal(
          <StyleSheetManager target={shadowRoot}>{children}</StyleSheetManager>,
          shadowRoot,
        )}
    </div>
  );
}

export default ShadowRoot;
