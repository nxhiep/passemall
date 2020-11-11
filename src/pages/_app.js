import { useEffect } from 'react';
import { Provider, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '../redux/store';
import '../styles/index.css';
import '../styles/main.css';

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);