import { useContext } from "react"
import { AuthContex } from "../Auth.contex"
import {login, register, logout,profile, updateUser, changePassowrd} from '../services/auth.api'

export const useAuth = () =>{

    const context = useContext(AuthContex);
    const {user,setUser,loading,setLoading} = context;

    const handleLogin = async({email,password}) =>{
         setLoading(true)
         try {

             const data = await login({email,password});
             setUser(data.user);
             return data ;
         } catch (err) {
            throw new Error(err);
            
         }finally{
             setLoading(false);
         }
    }

    const handleRegistre = async ({name,email,password,phoneNumber, location, bio, education}) =>{
        setLoading(true);
        try {
            
            const data = await register({name,email,password,phoneNumber, location, bio, education});
            setUser(data.user);
            return data;

        } catch (err) {

            throw new Error (err);

        }finally{
            setLoading(false);
        }
    }

    const handleLogout = async () =>{
        
        setLoading(true);

        try {
            const data = await logout();
            setUser(null)
            return data;
        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false);
        }

    }

    const handelProfile = async () =>{
        setLoading(true);
        try {
            const data = await profile();
            setUser(data.user);
            return data.user;
        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handelUpdateUSer = async (userData) =>{
        setLoading(true);
        try {
            const data = await updateUser(userData);
            setUser(data.user);
            return data.user;
        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handleChangePassword = async (passwordData) =>{
        setLoading(true)
        try {
            const data = await changePassowrd(passwordData);
            // setUser(data.user)
            return data.user
        } catch (error) {
            console.log(error);
            
        }finally{
            setLoading(false)
        }
    }




    return{ user,loading,handleRegistre,handleLogin,handleLogout,handelProfile,handelUpdateUSer,handleChangePassword}

}