import React from 'react';
import './FaceRecognition.css';

class FaceRecognition extends React.Component{
    render(){
        return(
            <div className='center ma'>
                <div>
                    <div className='absolute mt2'>
                        <img id='inputimage' alt='img' src={this.props.imgUrl} width='auto' height='400px' />
                        <div className='bounding-box ' style={{top:this.props.box.toprow, right:this.props.box.rightcol, bottom:this.props.box.bottomrow ,left:this.props.box.leftcol}}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FaceRecognition;