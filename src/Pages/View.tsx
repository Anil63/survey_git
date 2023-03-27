import * as React from "react";
import { ForwardOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export interface IAppProps {
  id: any;
  AddFild: string;
  Permition?: boolean;
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

  // antd changes

  // end

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
   

    if (!props.AddFild) {
      let selet = lastValue
        ? lastValue.choice && selectfild.length === 0
          ? lastValue.choice
          : selectfild[0].choice
        : "MultipleChoice";
      setChoice(selet);
    } else {
      setChoice(chFld.find((i: any) => i.id === props.AddFild).choice);
    }

    upload();
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
          {choice === "MultipleChoice" && <MaltiChoice Filddata={lastValue} />}
          {choice === "Textbox" && <TexBox />}
          {choice === "Date" && <Date />}
          {choice === "Feedback" && <Feetdback />}
          {choice === "Textarea" && <TextArea />}
          {choice === "Number" && <NumberInput />}
          {choice === "Email" && <EmailInput />}
          {choice === "Website" && <WebsiteInput />}
          {choice === "Phone" && <PhoneInput />}
        </div>
      </div>
    </div>  
  );
}

interface MaltiChoice_type {
  Filddata:any
}

export const MaltiChoice = (props:MaltiChoice_type) => {
  const [form] = Form.useForm();
  const [test , settest] = React.useState<string>("...")
  const [list, setlist] = React.useState([
    <Input className="multiple-choice_input" bordered={false} />,
  ]);



// use Effect to create

React.useEffect(()=>{
  form.setFieldsValue({ qution: '...' });
},[])
// End


  const Add_Choice = () => {
    const newItem = (
      <Input className="multiple-choice_input" bordered={false} />
    );
    setlist([...list, newItem]);
  };

  const Delete_Choice = (index: number) => {
    let newList = list.filter((item, i) => i !== index);
    setlist(newList);
  };

  const onFinish = ( e:any):void => {
  
    const { qution ,Description  } = e;
    const {id , choice,Prent_id } = props.Filddata
   
    const MaltiChoice = {qution ,Description ,  fild_id: id , fild_choice:choice, url_id: Prent_id   }
  console.log("MaltiChoice",MaltiChoice)
  };


  return (
    <>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
   
        <Form
   
      form={form}
      name="control-hooks"
      onFinish={onFinish}
    
    >
       <Form.Item name="qution" >
       <Input
            className="view_qution_input_f"
            placeholder="..."
            bordered={false} 
           
            
          />
       </Form.Item>
       <Form.Item name="Description" >
          <Input
            className="view_qution_input_f"
            placeholder="Description (optional)"
            bordered={false}
           
          />
          </Form.Item>
          <button type="submit"></button>
        </Form>
        </div>
      </div>
      <div className="multiple-choice">
        <div className="multiple-choice__wrapper">
          {list.map(
            (
              item:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined,
              index: number
            ) => {
              let inde = index + 1;

              return (
                <div key={index}>
                  <div className="multiple-choice__wrapper_choice">
                    <span className="multiple-choice_number">{inde}</span>
                    {item}
                    <PlusCircleOutlined
                      id="input_delete"
                      onClick={() => Delete_Choice(index)}
                    />
                  </div>
                </div>
              );
            }
          )}

          <button className="add_choice" onClick={Add_Choice}>
            Add choice
          </button>
        </div>
      </div>
    </>
  );
};



interface TexBox {
  Control?: boolean;
}
export const TexBox = (Props: TexBox) => {
  return (
    <>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Input
            className="view_qution_input_f"
            value=" ... "
            bordered={false}
          />
          <Input
            className="view_qution_input_f"
            placeholder="Description (optional)"
            bordered={false}
          />
        </div>
      </div>
      <div className="TexBox__answer">
        <div className="textbox">
          <Input
            className="text_box_input"
            placeholder="Type your answer here..."
            disabled={true}
            bordered={false}
          />
        </div>
      </div>
    </>
  );
};

export const Date = () => {
  const dateFormat = "YYYY-MM-DD";
  return (
    <>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Input
            className="view_qution_input_f"
            value=" ... "
            bordered={false}
          />
          <Input
            className="view_qution_input_f"
            placeholder="Description (optional)"
            bordered={false}
          />
        </div>
      </div>
      <div className="Date_answer">
        <div className="date">
          <DatePicker
            className="date_input"
            defaultValue={dayjs("2015-06-06", dateFormat)}
            disabled
          />
        </div>
      </div>
    </>
  );
};

export const Feetdback = () => {
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
          <Input
            className="view_qution_input_f"
            value=" ... "
            bordered={false}
          />
          <Input
            className="view_qution_input_f"
            placeholder="Description (optional)"
            bordered={false}
          />
        </div>
      </div>
      <div className="Feetback_ans">
        <div className="Feetback">
          <div className="feetback_img">
            {img.map((i: { id: number; img: string }) => {
              return (
                <img
                  className="Feetback_img_"
                  src={i.img}
                  alt=""
                  onClick={() => console.log(i.id)}
                />
              );
            })}
          </div>
          <div className="feetback_img"></div>
        </div>
      </div>
    </>
  );
};

export const TextArea = () => {
  const { TextArea } = Input;
  return (
    <div>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Input
            className="view_qution_input_f"
            value=" ... "
            bordered={false}
          />
          <Input
            className="view_qution_input_f"
            placeholder="Description (optional)"
            bordered={false}
          />
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
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export const NumberInput: React.FC = () => {
  return (
    <div>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Input
            className="view_qution_input_f"
            value=" ... "
            bordered={false}
          />
          <Input
            className="view_qution_input_f"
            placeholder="Description (optional)"
            bordered={false}
          />
        </div>
      </div>
      <div className="NumberInput__answer">
        <div className="NumberInput">
          <Input
            className="number_input_answer"
            placeholder="Type your answer here..."
            bordered={false}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export const EmailInput: React.FC = () => {
  return (
    <div>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Input
            className="view_qution_input_f"
            value=" ... "
            bordered={false}
          />
          <Input
            className="view_qution_input_f"
            placeholder="Description (optional)"
            bordered={false}
          />
        </div>
      </div>
      <div className="EmailInput__answer">
        <div className="EmailInput">
          <Input
            className="Email_input_answer"
            placeholder="survey@gmail.com"
            bordered={false}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export const WebsiteInput: React.FC = () => {
  return (
    <div>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Input
            className="view_qution_input_f"
            value=" ... "
            bordered={false}
          />
          <Input
            className="view_qution_input_f"
            placeholder="Description (optional)"
            bordered={false}
          />
        </div>
      </div>
      <div className="WebsiteInput__answer">
        <div className="WebsiteInput">
          <Input
            className="WebsiteInput_input_answer"
            placeholder="https://"
            bordered={false}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export const PhoneInput: React.FC = () => {
  return (
    <div>
      <div className="view_qution">
        <div className="view_qution_Icnos">
          <ForwardOutlined className="view_icons_forwerd" />
        </div>
        <div className="view_qution_input">
          <Input
            className="view_qution_input_f"
            value=" ... "
            bordered={false}
          />
          <Input
            className="view_qution_input_f"
            placeholder="Description (optional)"
            bordered={false}
          />
        </div>
      </div>
      <div className="PhoneInput__answer">
        <div className="PhoneInput">
          <Input
            className="PhoneInput_input_answer"
            placeholder="9090909090"
            bordered={false}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};
