import React from 'react';
import './Question.css';

const question = (props) => {
  return (
    <li className="question">
      <a className="questionLink" href={props.url} target="_blank">
        <div className="name">
          {props.questionName}
        </div>

        <div className="more">
          <span className="creationDate">Asked {formatDate(new Date(props.creationTime))} by</span>
          <span className="owner">{props.owner} ({props.ownerReputation})</span>
        </div>
      </a>
    </li>
  );
};

const formatDate = (date) => {
  const diff = ((new Date()).getTime() - date.getTime()) / 1000;
  const dayDiff = Math.floor(diff / 86400);
  if (isNaN(dayDiff) || dayDiff < 0) {
    return;
  }
  return dayDiff === 0 && (
    diff < 60 && 'just now' ||
    diff < 120 && '1 minute ago' ||
    diff < 3600 && Math.floor(diff / 60) + ' minutes ago' ||
    diff < 7200 && '1 hour ago' ||
    diff < 86400 && Math.floor(diff / 3600) + ' hours ago') ||
    dayDiff === 1 && 'yesterday' ||
    dayDiff < 7 && dayDiff + ' days ago' ||
    dayDiff < 31 && Math.ceil(dayDiff / 7) + ' weeks ago' ||
    'over a month ago';
};

export default question;
