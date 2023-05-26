import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

Highlight.propTypes = {
  indices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  source: PropTypes.string,
};

const HighlightContent = styled.span`
  color: var(--bp-extension-brand);
`;

function Highlight({ indices, source }) {
  const wrapIndicesInSpan = React.useCallback((indicesArr, str) => {
    // Sort the indicesArr by start position
    indicesArr.sort((a, b) => a[0] - b[0]);

    let result = [];
    let currentIndex = 0;

    for (const [start, end] of indicesArr) {
      // Append the part of the string before the current match
      result.push(str.slice(currentIndex, start));

      // Wrap the current match in a span and push it to the result array
      const matched = str.slice(start, end + 1);
      result.push(<HighlightContent key={start}>{matched}</HighlightContent>);

      currentIndex = end + 1;
    }

    // Append the remaining part of the string after the last match
    result.push(str.slice(currentIndex));

    return result;
  }, []);

  return <>{wrapIndicesInSpan(indices, source)}</>;
}

export default Highlight;
