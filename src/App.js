import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar';
import Flag from './components/Flag';
import ScoreBar from './components/ScoreBar';
import MultipleChoice from './components/MultipleChoice';
import Results from './components/Results';

import getRandomCountry from './helper/getRandomCountry';
import shuffleArray from './helper/shuffleArray';

let countryName;
let quizChoices = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: null,
      answered: false,
      country: '',
      gameStatus: 'onGoing',
      score: 0,
      userAnswer: null
    }
  }

  componentDidMount() {
    this.startNewGame();
  }

  getFlagData = (countryName) => {
    axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(res => {
      this.setState({
        flag: res.data[0].flag,
        textInput: '',
        country: countryName,
      })
    });
  }

  startNewGame = () => {
    countryName = getRandomCountry();
    this.getFlagData(countryName);
    quizChoices = shuffleArray([countryName, getRandomCountry(),getRandomCountry(),getRandomCountry()]);
    this.setState({
        gameStatus: 'onGoing',
        score: 0,
        answered: false,
        quizChoices: []
    });
  }

  goToNextQuestion = () => {
    countryName = getRandomCountry();
    this.getFlagData(countryName);
    quizChoices = shuffleArray([countryName, getRandomCountry(),getRandomCountry(),getRandomCountry()]);
    this.setState({
        gameStatus: 'onGoing',
        answered: false
    });
  }

  handleButtonSubmit = (event) => {
    event.preventDefault();
    if (this.state.userAnswer.toLowerCase() === countryName.toLowerCase()) {
      if (this.state.score === 90) {
        this.setState(prevState => {
          return {
            gameStatus: 'Done',
            score: (prevState.score + 10)
          }
          });
      } else {
        this.setState(prevState => {
          return {
            gameStatus: 'Next',
            score: (prevState.score + 10)
          }
        });
      }
    } else {
      this.setState({gameStatus: 'Next'});
    }
    this.setState({answered: true})
  }

  handleButtonClick = (event) => {
    this.setState({userAnswer: event.target.value});
  }


  render() {
    return (
      <React.Fragment>
        <Navbar
          startNewGame={this.startNewGame} />
      <div className="App">
      <div className="info-container">
      <div>
      <ScoreBar
        barWidth={this.state.score + '%'} />
      </div>
      <div>
      <Results
          gameStatus={this.state.gameStatus}
          goToNextQuestion={this.goToNextQuestion} />
      </div>

      </div>

        <div className="game-container">
        <Flag
          startNewGame={this.startNewGame}
          flagUrl={this.state.flag} />
        <MultipleChoice
          quizChoices={quizChoices}
          handleButtonSubmit={this.handleButtonSubmit}
          answered={this.state.answered}
          handleButtonClick={this.handleButtonClick}
          countryName={countryName} />
        </div>

      </div>
      </React.Fragment>
    );
  }
}

export default App;
