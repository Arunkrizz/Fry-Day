import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function RegistrationHeader() {
  return (
    <Navbar expand="lg" className="bg-body-white" style={{   marginBottom:"30px" ,  borderBottom: '2px solid #f8f9fa'}}>
      <Container>
        <Navbar.Brand href="#"><h3>Fry-Day <br/> for Bussiness</h3> </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default RegistrationHeader;