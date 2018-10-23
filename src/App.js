import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './Navbar';
import Game from './Game';
import countries from './countryList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: null,
      textInput: '',
      answer: null,
      country: ''
    }
  }

  startNewGame = () => {
    console.log("starting new game");
    let countryName = this.getRandomCountry();
    axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(res => {
        this.setState({
          flag: res.data[0].flag,
          textInput: '',
          country: countryName,
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      textInput: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log(this.state.textInput);
    console.log(this.state.country);
    if(this.state.country.toLowerCase() === this.state.textInput.toLowerCase()) {
      console.log("correct!");
      alert("correct!");
      this.startNewGame();
    } else {
      console.log("incorrect!");
      alert(`wrong! it is ${this.state.country}'s flag`);
      this.startNewGame();
    }
  }

  getRandomCountry = () => {
    return countries[Math.floor(Math.random() * countries.length)];
  }

  render() {
    return (
      <div className="App">
        <Navbar startNewGame={this.startNewGame} />
        <Game startNewGame={this.startNewGame} flag={this.state.flag} textInput={this.state.textInput} handleChange={this.handleChange} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
