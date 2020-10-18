import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import Logo from './LOGO/Logo';
class Navigator extends React.Component{
    render(){
        return(
            <div> 
             <Navbar bg="dark" variant="dark" style={{justifyContent:'space-between'}}>
                <div>
                    <Navbar.Brand href="#home">
                        <Logo />
                    </Navbar.Brand>
                </div>
                <div>
                    <Nav.Link href="#link">Sign Out</Nav.Link>           
                </div>
            </Navbar>
            </div>
        );
    }
}

export default Navigator;