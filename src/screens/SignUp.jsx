import React, {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'

const SignUp = () => {
    const [credentials, setCredentials] = useState({name:'', email:'',password:'',address:''})
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.address})
        })
        const data = await response.json()
        console.log(data)
        if(!data.success){
            alert('Enter Valid Credentials')
        }
        setCredentials({name:'', email:'',password:'',address:''})
        setRedirect(true)
    }

    const onChangeHandler = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value })
    }

    if(redirect){
        return <Navigate to={'/login'} />
    }

  return (
    <>
    <div>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' id='name' value={credentials.name} onChange={onChangeHandler}/>
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' id='email' value={credentials.email} onChange={onChangeHandler}  aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id='password' value={credentials.password} onChange={onChangeHandler} />
        </div>
        <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" name='address' id="address" value={credentials.address} onChange={onChangeHandler} />
        </div>
        <button type="submit" className="m-3 btn btn-primary">Submit</button>
        <Link to='/login' className="m-3 btn btn-danger">Already a user</Link>
    </form>
    <Link to={'/'}>Back</Link>
    </div>
  
    </>
  )}


export default SignUp