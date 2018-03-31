import React from 'react';
import Question from './Question/Question';
import './Questions.css';

const questions = (props) => {
  const questionList = props.questions.map(question => {
    return (
      <Question
        key={question.question_id}
        questionName={question.title}
        url={question.link}
        creationTime={question.creation_date * 1000}
        owner={question.owner.display_name}
      />
    )
  });
  return (
    <ul className="questions">
      {questionList}
    </ul>
  )
};

export default questions;
