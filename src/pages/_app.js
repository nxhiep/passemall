import '../styles/index.css'
import '../styles/main.css'
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { wrapper } from '../redux/store';

function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if(typeof window !== 'undefined'){
      const { register } = require('../services/serviceWorker');
      register();
    }
  }, []);

  return (
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default wrapper.withRedux(MyApp)