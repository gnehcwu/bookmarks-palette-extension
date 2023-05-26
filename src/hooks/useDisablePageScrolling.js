import React from 'react';

function useDisablePageScrolling(shouldDisable) {
  React.useEffect(() => {
    if (!shouldDisable) return;

    document.body.classList.add('bp-extension-opened');

    return () => {
      document.body.classList.remove('bp-extension-opened');
    };
  }, [shouldDisable]);
}

export default useDisablePageScrolling;
