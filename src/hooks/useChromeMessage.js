import React from 'react';

function useChromeMessage(action, callback) {
  React.useEffect(() => {
    function handleMessage(request) {
      if (request.action === action) {
        callback();
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [action, callback]);
}

export default useChromeMessage;
