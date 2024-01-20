import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import axios from 'axios'

const ForgotPassword = () => {
    axios.defaults.withCredentials=true
    const [email,setEmail] = useState()
    const [err,setErr] = useState()
    const [btnState, setBtnState] = useState('Send Email')

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSendEmail = () => {
        setBtnState('Sending...')
        axios.post('https://atg-r2-api.vercel.app/api/auth/forgot-password', {email: email}).then(()=>{
            console.log('success')
            setBtnState('SendAgain')
            setErr(<div style={{fontSize: '0.75rem', color: 'green', fontWeight: '500'}}>Email Sent...</div>)
        }).catch((err)=>{
            console.log(err)
            setBtnState('SendAgain')
            setErr(<div style={{fontSize: '0.75rem', color: 'red', fontWeight: '500'}}>Try Again...</div>)
        })
    }

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
        <Container className='d-flex flex-column' style={{background: '#E6E3EA', borderRadius: '0.7rem', padding: '1rem 2rem'}}>
            <div className='my-2' style={{fontWeight: '600', fontSize: '1rem', textDecoration: 'underline'}}>Forgot Password:</div>
            <Form.Control onChange={handleChangeEmail} className='my-2' style={{width: '30rem',fontWeight: '600', fontSize: '0.80rem'}} placeholder='Enter your email'/>
            <Button onClick={handleSendEmail} className='my-2' style={{fontWeight: '600', fontSize: '0.80rem', width: 'fit-content'}} > {btnState} </Button>
            {err}
        </Container>
    </Container>
  )
}

export default ForgotPassword
