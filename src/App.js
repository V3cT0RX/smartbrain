import React, { Component } from 'react';
import './App.css';
// import Routes from './Router';
import 'tachyons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Clarifai from 'clarifai';
// import Particles from 'react-particles-js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Login from './Components/Forms/Login';
import Navigator from './Components/Navigator';
import Register from './Components/Forms/Register';

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
      route :'login',
      islogin:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:'',
        joined:'',
      }
    }
    this.onInputChange =this.onInputChange.bind(this);
    this.onImgSubmit =this.onImgSubmit.bind(this);
    this.calFaceLocation=this.calFaceLocation.bind(this);
    this.displayFaceBox=this.displayFaceBox.bind(this);
  }
loadUser = (data) => {
  this.setState({user:{
    id : data.id,
    name:data.name,
    email:data.email,
    entries:data.entries,
    joined:data.joined,
  }})
 }
  // componentDidMount(){
  //   fetch('http://localhost:3000/').then(response => response.json()).then(console.log)
  // }

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

  onImgSubmit =(e)=>{
    this.setState({imgUrl:this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response => {
      if(response){
        fetch('http://localhost:3000/image',{
          method : 'put',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
              id:this.state.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{ entries:count}))
        })
      }
      this.displayFaceBox(this.calFaceLocation(response))
    }) 
    .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if(route ==='login'){
      this.setState({islogin:false})
    }else if(route === 'home'){
      this.setState({islogin:true})
    // }else if(route === 'register'){
    //   this.setState({islogin:false})
    }
    this.setState({route:route});
  }
  render(){
    return (
      <div className="App">
        {/* <Particles className='fixed h-100 w-100' /> */}
        <Navigator islogin={this.state.islogin} onRouteChange={this.onRouteChange}/>          
          {/* <Routes /> */}
          {this.state.route === 'home'
          ?<div>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onImgSubmit={this.onImgSubmit}/>
              <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
           </div>
          :(this.state.route==='login'
              ?<Login loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
          }
      </div>
    );  
  }
}

export default App;


//  console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
