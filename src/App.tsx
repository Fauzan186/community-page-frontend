import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store/store';
import Layout from './components/Layout/Layout';
import theme from './styles/theme';
import Home from './pages/Home/Home';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Home />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
