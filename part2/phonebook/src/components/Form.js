const Form = ({ formInfo }) => {
  const { handleNameChange, handleNumChange, handleSubmit, newNum, newName } =
    formInfo;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:
        <input value={newNum} onChange={handleNumChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default Form;
