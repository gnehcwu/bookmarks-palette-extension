import React from 'react';
import { StyleSheetManager } from 'styled-components';
import { createPortal } from 'react-dom';
import { ShadowRootStyle } from './ShadowRoot.styles';

interface ShadowRootProps {
  children: React.ReactElement;
}

const ShadowRoot: React.FC<ShadowRootProps> = ({ children }) => {
  const shadowElementRef = React.useRef<HTMLDivElement | null>(null);
  const onceMountRef = React.useRef<boolean>(false);
  const [shadowRoot, setShadowRoot] = React.useState<ShadowRoot | null>(null);

  React.useEffect(() => {
    const shadowElement = shadowElementRef.current;
    if (shadowElement && onceMountRef.current === false) {
      onceMountRef.current = true;
      const attachedShadowRoot = shadowElement.attachShadow({ mode: 'open' });
      setShadowRoot(attachedShadowRoot);
    }
  }, []);

  return (
    <div ref={shadowElementRef}>
      {shadowRoot &&
        createPortal(
          <StyleSheetManager target={shadowRoot}>
            <>
              <ShadowRootStyle />
              {children}
            </>
          </StyleSheetManager>,
          shadowRoot
        )}
    </div>
  );
};

export default ShadowRoot;
