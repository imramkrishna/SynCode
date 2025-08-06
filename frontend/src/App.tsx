import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store, RootState } from './store';
import Login from './pages/Login';
import Editor from './pages/Editor';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to="/editor" />} 
        />
        <Route 
          path="/editor" 
          element={isAuthenticated ? <Editor /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/editor" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppContent />
      </div>
    </Provider>
  );
}

export default App;