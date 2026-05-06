import axios from 'axios'

const api  = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
});

export async function register({name,email,password,phoneNumber,location,bio,education}) {
    try{
        const res = await api.post("/api/auth/register",{
            name, email, password,phoneNumber,location,bio,education
        });

        return res.data;

    }catch(err){
        throw err.response?.data?.message || "Registration failed";
    }
}

export async function login({email,password}) {
    try {
        const res = await api.post("/api/auth/login",{
            email, password
        });

        return res.data;
        
    } catch (err) {
        throw err.response?.data?.message || "Login  failed";
    }
}

export async function logout() {
    try {

        const res = await api.get("/api/auth/logout")

        return res.data
        
    } catch (err) {
        console.log(err);
    }
}

export async function profile() {
    try {    
        const res = await api.get("/api/auth/profile")
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export async function updateUser(userData) {

    try {
        const res = await api.post("/api/auth/edit",userData);

        return res.data;
        
    } catch (err) {
        throw err.response?.data?.message || "Login  failed";
    }
    
}

export async function changePassowrd(passwordData) {
    try {
        const res = await api.post("/api/auth/changepass",passwordData)
        return res.data;
    } catch (err) {
        throw err.response?.data?.message || "Login  failed";
    }
}

export async function genOtp() {
    try{
        const res = await api.get("/api/auth/genotp");
        return res.data
    }catch(err){
      throw err.response?.data?.message || "Otp Genration failed";  
    }
}

export async function payOut({otp,plan}) {
    try {
        const res = await api.post("/api/auth/pay",{otp,plan})
        return res.data
    } catch (err) {
      throw err.response?.data?.message || "Varifaction faild";   
    }
}