function transformBookmarks(bookmarkNodes = [], parent = '', bookmarks = []) {
  for (let item of bookmarkNodes) {
    if (item.children) {
      const path = parent ? `${parent}/${item.title}` : item.title;
      transformBookmarks(item.children, path, bookmarks);
    } else {
      bookmarks.push({
        id: item.id,
        title: item.title,
        url: item.url,
        domain: new URL(item.url).hostname,
        path: parent,
      });
    }
  }

  return bookmarks;
}

async function extractBookmarks() {
  const bookmarkNodes = await chrome.bookmarks.getTree();

  // Only take bookmarks bar & other bookmarks if possible
  return transformBookmarks(bookmarkNodes[0]?.children.slice(0, 2));
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
async function notifyContent(action) {
  const activeTab = await getActiveTab();

  if (activeTab.url.includes('chrome://') || activeTab.url.includes('chrome.google.com')) return;

  chrome.tabs.sendMessage(activeTab.id, { action });
}

// Listener for clicking on extension icon
chrome.action.onClicked.addListener(function () {
  notifyContent('bp-toggle-bookmarks-palette');
});

// Listener for registered command
chrome.commands.onCommand.addListener((command) => {
  if (command === 'bp-toggle-bookmarks-palette') {
    notifyContent('bp-toggle-bookmarks-palette');
  }
});

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === 'bp-search-bookmarks') {
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

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  const { action, url } = request || {};

  if (action === 'bp-open-bookmark-from-palette') {
    chrome.tabs.create({ url, active: true }).then(({ openerTabId }) => {
      sendResponse({ openerTabId });
    });

    return true;
  }
});
