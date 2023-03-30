import './Scss/App.scss';
import { Route, Routes} from 'react-router-dom'
import Index from './Components/sign up';
import Navbar from './Components/NavBar/Navbar';
import Login from './Components/sign up/Login';
import Create from './Pages/Create';
import Add_list from './Pages/Add_list';
import PreView from './Pages/PreView';
import Public from './Pages/Public';
import React from 'react';
function App() {
  
  const [] = React.useState()

  return (
    <div className="Routes">
   
      <Routes>
        <Route path='/' element={<> <Navbar /><Index /></>} />
        <Route path='/Login' element={<><Navbar /><Login/>
        </>} />
        <Route path='/list' element={<> <Navbar /><Add_list/></>} />
        <Route path='/Create/:id' element={ <> <Navbar /><Create/></>} />
        <Route path='/PreView' element={<> <Navbar /><PreView/></>} />
        <Route path='/Public' element={<> <Public/> </>}  />
      </Routes>
      
      
      
    </div>
  );
}

export default App;
