import React from "react";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    onAuthStateChanged} from "firebase/auth";
import { auth, filterDoc } from "../firebase/firebase";

const authContext = React.createContext(null);

export const useAuth = () => {
    const context = React.useContext(authContext);
    if (!context) throw new Error("There is no Auth provider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [permissions, setPermissions] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const signUp = async (email, password) =>
        await createUserWithEmailAndPassword(auth, email, password);


    const login = async (email, password) =>
        await signInWithEmailAndPassword(auth, email, password);

    const logout = async () => await signOut(auth);

    const getPermissions = (uuid, doc, key) => {
        return filterDoc(uuid, doc, key);
    }

    React.useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser !== null) {
                const user = {
                    id: '',
                    user: '',
                    tipoUsuario: '',
                }
                getPermissions(currentUser?.uid, "usuarios", "uid").then((data) => {
                    data.forEach((value => {
                        const { tipoUsuario, uid } = value.data();
                        user.id = value.id
                        user.user = uid;
                        user.tipoUsuario = tipoUsuario;
                    }))
                })
                setPermissions(user);
            }
            setLoading(false);
        });
        return () => unsubuscribe();
    }, []);


    return (
        <authContext.Provider
            value={{
                signUp,
                login,
                permissions,
                user,
                logout,
                loading,
            }}
        >
            {children}
        </authContext.Provider>
    );
}