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

let correctAnswer;
let quizChoices = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: null,
      answered: false,
      country: '',
      gameStatus: 'onGoing',
      correctScore: 0,
      totalScore: 0,
      incorrectScore: 0,
      userAnswer: null
    }
  }

  componentDidMount() {
    this.startNewGame();
  }

  getFlagData = (countryName) => {
    axios.get(`https://restcountries.eu/rest/v2/name/${correctAnswer}`)
    .then(res => {
      if (correctAnswer === 'India' || correctAnswer === 'United States' || correctAnswer === 'United States') { // special case related to the api
        this.setState({
          flag: res.data[1].flag,
          textInput: '',
          country: correctAnswer,
        })
      } else if (correctAnswer === 'Korea (Republic of)') {
        this.setState({
          flag: res.data[0].flag,
          textInput: '',
          country: 'South Korea',
        })
      } else {
        this.setState({
          flag: res.data[0].flag,
          textInput: '',
          country: correctAnswer,
        })
      }
    });
  }

  startNewGame = () => {
    correctAnswer = getRandomCountry();
    this.getFlagData(correctAnswer);
    quizChoices = shuffleArray([correctAnswer, getRandomCountry(),getRandomCountry(),getRandomCountry()]);
    this.setState({
        gameStatus: 'onGoing',
        correctScore: 0,
        totalScore: 0,
        incorrectScore: 0,
        answered: false,
        quizChoices: []
    });
  }

  goToNextQuestion = () => {
    correctAnswer = getRandomCountry();
    this.getFlagData(correctAnswer);
    quizChoices = shuffleArray([correctAnswer, getRandomCountry(),getRandomCountry(),getRandomCountry()]);
    this.setState({
        gameStatus: 'onGoing',
        answered: false
    });
  }

  handleButtonSubmit = (event) => {
    event.preventDefault();
    if (this.state.userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      if (this.state.totalScore === 90) {
        this.setState(prevState => {
          return {
            gameStatus: 'Done',
            answered: true,
            correctScore: (prevState.correctScore + 10)
          }
          });
          this.setState(prevState => {
            return {
              totalScore: prevState.correctScore + prevState.incorrectScore
            }
            });
      } else {
        this.setState(prevState => {
          return {
            gameStatus: 'next',
            correctScore: (prevState.correctScore + 10),
            answered: true
          }
        });
        this.setState(prevState => {
          return {
            totalScore: prevState.correctScore + prevState.incorrectScore
          }
        });
      }
    } else {
      if (this.state.totalScore === 90) {
        this.setState(prevState => {
          return {
            gameStatus: 'Done',
            answered: true,
            incorrectScore: (prevState.incorrectScore + 10)
          }
          });
          this.setState(prevState => {
            return {
              totalScore: prevState.correctScore + prevState.incorrectScore
            }
            });
          } else {
            this.setState(prevState => {
              return {gameStatus: 'next', incorrectScore: prevState.incorrectScore + 10
            }
          });
            this.setState(prevState => {
        return {
          totalScore: prevState.correctScore + prevState.incorrectScore
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
        correctScore={this.state.correctScore + '%'} incorrectScore={this.state.incorrectScore + '%'} />
      </div>
      <div>
      <NextButton
          gameStatus={this.state.gameStatus}
          goToNextQuestion={this.goToNextQuestion} />
      </div>

      </div>
      <Result gameStatus={this.state.gameStatus} score={this.state.correctScore} incorrectScore={this.state.incorrectScore}/>

        <div className="game-container">
        <Flag
          startNewGame={this.startNewGame}
          flagUrl={this.state.flag} />
        <MultipleChoice
          quizChoices={quizChoices}
          handleButtonSubmit={this.handleButtonSubmit}
          answered={this.state.answered}
          handleButtonClick={this.handleButtonClick}
          correctAnswer={correctAnswer} />
        </div>

      </div>
      </React.Fragment>
    );
  }
}

export default App;
