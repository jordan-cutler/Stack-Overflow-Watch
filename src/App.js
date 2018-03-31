import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Questions from './Questions/Questions';

const API_KEY = "PgIHgWjR5mBZD429EUo6Rw((";
const TAGS = "scala";
const PAGE_SIZE = 10;
const SITE = "stackoverflow.com";

const URL = `https://api.stackexchange.com/2.2/questions/unanswered/?site=${SITE}&tagged=${TAGS}&pagesize=${PAGE_SIZE}&key=${API_KEY}`;

class App extends Component {
  state = {
    questions: []
  };

  render() {
    return (
      <div className="App">
        <Questions questions={this.state.questions} />
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(URL)
      .then((response => {
        console.log(response);
        const questions = response.data.items.filter(question => {
          return !question.tags.includes("apache-spark");
        });
        this.setState({
          questions: questions
        });
      }));
  }
}

export default App;
