// src/AuthContext.tsx
import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {auth} from './firebase/firebase';
import {onAuthStateChanged, User} from "firebase/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({user: null, loading: true});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe; // Make sure we un-subscribe on component unmount
    }, []);

    return (
        <AuthContext.Provider value={{user, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
