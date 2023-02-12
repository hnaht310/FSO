import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Statistics = ({ header, stats }) => {
  const { good, neutral, bad, total, avg, positive } = stats;
  if (total !== 0) {
    return (
      <>
        <h1>{header}</h1>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={avg} />
        <StatisticLine text='positive' value={positive} />
        {/* <h1>{header}</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {avg}</p>
        <p>positive {positive}%</p> */}
      </>
    );
  }

  return (
    <>
      <h1>{header}</h1>
      <p>No feedback given</p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const avg = total / 3;
  const positive = (good / total) * 100;

  const stats = { good, neutral, bad, total, avg, positive };

  const header1 = 'give feedback';
  const header2 = 'statistics';
  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral((prevVal) => prevVal + 1);
  };

  const handleClickBad = () => {
    setBad((prevVal) => prevVal + 1);
  };

  return (
    <div>
      <h1>{header1}</h1>
      <Button handleClick={handleClickGood} text='good' />
      <Button handleClick={handleClickNeutral} text='neutral' />
      <Button handleClick={handleClickBad} text='bad' />
      <Statistics stats={stats} header={header2} />
    </div>
  );
};

// another way
// const Button = ({ handleClick, text }) => {
//   return (
//     <button onClick={handleClick} name={text}>
//       {text}
//     </button>
//   );
// };

// const App = () => {
//   const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });
//   const header1 = 'give feedback';
//   const header2 = 'statistics';

//   const handleClick = (e) => {
//     const buttonName = e.target.name;
//     if (buttonName === 'good') {
//       const newFeedback = { ...feedback, good: feedback.good + 1 };
//       setFeedback(newFeedback);
//     }
//     if (buttonName === 'neutral') {
//       const newFeedback = { ...feedback, neutral: feedback.neutral + 1 };
//       setFeedback(newFeedback);
//     }
//     if (buttonName === 'bad') {
//       const newFeedback = { ...feedback, bad: feedback.bad + 1 };
//       setFeedback(newFeedback);
//     }
//   };

//   return (
//     <div>
//       <h1>{header1}</h1>
//       <Button handleClick={handleClick} text='good' />
//       <Button handleClick={handleClick} text='neutral' />
//       <Button handleClick={handleClick} text='bad' />
//       <h1>{header2}</h1>
//       <p>good {feedback.good}</p>
//       <p>neutral {feedback.neutral}</p>
//       <p>bad {feedback.bad}</p>
//     </div>
//   );
// };
export default App;
