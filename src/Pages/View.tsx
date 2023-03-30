import * as React from "react";
import { ForwardOutlined, DeleteOutlined ,CheckOutlined  } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AddNotes, DeleteLis, Qution_Ans } from "../Components/Redux/Action/Action";
import dayjs from "dayjs";

export interface IAppProps {
  id: any;
  AddFild: string;
  dataInserted: any;
  Permition?: boolean;
  FildSet?: any;
}

interface RootSate {
  Choice: { Choicesfield: string };
}
enum Choice {
  MaltiChoice = "MultipleChoice",
  TexBox = "Textbox",
  Date = "Date",
  FeetBack = "Feedback",
  TextArea = "Textarea",
  NumberInput = "Number",
  EmailInput = "Email",
  WebsiteInput = "Website",
  PhoneInput = "Phone",
}

export default function View(props: IAppProps) {
  const [Layout, setLayout] = React.useState();
  const [file, setImg] = React.useState<any>();
  const [shoe, setShow] = React.useState(false);
  const [choice, setChoice] = React.useState<Choice | string>(
    Choice.MaltiChoice
  );
  const layoutset = useSelector((state: any) => state.Layouts.Layout);
  const ImgUp = useSelector((state: any) => state.ImgRecent.imgUpload);

  // Redux state
  const chFld: any = useSelector(
    (state: RootSate) => state.Choice.Choicesfield
  );
  const lastValue: any = Object.values(chFld).pop();

  const selectfild = chFld.filter(
    (i: { id: string }) => i.id === props.AddFild
  );

  // end

  const upload = () => {
    let c: any = [];
    c.push(ImgUp);

    let imgfind = ImgUp.filter(
      (i: { Pre_id: string }) => i.Pre_id === props.id
    );

    if (imgfind[0] === undefined) {
    } else {
      setImg(imgfind[0].img);
      setShow(true);
    }
  };

  React.useEffect(() => {
    setLayout(layoutset);

    // if (!props.AddFild) {
    //   let selet = lastValue
    //     ? lastValue.choice && selectfild.length === 0
    //       ? lastValue.choice
    //       : selectfild[0].choice
    //     : "MultipleChoice";
    //   setChoice(selet);
    // } else {
    //   setChoice(chFld.find((i: any) => i.id === props.AddFild)?.choice);
    // }

    upload();
    let set = props.dataInserted
      ? props.FildSet.fild_choice
      : !props.AddFild
      ? lastValue
        ? lastValue.choice && selectfild.length === 0
          ? lastValue.choice
          : selectfild[0].choice
        : "MultipleChoice"
      : chFld.find((i: any) => i.id === props.AddFild)?.choice;

    setChoice(set);
  }, [layoutset, chFld, props.AddFild, selectfild, upload]);

  return (
    <div>
      <div className={"Layout_one_" + Layout}>
        <div className="img_com">
          {shoe === true ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded img"
              className="view_img"
            />
          ) : (
            <img
              className="view_img"
              src={"https://surveyagency.netlify.app/images/bg-img.jpg"}
              alt=""
            />
          )}
        </div>
        <div className="decription">
          {choice === "MultipleChoice" && (
            <MaltiChoice Filddata={lastValue} InsertedData={props.dataInserted}  afterset={props.FildSet} />
          )}
          {choice === "Textbox" && (
            <TexBox Filddata={lastValue} InsertedData={props.dataInserted}  afterset={props.FildSet}/>
          )}
          {choice === "Date" && (
            <Date Filddata={lastValue} InsertedData={props.dataInserted}  afterset={props.FildSet}/>
          )}
          {choice === "Feedback" && (
            <Feetdback Filddata={lastValue} InsertedData={props.dataInserted} afterset={props.FildSet} />
          )}
          {choice === "Textarea" && (
            <TextArea Filddata={lastValue} InsertedData={props.dataInserted}  afterset={props.FildSet}/>
          )}
          {choice === "Number" && (
            <NumberInput
              Filddata={lastValue}
              InsertedData={props.dataInserted}
              afterset={props.FildSet}/>
          )}
          {choice === "Email" && (
            <EmailInput
              Filddata={lastValue}
              InsertedData={props.dataInserted}
              afterset={props.FildSet}/>
          )}
          {choice === "Website" && (
            <WebsiteInput
              Filddata={lastValue}
              InsertedData={props.dataInserted}
              afterset={props.FildSet}
              />
          )}
          {choice === "Phone" && (
            <PhoneInput
              Filddata={lastValue}
              InsertedData={props.dataInserted}
              afterset={props.FildSet}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface MaltiChoice_type {
  Filddata: any;
  InsertedData: any;
  afterset:any
}

export const MaltiChoice = (props: MaltiChoice_type) => {
  const [form] = Form.useForm();
  const [cont, setcont] = React.useState(false);
  const [notes, setNotes] = React.useState<string>("");
  const [ chec , setcheck] = React.useState(false);
  const { InsertedData } = props;

  const [list, setlist] = React.useState([
    <Input
      className="multiple-choice_input"
      bordered={false}
      onChange={(e) => console.log(e.target.value)}
    />,
  ]);

  const dispatch = useDispatch();
  const dataEntered = useSelector((state: any) => state.PreViewReducer.Preview);
  const AddListItem = useSelector((state: any) => state.AddListItem.Addlist);

  const AddlistFilter = AddListItem.filter((i: { Pre_id: string; }) => i.Pre_id ===  props.Filddata.Prent_id)
  // use Effect to create

  React.useEffect(() => {
    const filter = InsertedData?.filter(
      (i: any) =>
        i.url_id === props.Filddata.Prent_id && (i.fild_id === props.Filddata.id ||i.fild_id === props.afterset.Fild_id )
    );
    if (filter !== undefined) {
      console.log(filter); 
      setcont(true);
      
      form.setFieldsValue({
        qution: filter[0]?.qution,
        Description: filter[0]?.Description,
      });
    } else {
      form.setFieldsValue({ qution: "..." });
      setcont(false);
    }
  }, [dataEntered, InsertedData]);
  // End

  const Add_Choice = () => {
  
    dispatch(AddNotes( notes,props.Filddata.Prent_id))
  };
  const Delete_Choice = (index: number) => {
    let newList = list.filter((item, i) => i !== index);
    setlist(newList);
  };

  const onFinish = (e: any): void => {
    const { qution, Description } = e;
    const { id, choice, Prent_id } = props.Filddata;

    const MaltiChoice = {
      qution,
      Description,
      fild_id: id,
      fild_choice: choice,
      url_id: Prent_id,
    };
    dispatch(Qution_Ans(MaltiChoice));
  };

  const CheckHander = () =>{
    setcheck(chec === false ? true : false);
    console.log("thus is click")
  }

  return (
    <>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="qution">
              <Input
                className="view_qution_input_f"
                placeholder="..."
                disabled={cont}
                bordered={false}
              />
            </Form.Item>
            <Form.Item name="Description">
              <Input
                className="view_qution_input_f"
                placeholder="Description (optional)"
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <button type="submit"></button>
          </Form>
        </div>
      </div>
      <div className="multiple-choice">
        <div className="multiple-choice__wrapper">
         {AddlistFilter.map((i:any)=>{
          return <div key={i.listId} className="multiple-choice_input_div" onClick={CheckHander} >
 <input  className="multiple-choice_input" disabled={cont} placeholder={i.ListTitle} type="text" name="" id=""  /> 

 {cont === true  ? cont === true && chec === true ? <CheckOutlined />:"" :  <DeleteOutlined  onClick={()=>dispatch( DeleteLis(i.listId))}/>}
 
          </div> 
         })}

          {cont === true ? (
            <Button type="primary">ok</Button>
          ) : (
            <button className="add_choice" onClick={Add_Choice}>
              Add choice
            </button>
          )}
        </div>
      </div>
    </>
  );
};

interface TexBoxs {
  Filddata: any;
  InsertedData: any;
  afterset:any
}

export const TexBox = (props: TexBoxs) => {
  const [cont, setcont] = React.useState(false);
  const [form] = Form.useForm();
  const { InsertedData } = props;
  const dispatch = useDispatch();
  React.useEffect(() => {
    const filter = InsertedData?.filter(
      (i: any) =>
      i.url_id === props.Filddata.Prent_id && (i.fild_id === props.Filddata.id ||i.fild_id === props.afterset.Fild_id )
    );
    if (filter !== undefined) {
      console.log(filter);
      setcont(true);
      form.setFieldsValue({
        qution: filter[0]?.qution,
        Description: filter[0]?.Description,
      });
    } else {
      form.setFieldsValue({ qution: "..." });
      setcont(false);
    }
  }, [InsertedData]);
  const onFinish = (e: any): void => {
    const { qution, Description } = e;
    const { id, choice, Prent_id } = props.Filddata;

    const MaltiChoice = {
      qution,
      Description,
      fild_id: id,
      fild_choice: choice,
      url_id: Prent_id,
    };
    dispatch(Qution_Ans(MaltiChoice));
  };

  return (
    <>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="qution">
              <Input
                className="view_qution_input_f"
                placeholder="..."
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <Form.Item name="Description">
              <Input
                className="view_qution_input_f"
                placeholder="Description (optional)"
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <button type="submit"></button>
          </Form>
        </div>
      </div>
      <div className="TexBox__answer">
        <div className="textbox">
          <Input
            className="text_box_input"
            placeholder="Type your answer here..."
            bordered={false}
            disabled={cont === true ? false : true}
          />
        </div>
        {cont === true ? <Button type="primary">ok</Button> : ""}
      </div>
    </>
  );
};

interface Dates {
  Filddata: any;
  InsertedData: any;
  afterset:any;
}
export const Date = (props: Dates) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [cont, setcont] = React.useState(false);
  const { InsertedData } = props;
  React.useEffect(() => {
    const filter = InsertedData?.filter(
      (i: any) =>
      i.url_id === props.Filddata.Prent_id && (i.fild_id === props.Filddata.id ||i.fild_id === props.afterset.Fild_id )
    );
    if (filter !== undefined) {
      console.log(filter);
      setcont(true);
      form.setFieldsValue({
        qution: filter[0]?.qution,
        Description: filter[0]?.Description,
      });
    } else {
      form.setFieldsValue({ qution: "..." });
      setcont(false);
    }
  }, [InsertedData]);
  const onFinish = (e: any): void => {
    const { qution, Description } = e;
    const { id, choice, Prent_id } = props.Filddata;

    const MaltiChoice = {
      qution,
      Description,
      fild_id: id,
      fild_choice: choice,
      url_id: Prent_id,
    };
    dispatch(Qution_Ans(MaltiChoice));
  };

  const dateFormat = "YYYY-MM-DD";
  return (
    <>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="qution">
              <Input
                className="view_qution_input_f"
                placeholder="..."
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <Form.Item name="Description">
              <Input
                className="view_qution_input_f"
                placeholder="Description (optional)"
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <button type="submit"></button>
          </Form>
        </div>
      </div>
      <div className="Date_answer">
        <div className="date">
          <DatePicker
            className="date_input"
            defaultValue={dayjs("2015-06-06", dateFormat)}
            disabled={cont === true ? false : true}
          />
        </div>
        {cont === true ? <Button type="primary">ok</Button> : ""}
      </div>
    </>
  );
};

interface Feetdbacks {
  Filddata: any;
  InsertedData: any;
  afterset:any
}

export const Feetdback = (props: Feetdbacks) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { InsertedData } = props;
  const [cont, setcont] = React.useState(false);
  React.useEffect(() => {
    const filter = InsertedData?.filter(
      (i: any) =>
      i.url_id === props.Filddata.Prent_id && (i.fild_id === props.Filddata.id ||i.fild_id === props.afterset.Fild_id )
    );
    console.log("fs", filter);
    if (filter !== undefined) {
      form.setFieldsValue({
        qution: filter[0]?.qution,
        Description: filter[0]?.Description,
      });
      console.log("fs", filter);
      setcont(true);
    } else {
      form.setFieldsValue({ qution: "..." });
      setcont(false);
    }
  }, [InsertedData]);
  const onFinish = (e: any): void => {
    const { qution, Description } = e;
    const { id, choice, Prent_id } = props.Filddata;

    const MaltiChoice = {
      qution,
      Description,
      fild_id: id,
      fild_choice: choice,
      url_id: Prent_id,
    };
    dispatch(Qution_Ans(MaltiChoice));
  };

  const img = [
    {
      id: 1,
      img: "https://surveyagency.netlify.app/images/feedback1.png",
    },
    {
      id: 2,
      img: "https://surveyagency.netlify.app/images/feedback2.png",
    },
    {
      id: 3,
      img: "https://surveyagency.netlify.app/images/feedback3.png",
    },
    {
      id: 4,
      img: "https://surveyagency.netlify.app/images/feedback4.png",
    },
    {
      id: 5,
      img: "https://surveyagency.netlify.app/images/feedback4.png",
    },
  ];
  return (
    <>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="qution">
              <Input
                className="view_qution_input_f"
                placeholder="..."
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <Form.Item name="Description">
              <Input
                className="view_qution_input_f"
                placeholder="Description (optional)"
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <button type="submit"></button>
          </Form>
        </div>
      </div>
      <div className="Feetback_ans">
        <div className="Feetback">
          <div className="feetback_img">
            {img.map((i: { id: number; img: string }, index) => {
              return (
                <img
                  className="Feetback_img_"
                  src={i.img}
                  alt=""
                  onClick={() => console.log(i.id)}
                  key={index}
                />
              );
            })}
          </div>
          <div className="feetback_img">
            {cont === true ? <Button type="primary">ok</Button> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

interface TextAreas {
  Filddata: any;
  InsertedData: any;
  afterset:any
}
export const TextArea = (props: TextAreas) => {
  const { TextArea } = Input;

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { InsertedData } = props;
  const [cont, setcont] = React.useState(false);
  React.useEffect(() => {
    const filter = InsertedData?.filter(
      (i: any) =>
      i.url_id === props.Filddata.Prent_id && (i.fild_id === props.Filddata.id ||i.fild_id === props.afterset.Fild_id )
    );
    if (filter !== undefined) {
      console.log("fs", filter);
      setcont(true);
      form.setFieldsValue({
        qution: filter[0]?.qution,
        Description: filter[0]?.Description,
      });
    } else {
      form.setFieldsValue({ qution: "..." });
      setcont(false);
    }
  }, [InsertedData]);
  const onFinish = (e: any): void => {
    const { qution, Description } = e;
    const { id, choice, Prent_id } = props.Filddata;

    const MaltiChoice = {
      qution,
      Description,
      fild_id: id,
      fild_choice: choice,
      url_id: Prent_id,
    };
    dispatch(Qution_Ans(MaltiChoice));
  };

  return (
    <div>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="qution">
              <Input
                className="view_qution_input_f"
                placeholder="..."
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <Form.Item name="Description">
              <Input
                className="view_qution_input_f"
                placeholder="Description (optional)"
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <button type="submit"></button>
          </Form>
        </div>
      </div>
      <div className="TextArea__answer">
        <div className="TextArea">
          <TextArea
            className="TextArea_input"
            rows={4}
            placeholder="Type your answer here..."
            maxLength={6}
            bordered={false}
            disabled={cont === true ? false : true}
          />
        </div>
        {cont === true ? <Button type="primary">ok</Button> : ""}
      </div>
    </div>
  );
};

interface NumberInputs {
  Filddata: any;
  InsertedData: any;
  afterset:any
}

export const NumberInput: React.FC<NumberInputs> = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { InsertedData } = props;
  const [cont, setcont] = React.useState(false);
  React.useEffect(() => {
    const filter = InsertedData?.filter(
      (i: any) =>
      i.url_id === props.Filddata.Prent_id && (i.fild_id === props.Filddata.id ||i.fild_id === props.afterset.Fild_id )
    );
    if (filter !== undefined) {
      console.log("fs", filter);
      setcont(true);
      form.setFieldsValue({
        qution: filter[0]?.qution,
        Description: filter[0]?.Description,
      });
    } else {
      form.setFieldsValue({ qution: "..." });
      setcont(false);
    }
  }, [InsertedData]);
  const onFinish = (e: any): void => {
    const { qution, Description } = e;
    const { id, choice, Prent_id } = props.Filddata;

    const MaltiChoice = {
      qution,
      Description,
      fild_id: id,
      fild_choice: choice,
      url_id: Prent_id,
    };
    dispatch(Qution_Ans(MaltiChoice));
  };

  return (
    <div>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="qution">
              <Input
                className="view_qution_input_f"
                placeholder="..."
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <Form.Item name="Description">
              <Input
                className="view_qution_input_f"
                placeholder="Description (optional)"
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <button type="submit"></button>
          </Form>
        </div>
      </div>
      <div className="NumberInput__answer">
        <div className="NumberInput">
          <Input
            className="number_input_answer"
            placeholder="Type your answer here..."
            bordered={false}
            disabled={cont === true ? false : true}
          />
        </div>
        {cont === true ? <Button type="primary">ok</Button> : ""}
      </div>
    </div>
  );
};

interface EmailInputs {
  Filddata: any;
  InsertedData: any;
  afterset:any
}

export const EmailInput: React.FC<EmailInputs> = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { InsertedData } = props;
  const [cont, setcont] = React.useState(false);
  React.useEffect(() => {
    const filter = InsertedData?.filter(
      (i: any) =>
      i.url_id === props.Filddata.Prent_id && (i.fild_id === props.Filddata.id ||i.fild_id === props.afterset.Fild_id )
    );
    if (filter !== undefined) {
      console.log("fs", filter);
      setcont(true);
      form.setFieldsValue({
        qution: filter[0]?.qution,
        Description: filter[0]?.Description,
      });
    } else {
      form.setFieldsValue({ qution: "..." });
      setcont(false);
    }
  }, [InsertedData]);
  const onFinish = (e: any): void => {
    const { qution, Description } = e;
    const { id, choice, Prent_id } = props.Filddata;

    const MaltiChoice = {
      qution,
      Description,
      fild_id: id,
      fild_choice: choice,
      url_id: Prent_id,
    };
    dispatch(Qution_Ans(MaltiChoice));
  };

  return (
    <div>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="qution">
              <Input
                className="view_qution_input_f"
                placeholder="..."
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <Form.Item name="Description">
              <Input
                className="view_qution_input_f"
                placeholder="Description (optional)"
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <button type="submit"></button>
          </Form>
        </div>
      </div>
      <div className="EmailInput__answer">
        <div className="EmailInput">
          <Input
            className="Email_input_answer"
            placeholder="survey@gmail.com"
            bordered={false}
            disabled={cont === true ? false : true}
          />
        </div>
        {cont === true ? <Button type="primary">ok</Button> : ""}
      </div>
    </div>
  );
};

interface WebsiteInputs {
  Filddata: any;
  InsertedData: any;
  afterset:any
}

export const WebsiteInput: React.FC<WebsiteInputs> = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { InsertedData } = props;
  const [cont, setcont] = React.useState(false);
  React.useEffect(() => {
    const filter = InsertedData?.filter(
      (i: any) =>
      i.url_id === props.Filddata.Prent_id && (i.fild_id === props.Filddata.id ||i.fild_id === props.afterset.Fild_id )
    );
    if (filter !== undefined) {
      console.log("fs", filter);
      setcont(true);
      form.setFieldsValue({
        qution: filter[0]?.qution,
        Description: filter[0]?.Description,
      });
    } else {
      form.setFieldsValue({ qution: "..." });
      setcont(false);
    }
  }, [InsertedData]);
  const onFinish = (e: any): void => {
    const { qution, Description } = e;
    const { id, choice, Prent_id } = props.Filddata;

    const MaltiChoice = {
      qution,
      Description,
      fild_id: id,
      fild_choice: choice,
      url_id: Prent_id,
    };
    dispatch(Qution_Ans(MaltiChoice));
  };

  return (
    <div>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="qution">
              <Input
                className="view_qution_input_f"
                placeholder="..."
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <Form.Item name="Description">
              <Input
                className="view_qution_input_f"
                placeholder="Description (optional)"
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <button type="submit"></button>
          </Form>
        </div>
      </div>
      <div className="WebsiteInput__answer">
        <div className="WebsiteInput">
          <Input
            className="WebsiteInput_input_answer"
            placeholder="https://"
            bordered={false}
            disabled={cont === true ? false : true}
          />
        </div>
        {cont === true ? <Button type="primary">ok</Button> : ""}
      </div>
    </div>
  );
};

interface PhoneInputs {
  Filddata: any;
  InsertedData: any;
  afterset:any
}

export const PhoneInput: React.FC<PhoneInputs> = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { InsertedData } = props;
  const [cont, setcont] = React.useState(false);
  React.useEffect(() => {
    const filter = InsertedData?.filter(
      (i: any) =>
      i.url_id === props.Filddata.Prent_id && (i.fild_id === props.Filddata.id ||i.fild_id === props.afterset.Fild_id )
    );
    if (filter !== undefined) {
      console.log("fs", filter);
      setcont(true);
      form.setFieldsValue({
        qution: filter[0]?.qution,
        Description: filter[0]?.Description,
      });
    } else {
      form.setFieldsValue({ qution: "..." });
      setcont(false);
    }
  }, [InsertedData]);
  const onFinish = (e: any): void => {
    const { qution, Description } = e;
    const { id, choice, Prent_id } = props.Filddata;

    const MaltiChoice = {
      qution,
      Description,
      fild_id: id,
      fild_choice: choice,
      url_id: Prent_id,
    };
    dispatch(Qution_Ans(MaltiChoice));
  };

  return (
    <div>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="qution">
              <Input
                className="view_qution_input_f"
                placeholder="..."
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <Form.Item name="Description">
              <Input
                className="view_qution_input_f"
                placeholder="Description (optional)"
                bordered={false}
                disabled={cont}
              />
            </Form.Item>
            <button type="submit"></button>
          </Form>
        </div>
      </div>
      <div className="PhoneInput__answer">
        <div className="PhoneInput">
          <Input
            className="PhoneInput_input_answer"
            placeholder="9090909090"
            bordered={false}
            disabled={cont === true ? false : true}
          />
        </div>
        {cont === true ? <Button type="primary">ok</Button> : ""}
      </div>
    </div>
  );
};
