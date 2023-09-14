
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';

function Header() {
  return (
    <Navbar className="Header" >
      
        <h1 style={{paddingLeft:'5%',paddingTop:'1%'}}>Static Code Analyzer</h1>
    </Navbar>
  );
}

export default Header;