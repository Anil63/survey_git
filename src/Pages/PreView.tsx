import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useSelector } from "react-redux";
import View from "./View";

export interface IPreViewProps {}

export default function PreView(props: IPreViewProps) {
  const Fild = useSelector((state: any) => state.PreViewReducer.Preview);
  console.log("view", Fild);
  return (
    <div>
    <View id={undefined} AddFild={""}/>
    </div>
  );
}
