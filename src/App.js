import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar';
import Flag from './components/Flag';

import getRandomCountry from './helper/getRandomCountry';
import shuffleArray from './helper/shuffleArray';

let countryName;
let choices = [];
let quizChoices = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: null,
      answer: null,
      country: '',
      isCorrect: ''
    }
  }

  componentDidMount() {
    this.startNewGame();
    choices = [getRandomCountry(),getRandomCountry(),getRandomCountry()];
    quizChoices = shuffleArray([countryName, ...choices]);
  }

  startNewGame = () => {
    // this.setState({isCorrect: null});
    countryName = getRandomCountry();
    axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(res => {
        this.setState({
          flag: res.data[0].flag,
          textInput: '',
          country: countryName,
        })
      })
      choices = [getRandomCountry(),getRandomCountry(),getRandomCountry()];
    quizChoices = shuffleArray([countryName, ...choices]);
    this.setState({isCorrect: ''});
  }

  handleRadioChange = (event) => {
    this.setState({
      answer: event.target.value
    });
  }

  handleRadioSubmit = (event) => {
    event.preventDefault();
    if (this.state.answer.toLowerCase() === countryName.toLowerCase()) {
      console.log('correct!');
      this.setState({isCorrect: 'Correct!'});
    } else {
      console.log('incorrect!');
      this.setState({isCorrect: 'Wrong!'});
    }
  }


  render() {
    return (
      <div className="App">
        <Navbar startNewGame={this.startNewGame} />
        <Flag startNewGame={this.startNewGame} flag={this.state.flag}/>
        <form onSubmit={this.handleRadioSubmit}>
          <div onChange={this.handleRadioChange}>
          {quizChoices.map((ans, i) =>
              {return (<span><input value={ans} type="radio" name="country" key={i} /> {ans} </span>)}
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
        {this.state.isCorrect === 'Correct!' ? <h1 style={{color:'green'}}>{this.state.isCorrect}</h1> : <h1 style={{color:'red'}}>{this.state.isCorrect}</h1>}
      </div>
    );
  }
}

export default App;
