import {Routes,Route} from 'react-router-dom'
import HomePages from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
function App() {
return (
<>
<Routes>
  <Route path='/' element={<HomePages/>}/>
  <Route path='Register' element={<Register/>}/>
   <Route path='Login' element={<Login/>}/>
  <Route path='About' element={<About/>}/>
  <Route path='Contact' element={<Contact/>}/>
  <Route path='Policy' element={<Policy/>}/>
  <Route path='*' element={<PageNotFound/>}/>


</Routes>
</>
  );
}

export default App;
