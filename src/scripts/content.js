import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ShadowRoot from '../components/ShadowRoot';
import Palette from '../components/Palette';

// Inject root for extension
const bookmarksPaletteHost = document.createElement('div');
document.body.appendChild(bookmarksPaletteHost);
bookmarksPaletteHost.setAttribute('bookmarks-palette-host', '');

const styleElement = document.createElement('style');
styleElement.setAttribute('type', 'text/css');
styleElement.textContent = `
  .bp-extension-opened {
    padding-right: ${window.innerWidth - document.documentElement.offsetWidth}px !important;
    overflow: hidden !important;
  }
`;
document.head.appendChild(styleElement);

// Render extension app into root
const root = createRoot(bookmarksPaletteHost);
root.render(
  <StrictMode>
    <ShadowRoot>
      <Palette />
    </ShadowRoot>
  </StrictMode>,
);
