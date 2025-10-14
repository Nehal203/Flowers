import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const mockUsers = [
    { id: '1', email: 'demo@example.com', password: 'password', full_name: 'Demo User' },
    { id: '2', email: 'test@example.com', password: 'test123', full_name: 'Test User' }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedSession = localStorage.getItem('session');
    
    if (savedUser && savedSession) {
      setUser(JSON.parse(savedUser));
      setSession(JSON.parse(savedSession));
    }
    
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userSession = {
        user: foundUser,
        access_token: 'mock-token-' + Date.now(),
        expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      
      setUser(foundUser);
      setSession(userSession);
      
      localStorage.setItem('user', JSON.stringify(foundUser));
      localStorage.setItem('session', JSON.stringify(userSession));
      
      setLoading(false);
      return { error: null };
    } else {
      setLoading(false);
      return { error: { message: 'Invalid email or password' } };
    }
  };

  const signUp = async (email, password, fullName) => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      setLoading(false);
      return { error: { message: 'User already exists' } };
    }
    
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      email,
      password,
      full_name: fullName
    };
    
    
    const userSession = {
      user: newUser,
      access_token: 'mock-token-' + Date.now(),
      expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    
    setUser(newUser);
    setSession(userSession);
    
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('session', JSON.stringify(userSession));
    
    setLoading(false);
    return { error: null };
  };

  const signOut = async () => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(null);
    setSession(null);
    
    localStorage.removeItem('user');
    localStorage.removeItem('session');
    
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signIn, 
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;