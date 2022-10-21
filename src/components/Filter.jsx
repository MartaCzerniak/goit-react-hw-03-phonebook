function Filter({ filterInputValue, handleChange }) {
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        value={filterInputValue}
        onChange={handleChange}
      ></input>
    </div>
  );
}

export default Filter;
