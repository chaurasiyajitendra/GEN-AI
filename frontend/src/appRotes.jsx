import {createBrowserRouter} from'react-router';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Protect from './features/auth/components/Protect';
import Upload from './features/ai/Pages/Upload';
import Interview from './features/ai/Pages/Interview';
import Home from './features/ai/Pages/Home';
import Profile from './features/auth/pages/Profile';
import GenResume from './features/ai/components/GenResume';
import EditProfile from './features/auth/components/EditProfile';


export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protect><Upload /></Protect>
    },
    {
        path:"/inter/:interviewId",
        element:<Protect><Interview /></Protect>
    },
    {
        path:"/home",
        element:<Protect><Home /></Protect>
    },
    {
        path:"/profile",
        element:<Protect><Profile /></Protect>
    },
    {
        path:"/edit/:userID",
        element: <Protect><EditProfile /></Protect>
    },

])