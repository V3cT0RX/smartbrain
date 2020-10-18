import React, { Component } from 'react';
import './App.css';
import Routes from './Router';
import 'tachyons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Clarifai from 'clarifai';
// import Particles from 'react-particles-js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Login from './Components/Forms/Login';

const app = new Clarifai.App({
  apiKey :'4ec36c009bcd4f969b4f55ce5f8f07e3'
})

class App extends Component{
  constructor(){
    super();
    this.state ={
      input :'',
      imgUrl:'',
      box:{},
    }
    this.onInputChange =this.onInputChange.bind(this);
    this.onSubmit =this.onSubmit.bind(this);
    this.calFaceLocation=this.calFaceLocation.bind(this);
    // this.displayFaceBox=this.displayFaceBox.bind(this);
  }

  calFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width,height,clarifaiFace);
    return{
      leftcol:clarifaiFace.left_col * width, 
      toprow: clarifaiFace.top_row * height,
      rightcol:width -(clarifaiFace.right_col * width),
      bottomrow:height -(clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (e) =>{
    this.setState({input:e.target.value});
  }

  onSubmit =(e)=>{
    this.setState({imgUrl:this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then((response) => this.displayFaceBox(this.calFaceLocation(response)))
    .catch(err => console.log(err));
  }
  render(){
    return (
      <div className="App">
        {/* <Particles className='fixed h-100 w-100' /> */}
          <Routes />
          <Login />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
      </div>
    );  
  }
}

export default App;


//  console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
