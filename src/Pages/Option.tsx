import { FieldNumberOutlined ,StarOutlined ,MailOutlined , DashOutlined} from "@ant-design/icons";

export const option = 
  [
    {
      value: 'MultipleChoice',
      label: <span><i className="fa-solid fa-check"> </i> MultipleChoice</span>,
      
    },
    {
      value: 'Textbox',
      label: <span><DashOutlined />  Textbox</span>,
    },
    {
      value: 'Date',
      label: <span><i className="fa-regular fa-calendar"></i>  Textbox</span>,
    },
    {
      value: 'Feedback',
      label: <span> <StarOutlined />  Feedback</span>,
    },
    {
      value: 'Textarea',
      label: <span><i className="fa-solid fa-align-center"></i>  Textarea</span>,
    },
    {
      value:"Number",
      label: <span><FieldNumberOutlined />  Number</span>,
    },
    {
      value:"Email",
      label:<span>     <MailOutlined />  Email</span>
    },
    {
      value:"Website",
      label:<span><i className="fa-solid fa-link"></i> Website</span>
    },
    {
      value:"Phone",
      label:<span> <i className="fa-solid fa-phone"></i> Phone</span>
    }
  ]