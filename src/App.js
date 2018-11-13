import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar';
import Flag from './components/Flag';

import getRandomCountry from './helper/getRandomCountry';
import shuffleArray from './helper/shuffleArray';

let countryName;
let quizChoices = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: null,
      answer: null,
      answered: false,
      country: '',
      isCorrect: '',
      score: 0
    }
  }

  componentDidMount() {
    this.startNewGame();
  }

  startNewGame = () => {
    countryName = getRandomCountry();
    axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(res => {
        this.setState({
          flag: res.data[0].flag,
          textInput: '',
          country: countryName,
        })
      });
    quizChoices = shuffleArray([countryName, getRandomCountry(),getRandomCountry(),getRandomCountry()]);
    this.setState({
        isCorrect: '',
        score: 0,
        answered: false,
        quizChoices: []
    });
  }

  goToNextQuestion = () => {
    countryName = getRandomCountry();
    axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(res => {
        this.setState({
          flag: res.data[0].flag,
          textInput: '',
          country: countryName,
        })
      });
    quizChoices = shuffleArray([countryName, getRandomCountry(),getRandomCountry(),getRandomCountry()]);
    this.setState({
        isCorrect: '',
        answered: false
    });
  }

  handleRadioChange = (event) => {
    this.setState({
      answer: event.target.value
    });
  }

  handleRadioSubmit = (event) => {
    event.preventDefault();
    if (this.state.answer.toLowerCase() === countryName.toLowerCase()) {
      if (this.state.score === 90) {
        this.setState(prevState => {
          return {
            isCorrect: 'You win!',
            score: (prevState.score + 10)
          }
          });
      } else {
        this.setState(prevState => {
          return {
            isCorrect: 'Correct!',
            score: (prevState.score + 10)
          }
        });
      }
    } else {
      this.setState({isCorrect: 'Wrong!'});
    }
    this.setState({answered: true})
  }


  render() {
    return (
      <React.Fragment>
        <Navbar startNewGame={this.startNewGame} />
      <div className="App">
      <div className="score-bar-container">
        <div className="score-bar" style={{width: this.state.score + '%'}}><span className="score">{this.state.score + '%'}</span></div>
        </div>
        <Flag startNewGame={this.startNewGame} flagUrl={this.state.flag}/>
        <form onSubmit={this.handleRadioSubmit}>
          <div onChange={this.handleRadioChange}>
          {quizChoices.map((ans, i) =>
              {return this.state.answered ? (<span key={i}><input value={ans} type="radio" name="country" key={i} disabled /> {ans} </span>) : (<span key={i}><input value={ans} type="radio" name="country" key={i} /> {ans} </span>)}
            )}
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
        {this.state.isCorrect === 'Correct!' ? <div>
        <button onClick={this.goToNextQuestion}>Next</button> <h1 style={{color:'green'}}>{this.state.isCorrect}</h1>
          </div> : this.state.isCorrect === 'Wrong!' ? <div> <button  onClick={this.goToNextQuestion}>Next</button> <h1 style={{color:'red'}}>{this.state.isCorrect}</h1> </div> : <div> <h1 style={{color:'green'}}>{this.state.isCorrect}</h1> </div> }
      </div>
      </React.Fragment>
    );
  }
}

export default App;
