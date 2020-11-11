import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import Logo from './LOGO/Logo';
class Navigator extends React.Component{
    render(){
        if(this.props.islogin){
            return(
                <div> 
                <Navbar bg="dark" variant="dark" style={{justifyContent:'space-between'}}>
                   <div>
                       <Navbar.Brand href="#home">
                           <Logo />
                       </Navbar.Brand>
                   </div>
                   <div>
                       <Nav>
                       <Nav.Link onClick={() => this.props.onRouteChange('login')}> 
                        {/* href="login"> */}
                           Sign Out
                       </Nav.Link>
                       </Nav>           
                   </div>
               </Navbar>
               </div>
            );
            }
        else{
            return(
                <div> 
                <Navbar bg="dark" variant="dark" style={{justifyContent:'space-between'}}>
                   <div>
                       <Navbar.Brand href="#home">
                           <Logo />
                       </Navbar.Brand>
                   </div>
                   <div >
                       <Nav>
                       <Nav.Link onClick={() => this.props.onRouteChange('login')}> 
                           Login
                       </Nav.Link>           
                       <Nav.Link onClick={() => this.props.onRouteChange('register')}> 
                           Register
                       </Nav.Link>
                       </Nav>
                   </div>
               </Navbar>
               </div>
            );
            }
    }
}

export default Navigator;