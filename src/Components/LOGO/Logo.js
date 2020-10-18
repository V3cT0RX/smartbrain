import React from 'react';
import Tilt from 'react-tilt';
import walterWhite from './walter-white.png'
import './Logo.css';

class Logo extends React.Component{
    render(){
        return(
            <div>
                <Tilt className="Tilt br2 shadow-2" options={{ max : 25}} style={{ height: 50, width: 50 }} >
                    <div className="Tilt-inner"> 
                        <img alt='logo' src={walterWhite} />
                    </div>
                </Tilt>
            </div>
       );
    }
}

export default Logo;