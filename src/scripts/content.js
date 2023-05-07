import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Palette from '../components/Palette';

// Inject root for extension
const bookmarksPaletteHost = document.createElement('div');
document.body.appendChild(bookmarksPaletteHost);
bookmarksPaletteHost.setAttribute('id', 'bookmarks-palette-host');

// Render extension app into root
const root = createRoot(bookmarksPaletteHost);
root.render(
  <StrictMode>
    <Palette />
  </StrictMode>,
);
