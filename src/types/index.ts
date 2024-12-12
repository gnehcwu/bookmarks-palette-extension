export interface TransformedBookmark {
  id: string;
  title: string;
  url: string;
  domain: string;
  path: string;
}

export type SupportedKey = 'ArrowUp' | 'ArrowDown' | 'Enter' | 'Escape';