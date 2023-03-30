import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import View from "./View";

export interface IPreViewProps {}

export default function PreView(props: IPreViewProps) {
  const [fildata , setData ] = useState()
  const [track , setTrack ] = useState<any>(0)
  const [list , setL ] = useState()
  const Fild = useSelector((state: any) => state.PreViewReducer.Preview);
  console.log("view", Fild  );

 useEffect(()=>{
    fetch(`http://localhost:3004/qution`).then((res)=>res.json().then((data)=>setData(data)))
   
  },[Fild])



console.log(Fild[track])


  return (
  <>
   <View id={undefined} AddFild={""} dataInserted={fildata}  FildSet={Fild[track]}  />
   <div className="btn_controls">
   <Button className="btn_b_con_Ap" shape="circle"  onClick={()=> setTrack(track !== Fild.length -1 ? track +1 : Fild.length -1)}>
     <ArrowUpOutlined />
   </Button>
   <Button className="btn_b_con_Dn" shape="circle" onClick={()=> setTrack(track >= 1 ?track -1 : 0 )}>
     <ArrowDownOutlined />
   </Button>
 </div>
  </>
   
    
  );
}


