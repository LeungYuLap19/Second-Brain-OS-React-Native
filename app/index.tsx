import React, { useState } from 'react'
import { Redirect } from 'expo-router';

export default function Index() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  if (!isAuth) {
    return <Redirect href='/(auth)' />
  }

  return <Redirect href='/(tabs)' />
}