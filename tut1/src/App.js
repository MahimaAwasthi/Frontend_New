import './App.css';
import LoginForm from './component/LoginForm';
import Home from './component/Home';
import Search from './component/Search';
import ShowAllCompanyProfile from './component/ShowAllCompanyProfile';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
     {/* <div>
      <LoginForm/>
     </div> */}
     <Router>
            
            <Routes>  
                 <Route exact path='/' element={< LoginForm />}></Route>  
                 <Route exact path='/home' element={< Home />}></Route>  
                 <Route exact path='/showAllCompanyProfile' element={< ShowAllCompanyProfile />}></Route> 
                 <Route exact path='/search' element={< Search />}></Route>  
            </Routes>  
     </Router>
     </div>
  );
}
export default App;
