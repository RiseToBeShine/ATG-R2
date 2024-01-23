import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    
    const [newPassword, setNewPassword] = useState()
    const [btnState,setBtnState] = useState('Reset')
    const [err,setErr] = useState('')
    const {id,token} = useParams()

    const handleChangePassword = (e) => {
        setNewPassword(e.target.value)
    }

    const handleSendPassword = () => {
        setBtnState('Resetting')
        axios.post(`https://atr-r2-server.onrender.com/api/auth/reset-password/${id}/${token}`, {password: newPassword})
        .then(res => {
            if(res.data.Status === "Success") {
                console.log('success')
                setBtnState('Done')                 
            }
        }).catch(err => {
            console.log(err)
            setBtnState('Failed')
        })
    }

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
        <Container className='d-flex flex-column' style={{background: '#E6E3EA', borderRadius: '0.7rem', padding: '1rem 2rem'}}>
            <div className='my-2' style={{fontWeight: '600', fontSize: '1rem', textDecoration: 'underline'}}>Reset Password:</div>
            <Form.Control type='password' onChange={handleChangePassword} className='my-2' style={{width: '30rem',fontWeight: '600', fontSize: '0.80rem'}} placeholder='Enter Password'/>
            <Button onClick={handleSendPassword} className='my-2' style={{fontWeight: '600', fontSize: '0.80rem', width: 'fit-content'}} > {btnState} </Button>
            {err}
        </Container>
    </Container>
  )
}

export default ResetPassword
