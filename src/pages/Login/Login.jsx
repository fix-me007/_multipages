import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form';
import { verifyUser } from '../../data/user';

export default function Login({ setToken,setRole }) {
  const userRef = useRef()
  const passRef = useRef()
  return (
    <div className='container'>
      <div className='w-25 mx-auto mt-5'>
        <div className=''>
          <img src="lo.jpg" alt="image for login" className="rounded w-100 mb-2" />
        </div>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          id="username"
          placeholder="user"
          ref={userRef}
        />
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword5"
          placeholder="pass"
          ref={passRef}
        />
        <button class="btn btn-primary mt-4" onClick={() => {
          const user = userRef.current.value.trim()
          const pass = passRef.current.value.trim()
          userRef.current.value = ''
          passRef.current.value = ''
          const userInfo = verifyUser(user, pass)
          if (userInfo === null) {
            alert("sadasd")
            userRef.current.focus()
          } else {
            setToken(userInfo.token)
            setRole(userInfo.role)
          }
        }}>login</button>
      </div>
    </div>
  )
}
