import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar';
import Result from './components/Result';
import Flag from './components/Flag';
import ScoreBar from './components/ScoreBar';
import MultipleChoice from './components/MultipleChoice';
import NextButton from './components/NextButton';

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
      totalScore: 0,
      wrongScore: 0,
      userAnswer: null
    }
  }

  componentDidMount() {
    this.startNewGame();
  }

  getFlagData = (countryName) => {
    axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(res => {
      if (countryName === 'India') { // special case related to the api
        this.setState({
          flag: res.data[1].flag,
          textInput: '',
          country: countryName,
        })
      } else {
        this.setState({
          flag: res.data[0].flag,
          textInput: '',
          country: countryName,
        })
      }
    });
  }

  startNewGame = () => {
    countryName = getRandomCountry();
    this.getFlagData(countryName);
    quizChoices = shuffleArray([countryName, getRandomCountry(),getRandomCountry(),getRandomCountry()]);
    this.setState({
        gameStatus: 'onGoing',
        score: 0,
        totalScore: 0,
        wrongScore: 0,
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
      if (this.state.totalScore === 90) {
        this.setState(prevState => {
          return {
            gameStatus: 'Done',
            answered: true,
            score: (prevState.score + 10)
          }
          });
          this.setState(prevState => {
            return {
              totalScore: prevState.score + prevState.wrongScore
            }
            });
      } else {
        this.setState(prevState => {
          return {
            gameStatus: 'next',
            score: (prevState.score + 10),
            answered: true
          }
        });
        this.setState(prevState => {
          return {
            totalScore: prevState.score + prevState.wrongScore
          }
        });
      }
    } else {
      if (this.state.totalScore === 90) {
        this.setState(prevState => {
          return {
            gameStatus: 'Done',
            wrongScore: (prevState.wrongScore + 10)
          }
          });
          this.setState(prevState => {
            return {
              totalScore: prevState.score + prevState.wrongScore
            }
            });
          } else {
            this.setState(prevState => {
              return {gameStatus: 'next', wrongScore: prevState.wrongScore + 10
            }
          });
            this.setState(prevState => {
        return {
          totalScore: prevState.score + prevState.wrongScore
      }
    });
    }
    this.setState({answered: true})
  }
}

  handleButtonClick = (event) => {
    this.setState({userAnswer: event.target.value});
  }


  render() {
    return (
      <React.Fragment>
        <Navbar
          startNewGame={this.startNewGame} />
      <div className="container">
      <div className="info-container">
      <div>
      <ScoreBar
        barWidth={this.state.score + '%'} wrongScore={this.state.wrongScore + '%'} />
      </div>
      <div>
      <NextButton
          gameStatus={this.state.gameStatus}
          goToNextQuestion={this.goToNextQuestion} />
      </div>

      </div>
      <Result gameStatus={this.state.gameStatus} score={this.state.score} wrongScore={this.state.wrongScore}/>

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
