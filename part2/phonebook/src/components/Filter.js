const Filter = ({ filteredName, handleFilter }) => {
  return (
    <div>
      filter shown with:
      <input value={filteredName} type='search' onChange={handleFilter} />
    </div>
  );
};

export default Filter;
