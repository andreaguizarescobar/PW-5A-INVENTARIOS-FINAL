import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
/*import App from './App.jsx'*/
import './share/css/allPages.css'
import AppAllModules from './AppAllModules';
import './index.css'
import { Provider } from "react-redux";
import store from '../src/ecommerce/redux/store/store';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />*/}
    <Provider store={store}>
      <AppAllModules /> 
    </Provider>
  </StrictMode>,
)

