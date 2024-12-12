import { createGlobalStyle } from 'styled-components';

export const ShadowRootStyle = createGlobalStyle`
  :host {
    --bp-extension-font-sans: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans,
        sans-serif, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
    --bp-extension-shadow-color: 220 3% 15%;
    --bp-extension-layer-important: 2147483648;
    --bp-extension-shadow: 0 -1px 2px 0 hsl(var(--bp-extension-shadow-color) /
            calc(var(--bp-extension-shadow-strength) + 2%)),
        0 2px 1px -2px hsl(var(--bp-extension-shadow-color) /
            calc(var(--bp-extension-shadow-strength) + 3%)),
        0 5px 5px -2px hsl(var(--bp-extension-shadow-color) /
            calc(var(--bp-extension-shadow-strength) + 3%)),
        0 10px 10px -2px hsl(var(--bp-extension-shadow-color) /
            calc(var(--bp-extension-shadow-strength) + 4%)),
        0 20px 20px -2px hsl(var(--bp-extension-shadow-color) /
            calc(var(--bp-extension-shadow-strength) + 5%)),
        0 40px 40px -2px hsl(var(--bp-extension-shadow-color) /
            calc(var(--bp-extension-shadow-strength) + 7%));

    --bp-extension-brand-light: #5c7cfa;
    --bp-extension-text-primary-light: #50514f;
    --bp-extension-text-secondary-light: #7e8282;
    --bp-extension-text-info-light: #b1b6b9;
    --bp-extension-surface-primary-light: #f8fafb;
    --bp-extension-surface-backdrop-light: rgba(208, 213, 215, 0.75);
    --bp-extension-surface-info-light: #d1d6d8;
    --bp-extension-surface-content-light: #ebedef;
    --bp-extension-separator-light: #ebedef;
    --bp-extension-shadow-strength-light: 2%;

    /* dark */
    --bp-extension-brand-dark: #91a7ff;
    --bp-extension-text-primary-dark: #ced4da;
    --bp-extension-text-secondary-dark: #adb5bd;
    --bp-extension-text-info-dark: #868e96;
    --bp-extension-surface-primary-dark: #212529;
    --bp-extension-surface-backdrop-dark: rgba(3, 5, 7, 0.75);
    --bp-extension-surface-info-dark: #495057;
    --bp-extension-surface-content-dark: #343a40;
    --bp-extension-separator-dark: #495057;
    --bp-extension-shadow-strength-dark: 6%;
    }

    :host {
    /* set defaults */
    --bp-extension-brand: var(--bp-extension-brand-light);
    --bp-extension-text-primary: var(--bp-extension-text-primary-light);
    --bp-extension-text-secondary: var(--bp-extension-text-secondary-light);
    --bp-extension-text-info: var(--bp-extension-text-info-light);
    --bp-extension-surface-primary: var(--bp-extension-surface-primary-light);
    --bp-extension-surface-backdrop: var(--bp-extension-surface-backdrop-light);
    --bp-extension-surface-info: var(--bp-extension-surface-info-light);
    --bp-extension-surface-content: var(--bp-extension-surface-content-light);
    --bp-extension-separator: var(--bp-extension-separator-light);
    --bp-extension-shadow-strength: var(--bp-extension-shadow-strength-light);
    }

    @media (prefers-color-scheme: dark) {
    :host {
        --bp-extension-brand: var(--bp-extension-brand-dark);
        --bp-extension-text-primary: var(--bp-extension-text-primary-dark);
        --bp-extension-text-secondary: var(--bp-extension-text-secondary-dark);
        --bp-extension-text-info: var(--bp-extension-text-info-dark);
        --bp-extension-surface-primary: var(--bp-extension-surface-primary-dark);
        --bp-extension-surface-backdrop: var(--bp-extension-surface-backdrop-dark);
        --bp-extension-surface-info: var(--bp-extension-surface-info-dark);
        --bp-extension-surface-content: var(--bp-extension-surface-content-dark);
        --bp-extension-separator: var(--bp-extension-separator-dark);
        --bp-extension-shadow-strength: var(--bp-extension-shadow-strength-dark);
    }
  }
`;
