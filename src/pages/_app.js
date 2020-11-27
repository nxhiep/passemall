import React from 'react';
import { wrapper } from '../redux/store';
import '../styles/index.css';
import '../styles/main.css';

function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if(typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const { register } = require('../serviceWorker');
      register()
    }
  }, []);

  return (
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default wrapper.withRedux(MyApp)