
import React from 'react';
import PropTypes from 'prop-types';

import './Snippet.css';

const Snippet = ( { text } ) => (
  <pre className="snippet">
    <code>
      { text.trim() }
    </code>
  </pre>
);

Snippet.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Snippet;
