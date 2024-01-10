import React from "react";

function SelectOptions({
  sortOption,
  isAscending,
  onSortChange,
  onOrderChange,
  searchQuery,
  onSearchChange,
  onClearSearch,
}) {
  return (
    <div className="sort-wrapper">
      <label htmlFor="sortOption">Sort by:</label>
      <select id="sortOption" value={sortOption} onChange={onSortChange}>
        <option value="">Select an option</option>
        <option value="title">Title</option>
        <option value="year">Year</option>
        <option value="ratings">Ratings</option>
        <option value="runningTime">Running Time</option>
      </select>
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search films..."
          value={searchQuery}
          onChange={onSearchChange}
        />
        <button onClick={onClearSearch}>Clear</button>
      </div>
      <div className="label-wrapper">
        <label>
          <input
            type="radio"
            name="order"
            value="ascending"
            checked={isAscending}
            onChange={() => onOrderChange(true)}
          />
          Ascending
        </label>
        <label>
          <input
            type="radio"
            name="order"
            value="descending"
            checked={!isAscending}
            onChange={() => onOrderChange(false)}
          />
          Descending
        </label>
      </div>
    </div>
  );
}

export default SelectOptions;
