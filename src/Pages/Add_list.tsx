import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , NavLink} from 'react-router-dom'
import { ListItem, Delete_List } from "../Components/Redux/Action/Action";

const Add_list: React.FC = () => {
  const Dispatch = useDispatch();
  const [List , setList] = useState<any>();
  const list = useSelector((state: any) => state.Lists.List);
  const use = useSelector((state:any)=>state.Users.user)  
  const navigate = useNavigate()
  const Delete_redux = (id: any) => {
    Dispatch(Delete_List(id));
  };

  useEffect(()=>{
    fetch(`http://localhost:3004/AddListener`).then((res)=>res.json().then((data)=>setList(data)))
  },[use ,list])

  return (
    <div>
      <div className="list_div">
        <div className="list_items">
          <div className="create_from">
            <h3 className="create_title">New Survey Form</h3>
            <div className="create_icon">
              <i
                className="fa-solid fa-plus"
                onClick={() => Dispatch(ListItem("My Survey"))}
              ></i>
            </div>
          </div>

          {/* this is result */}

          {List ? List.map(
            ( list: { Title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; id: number; }, index: number
            ) => {
              return (
                <div className="created_from" key={index}>
                  <div className="create_from_name"><NavLink to={`/Create/${list.id}`} className="Nav_create_file"> {list?.Title}</NavLink></div>
                  <div className="create_from_control">
                    <span>no response </span>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() =>Delete_redux(list.id)}
                    ></i>
                  </div>
                </div>
              );
            }
          ):"check"}
        </div>
      </div>
    </div>
  );
};

export default Add_list;
