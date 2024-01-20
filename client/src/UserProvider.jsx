import React, { createContext, useState } from 'react';

export const UserContext = createContext()
const UserProvider = ({ children }) => {
  
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState('')
  const [currUserId, setCurrUserId] = useState('')

  const updateUser = (newUsername) => {
    setUsername(newUsername);
  }

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  }

  const updateCurrUserId = (newUserId) => {
    setCurrUserId(newUserId)
  }

  return (
    <UserContext.Provider value={{ username, updateUser, profile, updateProfile, currUserId, updateCurrUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
