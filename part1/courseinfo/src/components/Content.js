import Part from './Part';

const Content = ({ parts }) => {
  console.log(parts);
  const totalExercises = parts.reduce((accu, currVal) => {
    accu += currVal.exercises;
    return accu;
  }, 0);
  return (
    <div>
      {parts.map((part, index) => {
        return <Part key={index} part={part} />;
      })}
      <p>
        <strong>total of {totalExercises} exercises</strong>
      </p>
    </div>
  );
};

export default Content;
