import React from 'react';
import ReactDOM from 'react-dom';
import { css, Global } from '@emotion/react'
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const wrapperStyle = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #232946;
    color: #fffffe;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  * {
    margin: 0;
    padding: 0;
  }
`

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Global styles={wrapperStyle} />
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
