import Fuse from 'fuse.js';
import { DEFAULT_RECORDS_SHOWN, DEFAULT_MINIMUM_MATCH } from '../configs/constants';

const filterOptions = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  includeMatches: true,
  findAllMatches: false,
  threshold: 0.45,
  minMatchCharLength: DEFAULT_MINIMUM_MATCH,
  keys: [
    {
      name: 'title',
      weight: 2,
    },
    'domain',
  ],
};

export default function search(source, pattern) {
  if (!source) return [];

  if (!pattern || pattern.length < DEFAULT_MINIMUM_MATCH) {
    return source.slice(0, DEFAULT_RECORDS_SHOWN).map(({ id, title, url, path, domain }) => {
      return {
        item: {
          id,
          title,
          url,
          domain,
          path,
        },
      };
    });
  }

  const fuse = new Fuse(source, filterOptions);
  return fuse.search(pattern).slice(0, DEFAULT_RECORDS_SHOWN);
}
