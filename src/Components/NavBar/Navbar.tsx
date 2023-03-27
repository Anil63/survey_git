import { type } from "os";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
interface usertype {
  name: string;
  picture: any | string;
}
const defaultdata: usertype = {
  name: "",
  picture: "",
};

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUset] = useState(defaultdata);
  const [show , setShow] = useState(Boolean)
const users =  useSelector((state:any)=>state.Users.user)
// console.log("cheuser",user)
  useEffect(() => {
    let users: any = localStorage.getItem("user");

    let c = JSON.parse(users);
    if(c){
      setUset(c);
      setShow(true)
    }
   
  }, [users]);

  const handleSignOut =  () =>{
    localStorage.removeItem('user')
    setUset(defaultdata)
    setShow(false)
    navigate("/")
  } 
  return (
    <div>
      <main className="nav_main">
        <nav className="nav_nav">
          <ul className="nav_ul">
            <li className="nav_li" id="logo" onClick={() => navigate("/")}>
              <img
                className="img"
                src="https://surveyagency.netlify.app/images/logo.png"
                alt=""
              />{" "}
              SurveyAgency
            </li>
            <li className="nav_li">
              {" "}
              {show  === true ? (
                <div className="user_info">
                  <img className="user_img" src={user.picture}></img>
                  <h3>{user.name}</h3> 
                  <button onClick={handleSignOut} className="login_btn">Logout </button>
                </div>
              ) : (
                <button
                  className="login_btn"
                  onClick={() => navigate("/Login")}
                >
                  Login{" "}
                </button>
              )}{" "}
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default Navbar;
