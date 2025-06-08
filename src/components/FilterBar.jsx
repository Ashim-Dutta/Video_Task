import React from "react";

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="my-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
      <label className="mb-2 sm:mb-0 font-medium">Filter Tasks:</label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded w-full sm:w-auto"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
};

export default FilterBar;
