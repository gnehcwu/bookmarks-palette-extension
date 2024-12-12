import React from 'react';
import { createRoot } from 'react-dom/client';
import ShadowRoot from '../components/ShadowRoot';
import Palette from '../components/Palette';
import { BP_HOST_ELEMENT_ID } from '../configs/constants';

const bookmarksPaletteHost = document.createElement('div');
document.body.appendChild(bookmarksPaletteHost);
bookmarksPaletteHost.setAttribute(BP_HOST_ELEMENT_ID, '');

// Render extension app into root
const root = createRoot(bookmarksPaletteHost);
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(ShadowRoot, null, React.createElement(Palette, null))
  )
);
