import React, { useLayoutEffect, useState, useRef, useContext } from 'react'
import { Modal, Button, Container, Form, Col, Row } from 'react-bootstrap';
import imgw from '/Static/create-clip.png'
import {UserContext} from '../UserProvider'
import axios from 'axios'

function Register(props) {
    const {username, updateUser, currUserId, updateCurrUserId} = useContext(UserContext)
    const [login,setLogin] = useState(false)
    const modalRef = useRef(null)
    const height = 455
    const [err,setErr] = useState()
    const BASEURL = 'http://localhost:8800/api/'
    
    axios.defaults.withCredentials = true
    const [registerForm, setRegisterForm] = useState({
        name: '',
        img: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })



    const handleClick = () => {

    }

    const handleRegister = async() => {
        if(registerForm.name !== '' && registerForm.email !== '' && registerForm.password !== ''){
            if(registerForm.password == registerForm.confirmPassword){
                const url = BASEURL + 'auth/register'
                const submitForm = await axios.post(url,{
                    name: registerForm.name,
                    avatarUrl: registerForm.img,
                    email: registerForm.email,
                    password: registerForm.password
                }).then((res)=>{
                    updateUser(registerForm.name)
                    setErr(<span style={{fontSize:'0.65rem', fontWeight:'500', color: 'green'}}> User Register Successful... </span>)
                    console.log(res)
                })
                .catch((err)=>{
                    setErr(<span style={{fontSize:'0.65rem', fontWeight:'500', color: 'red'}}> Registration failed... </span>)
                    console.log('err',err)
                })
            } else {
                // !! SET THIS
                console.log("Passwords Not Matched")
                setErr(<span style={{fontSize:'0.65rem', fontWeight:'500', color: 'red'}}> Password Not Matched </span>)
            }
        } else {
            // !! SET THIS
            console.log("Enter the data")
            setErr(<span style={{fontSize:'0.65rem', fontWeight:'500', color: 'red'}}> Data Not Entered </span>)
        }
        
    }

    const handleRegisterChange = (e) => {
        const {name, value} = e.target
        setRegisterForm((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const handleLoginChange = (e) => {
        const {name,value} = e.target
        setLoginForm((prev)=> ({...prev,[name]:value}))
    }

    const handleSignIn = async () => {
        const url = BASEURL + 'auth/login';
        try {
            await axios.post(url,{email: loginForm.email, password: loginForm.password})
            .then((res)=>{
                updateUser(res.data.name)
                updateCurrUserId(res.data._id)
                window.localStorage.setItem('user',res.data.name)
                window.localStorage.setItem('userId',res.data._id)
                console.log(res.data._id)
                setErr(<span style={{fontSize:'0.65rem', fontWeight:'500', color: 'green'}}> Sign In successfull </span>)
            })
            .catch((error)=>{
                console.log('error posting', error)
                setErr(<span style={{fontSize:'0.65rem', fontWeight:'500', color: 'red'}}> Sign In failed </span>)
            })
        } catch (error) {
            console.log(error)
            setErr(<span style={{fontSize:'0.65rem', fontWeight:'500', color: 'red'}}> Sign In failed </span>)
        }
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        ref={modalRef}
        >
        <div className={`w-100 d-flex ${props.mobile ? 'align-items-center justify-content-center' :'flex-column'} `} style={{ position:'relative',background: '#EFFFF4', color:'#008A45', fontSize:'0.72rem', fontWeight: '600', padding:'10px 14px', borderTopRightRadius:'inherit', borderTopLeftRadius:'inherit'}}>
            <span className='align-self-center'>Let's learn, share & inspire each other with our passion for computer engineering. Sign up now 🤘🏼</span>
            {
                props.mobile ?
                <button onClick={props.onHide} className='' style={{alignSelf:'end', background:'black',color:'white', padding:'2px 7px', fontWeight:'700', borderRadius:'100%', border:'none'}}>X</button>
                :
                <button onClick={props.onHide} className='' style={{position:'absolute',transform: 'translateY(-2.6rem) translateX(1.1rem)' ,alignSelf:'end', background:'white', padding:'2px 7px', fontWeight:'700', borderRadius:'100%', border:'none'}}>X</button>
            } 
        </div>
        <Container>
            <div className='d-flex w-full align-items-center justify-content-between' style={{padding: '0rem 1.5rem', marginTop:'1rem'}}>
                <span style={{fontSize:'1.4rem',fontWeight:'700'}}>{!login ? 'Create Account' : 'Sign In'}</span>
                {
                    props.mobile
                    ?
                    <></>
                    :
                    <div>
                        <span style={{fontSize:'0.74rem', fontWeight:'500'}}> {!login ? 'Already have an account?' : "Don't have an account yet?"} </span>
                        <span style={{fontSize:'0.74rem', fontWeight:'500', cursor:'pointer'}} onClick={()=>setLogin(!login)} className='text-primary'>{!login?'SignIn':'Create new for Free'}</span>
                    </div>
                }
            </div>
        </Container>
        <Container className='d-flex w-100' style={{minHeight: 'fit-content', marginTop: '1rem'}}>
            <Container className='' style={{flex:1}}>
                    {
                        !login 
                        ?
                        <Form>
                            <Row className='g-0'>
                                <Col >
                                    <Form.Control onChange={handleRegisterChange} name='name' style={{borderRadius:'0px', background:'#F7F8FA', border:'1px solid #D9D9DB', fontWeight:'500', fontSize:'0.75rem', color: '#8A8A8A', padding:'0.5rem 0.8rem'}} placeholder='Name'/>
                                </Col>
                                <Col>
                                    <Form.Control onChange={handleRegisterChange} name='img' type='file' style={{borderRadius:'0px', background:'#F7F8FA', border:'1px solid #D9D9DB', fontWeight:'500', fontSize:'0.75rem', color: '#8A8A8A', padding:'0.5rem 0.8rem'}} placeholder='Avatar'/>
                                </Col>
                            </Row>
                            <Row className='g-0'>
                                <Form.Control onChange={handleRegisterChange} name='email' style={{borderRadius:'0px', background:'#F7F8FA', border:'1px solid #D9D9DB', fontWeight:'500', fontSize:'0.75rem', color: '#8A8A8A', padding:'0.5rem 0.8rem'}} placeholder='Email'/>
                            </Row>
                            <Row className='g-0'>
                                <Form.Control onChange={handleRegisterChange} type='password' name='password' style={{borderRadius:'0px', background:'#F7F8FA', border:'1px solid #D9D9DB', fontWeight:'500', fontSize:'0.75rem', color: '#8A8A8A', padding:'0.5rem 0.8rem'}} placeholder='Password'/>
                            </Row>
                            <Row className='g-0'>
                                <Form.Control onChange={handleRegisterChange} type='password' name='confirmPassword' style={{borderRadius:'0px', background:'#F7F8FA', border:'1px solid #D9D9DB', fontWeight:'500', fontSize:'0.75rem', color: '#8A8A8A', padding:'0.5rem 0.8rem'}} placeholder='Confim Password'/>
                            </Row>
                            {
                                props.mobile?
                                <Row className='g-0 my-4 d-flex'>
                                    <Col>
                                        <Button variant='primary' className='rounded-pill' onClick={()=>handleRegister}>Create Account</Button>
                                    </Col>
                                    <Col className='d-flex align-items-center justify-content-end' style={{fontSize:'0.75rem', fontWeight:'500'}}>
                                        <span className='' style={{textDecoration:'underline', cursor:'pointer'}} onClick={()=>setLogin(!login)}>or, Sign IN</span>
                                    </Col>
                                </Row>
                                :
                                <Row className='g-0'>
                                    <Button variant='primary' className='rounded-pill my-4' onClick={()=>handleRegister()}>Create Account</Button>
                                </Row>
                            }
                            {err}
                            
                        </Form>
                        :
                        <Form>
                            <Row className='g-0'>
                                <Form.Control onChange={handleLoginChange} name='email' style={{borderRadius:'0px', background:'#F7F8FA', border:'1px solid #D9D9DB', fontWeight:'500', fontSize:'0.75rem', color: '#8A8A8A', padding:'0.5rem 0.8rem'}} placeholder='Email'/>
                            </Row>
                            <Row className='g-0'>
                                <Form.Control onChange={handleLoginChange} name='password' type='password' style={{borderRadius:'0px', background:'#F7F8FA', border:'1px solid #D9D9DB', fontWeight:'500', fontSize:'0.75rem', color: '#8A8A8A', padding:'0.5rem 0.8rem'}} placeholder='Password'/>
                            </Row>
                            {
                                props.mobile?
                                <Row className='g-0 my-4 d-flex'>
                                    <Col>
                                        <Button variant='primary' className='rounded-pill' onClick={()=>handleSignIn}>SignIn</Button>
                                    </Col>
                                    <Col className='d-flex align-items-center justify-content-end' style={{fontSize:'0.75rem', fontWeight:'500'}}>
                                        <span className='' style={{textDecoration:'underline', cursor:'pointer'}} onClick={()=>setLogin(!login)}>or, Create a new account</span>
                                    </Col>
                                </Row>
                                :
                                <Row className='g-0'>
                                    <Button variant='primary' className='rounded-pill my-4'  onClick={()=>handleSignIn()}>SignIn</Button>
                                </Row>
                                
                            }
                            {err}

                        </Form>
                    }

                <div className='d-flex border border-black-50 justify-content-center py-2 align-items-center' style={{borderRadius: '3px'}}>
                    <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" style={{width:'1rem'}} alt="" />
                    <span style={{fontSize:'0.70rem', fontWeight:'500', marginLeft:'0.8rem'}} onClick={()=>handleClick()}>Sign up with facebook</span>
                </div>
                <div className='d-flex border border-black-50 justify-content-center py-2 align-items-center' onClick={()=>handleClick()} style={{borderRadius: '3px', marginBottom:'2rem', marginTop:'0.7rem'}}>
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png" style={{width:'1rem'}} alt="" />
                    <span style={{fontSize:'0.70rem', fontWeight:'500', marginLeft:'0.8rem'}}>Sign up with google</span>
                </div>
            </Container>
            {
                !props.mobile ?
                <Container className='d-flex justify-content-center align-items-center flex-column' style={{flex:1}}>
                        <img src={imgw} style={{width: '16rem', marginBottom:''}} alt="" />
                        <span style={{fontSize: '0.6rem',fontWeight:'500', marginTop:'1rem'}}>{!login ? 'By signing up, you agree to our Terms & conditions, Privacy policy': ''}</span>
                    </Container>
                :
                <></>
                
            }
        </Container>
      </Modal>
    );
  }

export default Register