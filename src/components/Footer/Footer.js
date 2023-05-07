import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_RECORDS_SHOWN } from '../../configs/constants';
import * as styles from './Footer.module.css';

Footer.propTypes = {
  filteredBookmarkCount: PropTypes.number,
  totalBookmarkCount: PropTypes.number,
};

function Footer({ filteredBookmarkCount = DEFAULT_RECORDS_SHOWN, totalBookmarkCount }) {
  const searchedResult = `${Math.min(
    filteredBookmarkCount,
    totalBookmarkCount,
  )} / ${totalBookmarkCount}`;

  return (
    <div id={styles.bpFooter}>
      <div id={styles.bpResult}>
        <span id={styles.bpResultInfo}>{searchedResult}</span> results
      </div>
      <div id={styles.bpAction}>
        <div id={styles.bpMark}>
          <span id={styles.bpMarkTextSign}>ESC</span> to close
        </div>
        <div id={styles.bpMark}>
          <span id={styles.bpMarkSign}>⏎</span> to open
        </div>
        <div id={styles.bpMark}>
          <span id={styles.bpMarkSign}>↑</span>
          <span id={styles.bpMarkSign}>↓</span> to navigate
        </div>
      </div>
    </div>
  );
}

export default React.memo(Footer);
