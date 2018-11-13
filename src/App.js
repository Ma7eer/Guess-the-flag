import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar';
import Flag from './components/Flag';
import ScoreBar from './components/ScoreBar';

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
      isCorrect: '',
      score: 0,
      userAnswer: null
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

  handleButtonSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.userAnswer);
    if (this.state.userAnswer.toLowerCase() === countryName.toLowerCase()) {
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

  handleButtonClick = (event) => {
    this.setState({userAnswer: event.target.value})
  }


  render() {
    return (
      <React.Fragment>
        <Navbar startNewGame={this.startNewGame} />
      <div className="App">
      <ScoreBar barWidth={this.state.score + '%'}/>
        <Flag startNewGame={this.startNewGame} flagUrl={this.state.flag}/>
        <form onSubmit={this.handleButtonSubmit}>
          {quizChoices.map((choice, i) => {
            return this.state.answered ? <button onClick={this.handleButtonClick} type="submit" key={i} value={choice} disabled>{choice}</button> : <button onClick={this.handleButtonClick} type="submit" key={i} value={choice} >{choice}</button>
          })}
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
