import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Favicon.module.css';

Favicon.propTypes = {
  url: PropTypes.string,
};

function Favicon({ url }) {
  function faviconURL(pageUrl) {
    const faviconUrl = new URL(chrome.runtime.getURL('/_favicon/'));
    faviconUrl.searchParams.set('pageUrl', pageUrl);
    faviconUrl.searchParams.set('size', '32');
    return faviconUrl.toString();
  }

  return <img id={styles.bpFavicon} src={faviconURL(url)} alt="bookmark favicon" />;
}

export default Favicon;
