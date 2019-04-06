import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from "react-router-dom";
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => {
        console.log(response.data);
        this.setState({
          smurfs: response.data
        });        
      })
      .catch(err => console.log(err));
  }

  updateSmurfs = smurfs => {
    this.setState({ smurfs })
  }

  handleDelete = (id) => {
    console.log("In handleDelete");
    axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then( response => {
        console.log("response:", response);
        this.setState({ smurfs: response.data });
      })
      .catch( err => console.log(err) );
  };

  render() {
    return (
      <div className="App">
        <div className="navBar">
          <Link to="/">Home</Link>{" "}
          <Link to="/smurf-form">Add Smurf</Link>
        </div>

        <Route path="/smurf-form" component={() =>
          <SmurfForm smurfs={this.state.smurfs} updateSmurfs={this.updateSmurfs}/> }
        />
        <Route exact path="/" render={ (props) => (
          <Smurfs {...props} smurfs={this.state.smurfs} handleDelete={this.handleDelete}/>
        ) } />
        
        
      </div>
    );
  }
}

export default App;
