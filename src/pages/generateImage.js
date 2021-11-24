import React, { Component } from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

export default class ImageGenerator extends Component {
  /* NOTE: Normally, I use "useState" with Hooks to render images,
  every time a button is clicked, and changes images,
  but as this is a class-based component, using constructor here below
  with this.state.image is the more logical course of action to
  behave in a similar manner */
  
  // Only used for React.Components // I normally don't use this way often
  constructor(props) { 
    // important to call before establishing "this.state"
    super(props);
    // Establishes a this.state.image // a mutable "state" render
    this.state = { image: "" };
  }

  // On Click, setState "image" to receive the "image url" from API
  generateImage = async () => {
    //Generate the image HERE
    return await axios.get("http://localhost:8001/random") // Gets URL endpoint from backend
    .then(res => this.setState({ image: res.data })) // image url entered into state
    .catch(err => console.log(err)) // Error Catcher (Console Log)
  };

  render() {
    return (
      <div className='container'>
        <CssBaseline />
        <h2>Click the button to generate a new picture</h2>
        <Button
          variant='contained'
          onClick={this.generateImage}
          className='button'
        >
          Click Me!
        </Button>
        <img
          // image render source from generateImage
          src={this.state.image}
          alt='Random dog image'
          // Hide image only if button not clicked.
          className={this.state.image === "" ?
            'img-container hidden' : "img-container"}
          id='imgContainer'
        />
      </div>
    );
  }
}
