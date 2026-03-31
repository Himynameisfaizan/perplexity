import React from 'react'
import "./style/signPage.scss";


const Login = () => {
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
                    <form>
                        <div className="form-input">
                            <label>User Name</label>
                            <input type="text" value='John doe'/>
                        </div>
                        <div className="form-input">
                            <label>Password</label>
                            <input type="password" value='faizan'/>
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