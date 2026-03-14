import React, { useState } from "react";
import Task13Weather from "./task13Weather";
import "./task13Style.css";

function Task13App() {

  const [city, setCity] = useState("London");
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search !== "") {
      setCity(search);
      setSearch("");
    }
  };

  return (
    <div className="container">
      <h2>Task13 Weather Application</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter City Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <Task13Weather city={city} />

    </div>
  );
}

export default Task13App;