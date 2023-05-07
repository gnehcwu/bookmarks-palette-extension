import React from 'react';

function useKeyDown(key, callback) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === key) {
        callback(event);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
}

export default useKeyDown;
