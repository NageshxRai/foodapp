import React, {useState} from 'react'
import { Link, Navigate, json } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email:'',password:''})
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
        const response = await fetch('http://localhost:5000/api/loginuser', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password})
        })
        // console.log(credentials.email + "Login email is this");
        const data = await response.json()
        if(data.success === true ){
          localStorage.setItem("userEmail", credentials.email);
          localStorage.setItem("authToken", data.authToken);
          console.log(data, 'this is data')
        }else{
          alert('Enter Valid Credentials')
        }
        setCredentials({email:'',password:''})
        setRedirect(true)
    }

    const onChangeHandler = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value })
    }
    if(redirect){
         return <Navigate to={'/'} />
  }
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' id='email' value={credentials.email} onChange={onChangeHandler}  aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id='password' value={credentials.password} onChange={onChangeHandler} />
        </div>
        
        <button type="submit" className="m-3 btn btn-primary">Login</button>
        <Link to='/signup' className="m-3 btn btn-danger">Create a user</Link>
    </form>

   
    </div>
  )
}

export default Login