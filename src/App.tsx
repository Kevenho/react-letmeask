import { BrowserRouter, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { firebase, firebaseAuth } from './services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInwithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  async function signInwithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await firebaseAuth.signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user; 
        
        if (!displayName || !photoURL) {
          throw new Error('User info is not completed from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
    } 
  }

  return (
  <BrowserRouter>
   <AuthContext.Provider value={{ user, signInwithGoogle }}>
    <Route path="/" exact component={Home} />
    <Route path="/rooms/new" component={NewRoom} />
   </AuthContext.Provider>
  </BrowserRouter>
  );
}

export default App;
