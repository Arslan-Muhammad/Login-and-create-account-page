import React from 'react'

export default function Login(props) {
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
        <div className='mt-4'><h4><b>Login</b></h4></div>
        <div><p className={msgClass.join('')}>{props.message}</p></div>
        <div><button className="btn fb btn-width" type="button">Login with Facebook</button></div>
        <div><button className="btn google mt-2 btn-width" type="button">Login with Google</button></div>
        <hr/>
        <div className='col-sm-6'>
            <form className='form-group' onSubmit={props.login}>
               <div className='mb-3'> <input type="email" name="email" className='form-control' placeholder='Email address'/></div>
               <div className='mb-3'> <input type="password" name="password" className='form-control' placeholder='Password'/></div>
               <div><button className="btn btn-primary btn-width" type="submit">Login</button></div>
            </form>
        </div>
        <div className='mt-3'><h6><a href='#'onClick={props.switch}>Create</a> an account</h6></div>
        </div>
      </div>
    </div>
  )
}
