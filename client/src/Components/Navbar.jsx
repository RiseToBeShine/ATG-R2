import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {UserContext} from '../UserProvider'

import Register from './Register';

function BasicExample({mobile}) {
    const {username, updateUser, updateCurrUserId} = useContext(UserContext)
    const [showRegisterModal,setShowRegisterModal] = useState(false)

    useEffect(()=>{
      if (window.localStorage && window.localStorage.getItem('user') && window.localStorage.getItem('userId')){
        updateUser(window.localStorage.getItem('user'))
        updateCurrUserId(window.localStorage.getItem('userId'))
      }
    })

    const handleLogout = () => {
        updateUser('')
        updateCurrUserId('')
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("userId")

    }

  return (
    <Navbar expand="lg" className="d-flex flex-column">
      <Register
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        mobile={mobile}
      />
      <Container className='py-2 d-flex align-items-center'>
        <Navbar.Brand href="/" className="col">
            <img src="/Static/logo.png" className='' style={{width: '150px'}} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="col-auto" />
        <Navbar.Collapse id="basic-navbar-nav" className="col">
          <Nav className="me-auto w-100">
            <div className="d-flex w-100 justify-content-between align-items-center">
              <input type="text" placeholder="Search your favorite groups in ATG" style={{backgroundColor: '#F2F2F2', fontSize: '0.75rem', fontWeight:'600'}} className="form-control rounded-pill w-50 px-3 h-75 d-flex me-2" />
              <div className='d-flex align-items-center'>
                
                {
                    username!='' ? <div style={{cursor:'pointer'}} onClick={handleLogout}>
                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" style={{width: '2rem'}} alt="" />
                        <span style={{fontWeight: '500'}} className='mx-3'>{username}</span>
                    </div> : <div style={{fontSize: '0.85rem', cursor:'pointer'}} onClick={()=>setShowRegisterModal(!showRegisterModal)}> <span style={{fontWeight: '500'}}>Create Account </span><span className='text-primary' style={{fontWeight: '500'}}>It's Free</span></div>
                }
              <NavDropdown title='' id="basic-nav-dropdown">
                <NavDropdown.Item href="http://localhost:5173/forgot-password">Forgot Password</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </div>
              </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
