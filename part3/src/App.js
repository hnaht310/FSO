const Header = ({ course }) => {
  const { name } = course;
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const Part = ({ item }) => {
  const { name, exercise } = item;
  return (
    <p>
      {name} {exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  console.log(parts);
  const partList = parts.map((item, index) => {
    return <Part key={index} item={item} />;
  });
  return <>{partList}</>;
};
const Total = ({ total }) => {
  return <p>Number of exercises: {total}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercise: 10 },
      { name: 'Using props to pass data', exercise: 7 },
      { name: 'State of a component', exercise: 14 },
    ],
  };

  const total = course.parts.reduce((acc, currItem) => {
    console.log(`total ${acc}`);
    console.log(`current item: ${currItem.exercise}`);
    acc += currItem.exercise;
    return acc;
  }, 0);

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  );
};

export default App;
