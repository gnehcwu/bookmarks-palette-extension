import { BP_TOGGLE_BOOKMARKS_PALETTE, BP_SEARCH_BOOKMARKS } from '../configs/constants';
import type { TransformedBookmark } from '../types';

function transformBookmarks(
  bookmarkNodes: chrome.bookmarks.BookmarkTreeNode[] = [], 
  parent: string = '', 
  bookmarks: TransformedBookmark[] = []
): TransformedBookmark[] {
  for (let item of bookmarkNodes) {
    if (item.children) {
      const path = parent ? `${parent}/${item.title}` : item.title;
      transformBookmarks(item.children, path, bookmarks);
    } else {
      bookmarks.push({
        id: item.id as string,
        title: item.title,
        url: item.url as string,
        domain: new URL(item.url as string).hostname,
        path: parent,
      });
    }
  }

  return bookmarks;
}

async function extractBookmarks() {
  const bookmarkNodes = await chrome.bookmarks.getTree();
  return transformBookmarks(bookmarkNodes[0]?.children || []);
}

/**
 * Get currently active browser tab
 * @returns current active tab
 */
async function getActiveTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

/**
 * Notify content script with given action type
 */
async function notifyContent(action: string): Promise<void> {
  const activeTab = await getActiveTab();

  if (!activeTab?.id || activeTab.url?.includes('chrome://') || activeTab.url?.includes('chrome.google.com')) return;

  chrome.tabs.sendMessage(activeTab.id, { action });
}

// Listener for clicking on extension icon
chrome.action.onClicked.addListener(function () {
  notifyContent(BP_TOGGLE_BOOKMARKS_PALETTE);
});

// Listener for registered command
chrome.commands.onCommand.addListener((command) => {
  if (command === BP_TOGGLE_BOOKMARKS_PALETTE) {
    notifyContent(BP_TOGGLE_BOOKMARKS_PALETTE);
  }
});

chrome.runtime.onMessage.addListener((
  request: { action: string; url?: string }, 
  _, 
  sendResponse: (response: { bookmarks?: TransformedBookmark[]; openerTabId?: number }) => void
) => {
  if (request.action === BP_SEARCH_BOOKMARKS) {
    extractBookmarks()
      .then((bookmarks) => {
        sendResponse({ bookmarks });
      })
      .catch(() => {
        sendResponse({ bookmarks: [] });
      });

    // To keep message channel alive until response returned
    return true;
  }
});

chrome.runtime.onMessage.addListener((
  request: { action: string; url?: string }, 
  sender,
  sendResponse: () => void
) => {
  const { action, url } = request || {};

  if (action === 'bp-open-bookmark-from-palette') {
    chrome.tabs.create({ url });
    sendResponse();
    return false;
  }
});
