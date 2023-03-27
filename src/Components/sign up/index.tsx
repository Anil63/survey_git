import React from "react";
import { useNavigate } from "react-router-dom";
const Index = () => {

    const navigate = useNavigate()
    const btnRoutes = () =>{
     
      if(localStorage.getItem('user')){
        navigate('/list')

            }
      else{
 
        navigate('/Login')
      }
       
    }
  return (
    <div className="con_f_page">
      <div className="containre_details">
        <div className="con_title">There's a better way to ask</div>
        <div className="con_decrip">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </div>
        <div className="con_btn">
          <span className="con_btn_l" onClick={btnRoutes} >Let's get started</span>
        </div>
      </div>
      <div className="container_img">
        <img
          className="cons_imgs"
          src="https://surveyagency.netlify.app/images/bg.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Index;
