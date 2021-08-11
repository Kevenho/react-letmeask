import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, firebaseAuth} from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
}
  
  type AuthContextType = {
    user: User | undefined;
    signInwithGoogle: () => Promise<void>;
}  

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider (props : AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => { 
      const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          const { displayName, photoURL, uid } = user; 
          
          if (!displayName || !photoURL) {
            throw new Error('User info is not completed from Google Account.');
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
        return () => {
          unsubscribe();
        };
      })
    }, []);
  
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
<AuthContext.Provider value={{ user, signInwithGoogle }}>
    {props.children}
</AuthContext.Provider>
    );
}