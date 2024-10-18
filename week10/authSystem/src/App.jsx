/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import AppBar from './components/Appbar';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider, useAuth } from './context/AuthContext';

// State Lifting Approach
const AppWithStateLift = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser({ username });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar username={user?.username} />
      {user ? <Home /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

// Context API Approach
const AppWithContext = () => {
  const { user, login } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar username={user?.username} />
      {user ? <Home /> : <Login onLogin={login} />}
    </div>
  );
};

const App = () => {
  const [approach, setApproach] = useState('stateLift');

  return (
    <div>
      <div className="bg-gray-200 p-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${approach === 'stateLift' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setApproach('stateLift')}
        >
          State Lifting
        </button>
        <button
          className={`px-4 py-2 rounded ${approach === 'context' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setApproach('context')}
        >
          Context API
        </button>
      </div>
      {approach === 'stateLift' ? (
        <AppWithStateLift />
      ) : (
        <AuthProvider>
          <AppWithContext />
        </AuthProvider>
      )}
    </div>
  );
};

export default App;