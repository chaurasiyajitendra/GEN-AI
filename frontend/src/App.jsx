import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './appRotes.jsx'
import { AuthProvider } from './features/auth/Auth.contex.jsx'
import { InterviewProvider } from './features/ai/Interview.context.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </InterviewProvider>
      </AuthProvider>
    </>
  )
}

export default App
