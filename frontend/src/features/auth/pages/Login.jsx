import React, { useState } from 'react'
import "../style/signPage.scss";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const user = useSelector(state=> state.auth.user)
    const loading = useSelector(state=> state.auth.loading)

    const { handleLogin } = useAuth()

   const handleForm = async (e)=>{
        e.preventDefault()

        const payload = {
            email,
            password
        }

        await handleLogin(payload)
        setEmail('')
        setPassword('')
        navigate("/")
    }

     if(!loading && user){
        return <Navigate to="/" replace />
    }


  return (
    <>
    <main>
        <div className="main">
           <div className="logo">
            <h3>Ii</h3>
           </div>
           <div className="content">
             <div className="welcome">
                <div className="welcome-heading">
                    <h2>Welcome!</h2>
                </div>
                <div className="welcome-line"></div>
                <div className="welcome-para">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid error quos ex fugit eius doloribus ullam laudantium nemo, iste facere!</p>
                </div>
                <div className="welcome-btn">
                    <button className='btn'>Learn More</button>
                </div>
            </div>
            <div className="login">
                <div className="login-heading">
                    <h2>Sign </h2>
                    <h2 className='login-line'> in</h2>
                </div>
                <div className="login-form">
                    <form onSubmit={handleForm}>
                        <div className="form-input">
                            
                            <label>User Name</label>

                            <input 
                            type="text" 
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            placeholder='John doe'/>

                        </div>
                        <div className="form-input">

                            <label>Password</label>

                            <input 
                            type="password" 
                            value={password}
                            onChange={(e)=> {setPassword(e.target.value)}}
                            placeholder='faizan'/>

                        </div>
                        <div className="form-btn">
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
                {/* <div className="social-btn">
                </div> */}
            </div>
           </div>
        </div>
    </main>
    </>
  )
}

export default Login