import './Scss/App.scss';
import { Route, Routes} from 'react-router-dom'
import Index from './Components/sign up';
import Navbar from './Components/NavBar/Navbar';
import Login from './Components/sign up/Login';
import Create from './Pages/Create';
import Add_list from './Pages/Add_list';
import PreView from './Pages/PreView';
function App() {
  return (
    <div className="Routes">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/list' element={<Add_list/>} />
        <Route path='/Create/:id' element={<Create/>} />
        <Route path='/PreView' element={<PreView/>} />
      </Routes>
    </div>
  );
}

export default App;
