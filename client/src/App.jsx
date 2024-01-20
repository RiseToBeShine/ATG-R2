import React, { useEffect, useState } from 'react'
import UserProvider from './UserProvider'
import Navbar from './Components/Navbar'
import AllPosts from './Pages/AllPosts'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Comments from './Pages/Comments';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';


const App = () => {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    if(window.innerWidth <= 768){
      setMobile(true)
    }
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <UserProvider>
        <Navbar mobile={mobile}/>
        <Router>
          <Routes>
            <Route exact path="/" element={<AllPosts mobile={mobile} />}></Route>
            <Route exact path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route exact path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
            <Route path="/post/:id" element={<Comments mobile={mobile}/>}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  )
}

export default App