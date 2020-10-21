import '../styles/index.css'
import '../styles/main.css'
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  );
}