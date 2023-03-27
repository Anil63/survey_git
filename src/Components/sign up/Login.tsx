import React, { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import {Loginset} from '../Redux/Action/Action'
import {useDispatch ,useSelector} from 'react-redux'
import { useNavigate  } from "react-router-dom";


interface usertype {
  name: string;
  picture: any | string;
}
const defaultdata: usertype = {
  name: "",
  picture: "",
};
declare global {
  const google: typeof import("google-one-tap");
}

interface tsd {
 
}
const Login = () => {
  const [user, setUser] = useState(defaultdata);
  const [btn , setbtn] = useState<any>()

  const googleButton: any = useRef(null);
  
  const navigate  = useNavigate()
  const dipatch =  useDispatch()
  const use = useSelector((state:any)=>state.Users.user)
  useEffect(() => {
    if (!googleButton.current) return;
    if(localStorage.getItem('user')){
      navigate('/list')
    }
    const elemScript = document.createElement("script");
    elemScript.src = "https://accounts.google.com/gsi/client";
    elemScript.async = true;
    elemScript.defer = true;
    document.body.append(elemScript);

    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "457908389260-pvoro5skq6apfromim242aqrndpmr9kj.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
   
     
      google.accounts.id.renderButton(googleButton.current, {
        theme: "outline",
        size: "large",
      });

      // google.accounts.id.prompt();
    };

    return () => {
      document.body.removeChild(elemScript);
    };
    
  }, [googleButton]);

  function handleCredentialResponse(response: any) {
    // console.log("Encoded JWT ID token: " + response.credential);
    let userObject: any = jwt_decode(response.credential);
    setUser(userObject);
  
    dipatch(Loginset(userObject))
    localStorage.setItem("user",JSON.stringify(userObject))
    googleButton.current.hidden = true;
    navigate('/list')
    
  }

  const handleSignOut = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setUser(defaultdata);
    googleButton.current.hidden = false;


  };
  return (
    <div>
      <div className="login_div">
        <span className="login_title">Login with your account</span>
        <div ref={googleButton}></div>
        {Object.keys(user.name).length != 0 && (
          <button onClick={handleSignOut}>Sign out</button>
        )}
        {user && (
          <div>
            <img src={user.picture}></img>
            
            <h3>{user.name}</h3>
          </div>
        )}
       
      </div>
    </div>
  );
};

export default Login;


