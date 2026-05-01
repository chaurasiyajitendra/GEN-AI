import { createContext, useEffect, useState } from "react";
import { profile } from "./services/auth.api";

export const AuthContex = createContext();

export const AuthProvider = ({children}) =>{
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
            const data = await profile();
            setUser(data.user);
            } catch (err) {
            setUser(null); // logout state
            } finally {
            setLoading(false); // ALWAYS run
            }
        };

        getAndSetUser();
    }, []);
    

    return(
        <AuthContex.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContex.Provider>
    )

}