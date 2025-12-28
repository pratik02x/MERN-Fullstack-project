import React from 'react'
import { Link } from 'react-router'

function Register() {
  return (
    <div className='container w-50'>
            <div class=" mt-3 mb-3">
                <label for="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter name"  required />
            </div>

            <div class="mb-3">
                <label for="inputEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Enter email"  required />
            </div>

            <div className="mb-3">
                <label for="input" className="form-label">Course_id</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Enter password" required />
            </div>

            <div className="mb-3">
                <label for="inputMobile" className="form-label">Mobile</label>
                <input type="tel" className="form-control" id="inputMobile" placeholder="Enter Mobile number"  required />
            </div>


            <div className="mb-3">
                <button className="btn btn-success" onClick={signup}>Signup</button>
            </div>

            <div>
                Already have an account? then to login <Link to='/' >Click Here</Link>
            </div>
        </div>
  )
}

export default Register
