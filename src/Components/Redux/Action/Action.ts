import {
  Auth,
  AddListener,
  DelteList_id,
  Choicefilds,
  Delete_Choice,
  TitleChange,
  SelectFild
  ,Layout_text,
  imgUpload
  ,PreViewType
  ,Qution_type_Ans
  ,AddNotess,
  DeleteList
} from "./ActionType";

export const Loginset = (data: any) => {
  return { type: Auth, Payload: data };
};

export const ListItem = (Title: any) => {
  return {
    type: AddListener,
    Payload: {
      id: new Date().getTime().toString(),
      Title: Title,
    },
  };
};

export const ListName = (data: any) => {
  // console.log(data)
  return {
    type: TitleChange,
    Pre_id: data.Props.id,
    title: data.inpu,
  };
};
export const Delete_List = (id: any) => {
  console.log("delete_list", id);
  return {
    type: DelteList_id,
    Payload: {
      id,
    },
  };
};

export const Choicefild = (choice: { id: any; choice: string }) => {
  return {
    type: Choicefilds,
    Payload: {
      id: new Date().getTime().toString(),
      Prent_id: choice.id,
      field: choice.choice,
    },
  };
};

export const Deltechoice = (id: number) => {
  return {
    type: Delete_Choice,
    Payload: {
      id,
    },
  };
};


export const ChoiceDild_Action = (data:any) =>{

  return {  
    type: SelectFild,
    Payload:{data}
  }
}

export const Layout_Action = (data:any) =>{
  
  return {
    type: Layout_text,
    Payload :{
      data
    }
  }
}
export const imgUpload_Action = (data:any) =>{
 
  return {
    type:imgUpload,
    Payload:{
      img: data.img,
      Pre_id: data.pre_id
    }
   
  }
}

export const Qution_Ans = (Data:any) =>{
  console.log("Qution_and_action", Data);
  return {
    type : Qution_type_Ans,
    Payload:{
      data:Data
    }

  }

}

// in test
export const PreView_Action = (data:any) =>{

  return {
    type: PreViewType,
    Payload:{
      components:data
    }
  }
}



export const AddNotes = (data:any , PrentId:any) =>{
 
  return {
      type:AddNotess,
      payload:{
          Id: new Date().getTime().toString(),
          PrentId: PrentId
      }

  }
}


export const DeleteLis = (id:string) => {

  return {
    type:DeleteList,
    payload:{id:id}
    
  }
}