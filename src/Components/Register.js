import React from 'react'
import "./Register.css"
export default function Register(props) {
  let msgClass =[]
  if(props.type === 1){
    msgClass.push("text-success")
  }else{
    msgClass.push("text-danger")
  }
  return (
    <div>
      <div className="container">
        <div className="card bg-light align-items-center Card-width mt-2">
        <div className='mt-4'><h3><b>Create Account</b></h3></div>
        <div className='mt-1 mb-2'><h6>Get started with your free account.</h6></div>
        <div><p className={msgClass.join('')}>{props.message}</p></div>
        <div><button className="btn fb btn-width" type="button">Login with Facebook</button></div>
        <div><button className="btn google mt-2 btn-width" type="button" onClick={props.google}>Login with Google</button></div>
        <hr/>
        <div className='col-sm-6'>
            <form className='form-group' onSubmit={props.register}>
               <div className='mb-3'> <input type="email" name="email" className='form-control' placeholder='Email address'/></div>
               <div className='mb-3'> <input type="password" name="password" className='form-control' placeholder='Password'/></div>
               <div className='mb-3'> <input type="password" name="confirmPassword" className='form-control' placeholder='Confirm your Password'/></div>
               <div><button className="btn btn-primary btn-width" type="submit">Create Account</button></div>
            </form>
        </div>
        <div className='mt-3 flex'><h6>Already have account? <span className='text-primary' onClick={props.switch}>LogIn</span></h6></div>
        </div>
      </div>
    </div>
  )
}
