import * as React from "react";
import { AlignCenterOutlined, EyeOutlined, ArrowUpOutlined,ArrowDownOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Switch, Upload, message,Modal } from "antd";
import { useEffect } from "react";
import { option } from "./Option";
import { useSelector, useDispatch } from "react-redux";
import { ListName, ChoiceDild_Action ,Layout_Action, imgUpload_Action } from "../Components/Redux/Action/Action";
import View from "./View";
import PreView from "./PreView";
;

interface ISettingProps {
  id: any;
  selected?: string;
}

const Setting: React.FunctionComponent<ISettingProps> = (Props) => {
  // console.log(`selected `,id.selected)
  // const [file, setFile] = React.useState<any>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [DefaultValue, setDefaultvalu] = React.useState<any>();
  const [form] = Form.useForm();

 
  // redux call
  const litName = useSelector((state: any) => state.Lists.List);
  const Dispatch = useDispatch();
  const chFld = useSelector((state: any) => state.Choice.Choicesfield);

  const selectfild = chFld.filter((i: any) => i.id === Props.selected);

  //  redux end

  useEffect(() => {
    const listName = litName.filter((i: any) => i.id === Props.id);
    form.setFieldsValue({ title: listName[0]?.Title });
    const lastValue: any = Object.values(chFld).pop();
    // console.log("setting page",lastValue)
  
    if(!Props.selected){
      let selet= lastValue
         ? lastValue.choice && selectfild.length === 0
           ? lastValue.choice
           : selectfild[0].choice 
         : "MultipleChoice";
         setDefaultvalu(selet);
     }else{
      setDefaultvalu(chFld.find((i:any)=>i.id === Props.selected).choice)
     }
    Layout("Normal")
  }, [chFld, selectfild]);

  const onChaneHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inpu = e.target.value;
    const changeData = { Props, inpu };
    Dispatch(ListName(changeData));
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "image uploaded successfully",
    });
  };

  // img upload
  const uploadimg = (file: any) => {
    if (file) {
      // setFile(file);
      setTimeout(() => {
        success();
      }, 1000);
    }
    const data= { pre_id: Props.id , img:file}
    Dispatch(imgUpload_Action(data))
  
    return false;
  };

  // selecte fild
  const onSelecterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let seleted = { e, selectfild };
    Dispatch(ChoiceDild_Action(seleted));
  };
  // Layout selection
  const Layout = (Layout: string) => {
    Dispatch(Layout_Action(Layout))
  };


  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="setting_apge">
      <div className="Title_Setting">
        {contextHolder}

        <Form form={form}>
          <Form.Item name="title">
            <Input
              className="inp_stting_title"
              size="large"
              prefix={<AlignCenterOutlined />}
              onChange={onChaneHanler}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="section_type_bar">
        <span className="section_type_span">Type</span>
        <Select
          style={{ width: 200 }}
          value={DefaultValue}
          options={option}
          onChange={onSelecterHandler}
        />
      </div>
      <div className="selection-bar__settings">
        <span className="selection-bar_span_settings">Settings</span>
        <div className="selection-bar__settings__req">
          <span className="selection-bar__settings__req_span">Required</span>
          <Switch defaultChecked />
        </div>
      </div>
      <div className="selection-bar__change">
        <span>Change Image</span>
        <div className="selection-bar__change__upload">
          <Upload showUploadList={false} beforeUpload={uploadimg}>
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
          {/* before  access */}
          {/* {file && <img src={URL.createObjectURL(file)} alt="Uploaded image" />} */}
        </div>
      </div>
      <div className="selection-bar__layout">
        <span className="selection-bar__layout_span">Layout</span>
        <div className="selection-bar__layout__wrapper">
          <button className="bar__layout_btn" onClick={() => Layout("Normal")}>
            1
          </button>
          <button className="bar__layout_btn" onClick={() => Layout("reverve")}>
            2
          </button>
          <button className="bar__layout_btn" onClick={() => Layout("Full")}>
            3
          </button>
        </div>
      </div>
      <div className="selection-bar__action">
        <button className="selection-bar__action__preview">
          <EyeOutlined  onClick={showModal} />
          <Modal  className="Preview_st_compone" open={isModalOpen} onCancel={handleCancel} footer={null}  closable={false}>
            <PreView/>
           
           
      </Modal>
        </button>
        <button className="selection-bar__action__Publish" onClick={()=>console.log("this is publich btn")}>Publish</button>
      </div>
    </div>
  );
};

export default Setting;

