import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

Favicon.propTypes = {
  url: PropTypes.string,
};

const Icon = styled.img`
  --favicon-size: 18px;
  width: var(--favicon-size);
  height: var(--favicon-size);
`;

function Favicon({ url }) {
  function faviconURL(pageUrl) {
    const faviconUrl = new URL(chrome.runtime.getURL('/_favicon/'));
    faviconUrl.searchParams.set('pageUrl', pageUrl);
    faviconUrl.searchParams.set('size', '32');
    return faviconUrl.toString();
  }

  return <Icon src={faviconURL(url)} alt="bookmark favicon" />;
}

export default React.memo(Favicon);
