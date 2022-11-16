import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Switch from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Switch />
    </BrowserRouter>
    <GlobalStyle />
  </>
);
export default App;
