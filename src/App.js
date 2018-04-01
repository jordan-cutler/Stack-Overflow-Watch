import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Questions from './Questions/Questions';

const API_KEY = "PgIHgWjR5mBZD429EUo6Rw((";
const SITE = "stackoverflow.com";

const API_URL = 'https://api.stackexchange.com/2.2/questions/unanswered/';
const QUESTION_LISTENER_INTERVAL = 60000;
const PAGE_SIZE = 10;
class App extends Component {

  static createQueryByTags(tags) {
    return `?site=${SITE}&order=desc&sort=creation&tagged=${tags.join(';')}&pagesize=${PAGE_SIZE}&key=${API_KEY}`;
  }

  static sortQuestionsMostRecentCreation(questions) {
    const questionsCopy = [...questions];
    return questionsCopy.sort((a, b) => {
      return b.creation_date - a.creation_date;
    });
  }

  state = {
    tagGroups: [
      {
        wantedTags: ['scala'],
        unwantedTags: ['apache-spark']
      },
      {
        wantedTags: ['scala', 'java'],
        unwantedTags: ['apache-spark']
      }
    ],
    questions: [],
    archivedQuestionIds: {},
  };

  render() {
    return (
      <div className="App">
        <Questions questions={this.state.questions} />
      </div>
    );
  }

  componentDidMount() {
    this.beginQuestionListener();
  }

  beginQuestionListener() {
    this.retrieveQuestionData();
    setInterval(() => {
      this.retrieveQuestionData();
    }, QUESTION_LISTENER_INTERVAL)
  }

  retrieveQuestionData() {
    this.state.tagGroups.forEach(tagGroup => {
      axios
        .get(API_URL + App.createQueryByTags(tagGroup.wantedTags))
        .then(response => {
          this.updateQuestionsListFromApiResponse(response.data.items, tagGroup);
        });
    });
  }

  updateQuestionsListFromApiResponse(questionsResponse, tagGroupUsed) {
    const newQuestions = this.getNewQuestionsWithoutUnwantedTags(questionsResponse, tagGroupUsed);
    const updatedList = [...newQuestions, ...this.state.questions];
    const listSortedByMostRecentQuestions = App.sortQuestionsMostRecentCreation(updatedList);
    this.setState({
      questions: listSortedByMostRecentQuestions
    });
  }

  getNewQuestionsWithoutUnwantedTags(questionsResponse, tagGroupUsed) {
    const tagIsNotUnwanted = (tag) => !tagGroupUsed.unwantedTags.includes(tag);

    return questionsResponse.filter(question => {
      const isNewQuestion = !this.state.questions.map(q => q.question_id).includes(question.question_id);
      const questionIsNotArchived = !this.state.archivedQuestionIds[question.question_id];
      const questionHasNoUnwantedTags = question.tags.every(tagIsNotUnwanted);
      return isNewQuestion && questionIsNotArchived && questionHasNoUnwantedTags;
    });
  }
}

export default App;
