import './App.css';
import { BrowserRouter as  Router, Route , Routes} from 'react-router-dom';
import Start from './components/Start';
import 'bootstrap/dist/css/bootstrap.min.css';
import CodeFile from './components/CodeFile';

function App() {
  return (
    <div className='App'>
      <Router>
      <Routes>
        
        <Route path='/' exact element={<Start/>}></Route>
        <Route path='/UploadCode' exact element={<CodeFile/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
