import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {PreView_Action} from './../Components/Redux/Action/Action'

import {
  PlusCircleOutlined,
  FieldNumberOutlined,
  StarOutlined,
  MailOutlined,
  DashOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  Choicefild,
  Deltechoice,
} from "../Components/Redux/Action/Action";
import Setting from "./Setting";
import View from "./View";

const Create = () => {
  const [showchoince, setShowchoince] = useState(false);
  const [selected, setSelecte] = React.useState<any>();
  const { id } = useParams();
  const Dispatch = useDispatch();
  const Fild = useSelector((state: any) => state.Choice.Choicesfield);


  const choice = Fild.filter((i: any) => i.Prent_id === id);

  

  const ChoicesFildes = () => {
    setShowchoince(true);
  };

  const choices = (choice: string) => {
    const choiceData: {
      id: string | undefined;
      choice: string;
    } = { id: id, choice };
    Dispatch(Choicefild(choiceData));
    setShowchoince(false);
   
  };

  useEffect(()=>{

    const choiceData: {
      id: string | undefined;
      choice: string
    } = { id: id, choice:"MultipleChoice" };
    Dispatch(Choicefild(choiceData));
  } , [])
  const LayoutSelected = (e: any) => {
    console.log("Layout Selected", e);
  };

  return (
    <div>
      <div className="create_containte">
        <div className="create_con">
          <div className="contect_bar">
            <span>Content</span>
            <span className="contec_plus_icon" onClick={ChoicesFildes}>
              <i className="fa-solid fa-plus"></i>
            </span>
            {showchoince === true ? (
              <div className="menu">
                <ul className="menu_ul">
                  <li
                    className="menu_li"
                    onClick={() => {
                      choices("MultipleChoice");
                      setSelecte("");
                    }}
                  >
                    <i className="fa-solid fa-check"></i>{" "}
                    <span className="menu_span">MultipleChoice</span>
                  </li>
                  <li
                    className="menu_li"
                    onClick={() => {
                      choices("Textbox");
                      setSelecte("");
                    }}
                  >
                    {" "}
                    <DashOutlined /> <span className="menu_span">
                      Textbox
                    </span>{" "}
                  </li>
                  <li
                    className="menu_li"
                    onClick={() => {
                      choices("Date");
                      setSelecte("");
                    }}
                  >
                    {" "}
                    <i className="fa-regular fa-calendar"></i>{" "}
                    <span className="menu_span">Date</span>
                  </li>
                  <li
                    className="menu_li"
                    onClick={() => {
                      choices("Feedback");
                      setSelecte("");
                    }}
                  >
                    {" "}
                    <StarOutlined />
                    <span className="menu_span">Feedback</span>
                  </li>
                  <li
                    className="menu_li"
                    onClick={() => {
                      choices("Textarea");
                      setSelecte("");
                    }}
                  >
                    <i className="fa-solid fa-align-center"></i>{" "}
                    <span className="menu_span">Textarea</span>
                  </li>
                  <li
                    className="menu_li"
                    onClick={() => {
                      choices("Number");
                      setSelecte("");
                    }}
                  >
                    <FieldNumberOutlined />{" "}
                    <span className="menu_span">Number</span>
                  </li>
                  <li
                    className="menu_li"
                    onClick={() => {
                      choices("Email");
                      setSelecte("");
                    }}
                  >
                    <MailOutlined />
                    <span className="menu_span">Email</span>
                  </li>
                  <li
                    className="menu_li"
                    onClick={() => {
                      choices("Website");
                      setSelecte("");
                    }}
                  >
                    <i className="fa-solid fa-link"></i>{" "}
                    <span className="menu_span">Website</span>
                  </li>
                  <li
                    className="menu_li"
                    onClick={() => {
                      choices("Phone");
                      setSelecte("");
                    }}
                  >
                    <i className="fa-solid fa-phone"></i>{" "}
                    <span className="menu_span">Phone</span>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="choiceFilds">
            <div className="choicefild">
              {choice
                ? choice.map(
                    (i: { choice: string; id: number }, Index: any) => {
                      let c =
                        i.choice === "MultipleChoice" ? (
                          <i className="fa-solid fa-check"></i>
                        ) : i.choice === "Textbox" ? (
                          <DashOutlined />
                        ) : i.choice === "Date" ? (
                          <i className="fa-regular fa-calendar"></i>
                        ) : i.choice === "Feedback" ? (
                          <StarOutlined />
                        ) : i.choice === "Textarea" ? (
                          <i className="fa-solid fa-align-center"></i>
                        ) : i.choice === "Number" ? (
                          <FieldNumberOutlined />
                        ) : i.choice === "Email" ? (
                          <MailOutlined />
                        ) : i.choice === "Website" ? (
                          <i className="fa-solid fa-link"></i>
                        ) : i.choice === "Phone" ? (
                          <i className="fa-solid fa-phone"></i>
                        ) : (
                          ""
                        );
                      let inde = Index + 1;
                      return (
                        <li className="ch_option" key={Index}>
                          <span
                            className="ch_icon"
                            onClick={() => setSelecte(i.id)}
                          >
                            {c} <span className="index_number">{inde} </span>
                          </span>

                          <PlusCircleOutlined
                            id="deleteIcons"
                            onClick={() => Dispatch(Deltechoice(i.id))}
                          />
                        </li>
                      );
                    }
                  )
                : ""}
            </div>
          </div>
        </div>
        <div className="create_resu">
          <div className="view">
            <View id={id} AddFild={selected} />
          </div>
        </div>
        <div className="create_list_setring">
          <Setting id={id} selected={selected} />
        </div>
      </div>
    </div>
  );
};

export default Create;
