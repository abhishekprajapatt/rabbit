import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { appStore } from './redux/store';
import { Toaster } from './components/ui/sonner';
import { useLoadUserQuery } from './features/api/authApi';
import LoadinSpinner from './components/LoadinSpinner';

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoadinSpinner /> : <>{children}</>}</>;
};
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </StrictMode>
);
