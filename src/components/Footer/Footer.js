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
    <div className={styles.footer}>
      <div className={styles.result}>
        <span className={styles.resultInfo}>{searchedResult}</span> results
      </div>
      <div className={styles.action}>
        <div className={styles.mark}>
          <span className={styles.markTextSign}>ESC</span> to close
        </div>
        <div className={styles.mark}>
          <span className={styles.markSign}>⏎</span> to open
        </div>
        <div className={styles.mark}>
          <span className={styles.markSign}>↑</span>
          <span className={styles.markSign}>↓</span> to navigate
        </div>
      </div>
    </div>
  );
}

export default React.memo(Footer);
