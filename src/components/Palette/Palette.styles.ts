import styled from 'styled-components';

export const Launcher = styled.div`
  color-scheme: light;
  all: initial;
  -webkit-text-size-adjust: none;
  position: fixed;
  inset: 0;
  z-index: var(--bp-extension-layer-important);
  font-family: var(--bp-extension-font-sans);
  background-color: rgba(0, 0, 0, 0.2);

  display: grid;
  place-content: center;
  grid-template-columns: minmax(640px, 1fr);
  justify-items: center;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
    place-content: center;
  }

  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & *,
  & ::after,
  & ::before {
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: no-preference) {
    scroll-behavior: smooth;
  }

  @media (prefers-color-scheme: dark) {
    color-scheme: dark;
  }
`;

export const PaletteContainer = styled.div`
  position: relative;
  background-color: var(--bp-extension-surface-primary);
  border-radius: 12px;
  box-shadow: var(--bp-extension-shadow-strength);
  animation-duration: 125ms;
  width: min(789px, 100vw);
  height: 520px;
  box-shadow: var(--bp-extension-shadow);

  display: grid;
  grid-template-rows: min-content 1fr min-content;
  font-size: 10px;

  @media (prefers-color-scheme: dark) {
    border: 1px solid var(--bp-extension-separator);
  }

  --scale: scale 175ms ease-in-out;
  transform-origin: center center;
  animation: var(--scale);

  @keyframes scale {
    0% {
      transform: scale(0.99);
    }
    100% {
      transform: scale(1);
    }
  }
`;
