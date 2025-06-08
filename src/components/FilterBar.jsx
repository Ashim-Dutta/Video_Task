// File: /components/FilterBar.jsx
import React from "react";

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="my-4">
      <label className="mr-2 font-medium">Filter Tasks:</label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded"
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
