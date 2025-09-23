import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  _id: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // Create a default user for demo
        const defaultUser = {
          _id: Date.now().toString(),
          username: `user${Math.floor(Math.random() * 1000)}`,
          email: `user${Math.floor(Math.random() * 1000)}@example.com`
        };
        setUser(defaultUser);
        await AsyncStorage.setItem('currentUser', JSON.stringify(defaultUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const updateUser = async (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem('currentUser');
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser: updateUser,
      isLoggedIn: !!user
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
