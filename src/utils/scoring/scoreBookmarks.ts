import { commandScore } from './score';
import { DEFAULT_MINIMUM_MATCH } from '../../configs/constants';
import { TransformedBookmark } from 'types';

/**
 * Scores bookmarks based on a given pattern.
 *
 * @param {Array} bookmarks - The array of bookmarks to be scored.
 * @param {string} pattern - The pattern to be used for scoring.
 * @returns {Array} - The array of scored bookmarks.
 */
export default function scoreBookmarks(
  bookmarks: TransformedBookmark[],
  pattern: string,
): TransformedBookmark[] {
  if (!bookmarks?.length) return [];
  if (!pattern || pattern.length < DEFAULT_MINIMUM_MATCH) return bookmarks;

  return bookmarks
    .map((item) => ({
      ...item,
      score: Math.max(commandScore(item.title, pattern), commandScore(item.domain, pattern)),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}
