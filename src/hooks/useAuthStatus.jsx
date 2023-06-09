import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { useEffect } from 'react';

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkStatus, setCheckStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
      setCheckStatus(false);
    })
  }, [])
  return { loggedIn, checkStatus }
};

{/* when returning two things, don't export as default */}