import {
  Auth,
  AddListener,
  DelteList_id,
  Choicefilds,
  Delete_Choice,
  TitleChange,
  SelectFild,
  Layout_text,
  imgUpload,
  PreViewType,
  Qution_type_Ans,
  AddNotess,
  DeleteList,
} from "../Action/ActionType";

export interface state {
  user: Object[];
}

export interface listState {
  List: { Title: string }[];
  Choicesfield: { choice: string }[];
  Layout: {}[];
  imgUpload: { img: string }[];
}

interface userlogin {
  type: "Auth";
  Payload: any;
}
// List data
interface AddList {
  type: "AddListener";
  Payload: { id: number; Title: string };
}
interface DeletList {
  type: "DelteList_id";
  Payload: {
    id: string;
  };
}

// end

// Fild
interface ChangeTitle {
  type: "TitleChange";
  Pre_id: any;
  title: string;
}
interface Choicefild {
  type: "Choicefilds";
  Payload: { field: string; id: number; Prent_id: any };
}

interface SelectFilds {
  type: "SelectFild";

  Payload: {
    data: {
      e: string;
      selectfild: any;
    };
  };
}

interface Delete_ch {
  type: "Delete_Choice";
  Payload: { field: string; id: number; Prent_id: string };
}

// End

// Layout
interface Layouts {
  type: "Layout_text";
  Payload: any;
}
// end

// img upload
interface imgup {
  type: "imgUpload";
  Payload: {
    img: any;
    Pre_id: string;
  };
}
const initialState = {
  user: [],
};
const ListState: listState = {
  List: [],
  Choicesfield: [],
  Layout: [],
  imgUpload: [],
};

type Action = userlogin;
type LisAction =
  | AddList
  | DeletList
  | Choicefild
  | Delete_ch
  | ChangeTitle
  | SelectFilds
  | Layouts
  | imgup;

export const Users = (state: state = initialState, action: Action) => {
  switch (action.type) {
    case Auth:
      return { ...state, user: [action.Payload] };
    default:
      return state;
  }
};

export const Lists = (state = ListState, action: LisAction) => {
  switch (action.type) {
    case AddListener:
      const { id, Title } = action.Payload;
      fetch(` http://localhost:3004/AddListener`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.Payload),
      }).then((res) => res.json().then((res) => console.log("success", res)));
      
      
      return {
        List: [
          ...state.List,
          {
            id: id,
            Title: Title,
          },
        ],
      };

    case DelteList_id:
      const data = state.List.filter((i: any) => i.id !== action.Payload.id);
      fetch(`http://localhost:3004/AddListener/${action.Payload.id}`, {
        method: "DELETE",
      }).then(() => console.log("Delete successful"));
     
      return { ...state, List: data };

    case TitleChange:
      const { title, Pre_id } = action;
      const updateData = { Title: title, id: Pre_id}
      fetch(`http://localhost:3004/AddListener/${Pre_id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }).then(() => console.log("Updated successful"));
     
      const ListIndex = state.List.findIndex((i: any) => i.id === Pre_id);
      if (ListIndex >= 0) {
        state.List[ListIndex].Title = title;
      }
      return { List: [...state.List] };
    default:
      return state;
  }
};

export const Choice = (state = ListState, action: LisAction) => {
  switch (action.type) {
    case Choicefilds:
      fetch(`  http://localhost:3004/Filds`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.Payload),
      }).then((res) => res.json().then((res) => console.log("success", res)));
      
      const { field, id, Prent_id } = action.Payload;


      return {
        Choicesfield: [
          ...state.Choicesfield,
          { id: id, choice: field, Prent_id: Prent_id },
        ],
      };

    case Delete_Choice:
      fetch(`http://localhost:3004/Filds/${action.Payload.id}`, {
        method: "DELETE",
      }).then(() => console.log("Delete successful"));
     
      const data = state.Choicesfield.filter(
        (i: any) => i.id !== action.Payload.id
      );

      return { ...state, Choicesfield: data };

    case SelectFild:
      const { e, selectfild } = action.Payload.data;
      console.log("selectfild", selectfild.length);
      if (selectfild.length !== 0) {
        const FindIndex = state.Choicesfield.findIndex(
          (i: any) => i.id === selectfild[0].id
        );

        if (FindIndex >= 0) {
          state.Choicesfield[FindIndex].choice = e;
        }
      }
      return { Choicesfield: [...state.Choicesfield] };

    default:
      return state;
  }
};

export const Layouts = (state = ListState, action: LisAction) => {
  switch (action.type) {
    case Layout_text:
      return { Layout: [action.Payload.data] };
    default:
      return state;
  }
};

export const ImgRecent = (state = ListState, action: LisAction) => {
  switch (action.type) {
    case imgUpload:
      const { img, Pre_id } = action.Payload;
      const FindeIndex = state.imgUpload.findIndex(
        (i: any) => i.Pre_id === Pre_id
      );

      if (FindeIndex >= 0) {
        state.imgUpload[FindeIndex].img = img;
      } else {
        const ss = { ...action.Payload };
        return {
          imgUpload: [
            ...state.imgUpload,
            {
              img: img,
              Pre_id: Pre_id,
            },
          ],
        };
      }

      return { imgUpload: [...state.imgUpload] };
    default:
      return state;
  }
};

interface Addliart {
  Addlist: [];
}

interface Addlist {
  type: "AddNotess";
  payload:{Id: string , PrentId:string}
 
}
interface Dlete {
  type:"DeleteList"
  payload:{id:string}
  
}
const initialPreViewStateAddList: Addliart = {
  Addlist: [],
};
type Addlistitem = Addlist| Dlete


export const AddListItem = (state =initialPreViewStateAddList , action:Addlistitem) =>{
  switch(action.type){
    case AddNotess:
    
      const { Id , PrentId  } = action.payload
      return  { 
        Addlist: [
          ...state.Addlist,
          {
          listId:Id,
          ListTitle:"ListTitle",
          Pre_id:PrentId
          },
        ],
      };

      case DeleteList :
        
        const data = state.Addlist.filter((i: any) => i.listId !== action.payload.id);
      
      return { ...state, Addlist: data };
    default : return state
  }
}

interface PreView_typ {
  Preview: [];
}

interface View {
  type: "Qution_type_Ans";
  Payload: {
    data: {
      Description: string;
      fild_choice: string;
      fild_id: string;
      qution: string;
      url_id: string;
    };
  };
}
const initialPreViewState: PreView_typ = {
  Preview: [],
};
type Preview_ty = View;
export const PreViewReducer = (
  state = initialPreViewState,
  action: Preview_ty
) => {
  switch (action.type) {
    case Qution_type_Ans:
      const { Description, fild_choice, fild_id, qution, url_id } =
        action.Payload.data;
      fetch(` http://localhost:3004/qution`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.Payload.data),
      }).then((res) => res.json().then((res) => console.log("success", res)));
      return {
        Preview: [
          ...state.Preview,
          {
            Prent_id: url_id,
            Fild_id: fild_id,
            fild_choice: fild_choice,
            Qution: qution,
            Description: Description,
          },
        ],
      };

    default:
      return state;
  }
};
