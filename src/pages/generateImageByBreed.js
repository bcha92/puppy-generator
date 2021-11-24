import React, { Component } from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

export default class ImageGenerator extends Component {
  constructor(props) { // Important "useState" substitute
    super(props)
    this.state = {
      breeds: [], // List state
      image: "", // Image state
    };
  }

  //Populate the selct's options
  componentDidMount() { // Similar to useEffect (onMount)
    axios.get("http://localhost:8001/breeds") // Executed only once
    // Breeds List entered into state
    .then(res => this.setState({ breeds: res.data }))
    .catch(err => console.log(err)) // Error Catcher
  }
  
  generateImage = async (e) => {
    //Generate the image HERE
    // Return image as "" if default option is selected
    if (e === "") { return this.setState({ image: "" }) }

    // Fetches based on breed selection via query
    // Query selection from frontend is sent to backend here
    await axios.get(`http://localhost:8001/breed?breed=${e}`)
    // Returns and sets image state to random image string URL
    .then(res => this.setState({ image: res.data }))
    .catch(err => console.log(err)) // Error Catcher
  };

  render() {
    return (
      <div className='container'>
        <CssBaseline />
        <h2>Select a breed to generate an image</h2>
        <select
          id='list'
          // on change, passes "e.target.value" of each selection value to generateImage
          onChange={(e) => this.generateImage(e.target.value)}
          className='select'
        >
          <option value=''>Select a breed</option>
          {/* maps the breeds "keys" array from backend as each "string" selection */}
          {this.state.breeds.map(breed => <option
            key={breed} // Key prop - unique identifier
            value={breed} // Value prop - string identifier for onChange
          >
            {breed /* Name Prop // Visual Reference on Selection */}
          </option>)}
        </select>
        <img
          // Image State // "" by default
          src={this.state.image}
          alt='Random dog image'
          // Hide image if image is not selected or default option selected
          className={this.state.image === "" ?
          'img-container hidden' : "img-container"}
          id='imgContainer'
        />
      </div>
    );
  }
}
