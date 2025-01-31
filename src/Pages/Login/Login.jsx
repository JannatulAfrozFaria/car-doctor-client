import img from '../../assets/images/login/login.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import React, { useContext } from 'react';
// import { AuthContext } from '../../Providers/AuthProvider';
import useAuth from '../../Hooks/useAuth';


const Login = () => {
    const {signIn} = useAuth();
    // const {signIn} = useContext(AuthContext)
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();
    const handleLogin = (event) =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        
        signIn(email,password)
        .then(result=>{
            const loggedInUser = result.user;
            const user = {email}
            // navigate(location?.state?location?.state:'/')
            
            //get access token
            axios.post('https://car-doctor-server-dun-tau.vercel.app/jwt',user,{withCredentials: true})
            .then(res =>{
                console.log(res.data)
                if(res.data.success){
                    navigate(location?.state?location?.state:'/')
                }
            })

        })
        .catch(error=>console.log(error))
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className=" mx-auto w-1/2">
                    <img className='mx-auto ' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login now!</h1>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"  name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className='btn bg-red-600 text-white' type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='my-4 text-center'>New to Car Doctors? <Link to="/signup"className='text-red-600 font-bold' >Sign Up!</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;