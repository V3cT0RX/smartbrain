import React from 'react';
import {Button} from 'react-bootstrap';

class ImageLinkForm extends React.Component{
    render(){
        return(
            <div> 
                <p className='f3'>
                    {'Yo Bitch'}
                </p>
                <div className='middle'>
                    <div>
                        <input className='f4 pa2 w-50 center mb2 mt1' type='text' onChange={this.props.onInputChange}/>
                    </div>
                    <div>
                        <Button variant='success' onClick={this.props.onSubmit}>Detect</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageLinkForm;