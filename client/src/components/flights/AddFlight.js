import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AddFlight() {
  const [flight, setFlight] = useState({
    airline: "",
    desc: "",
    date: "",
    from: "",
    to: "",
  });

  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { airline, desc, date, from, to } = flight;
        const newFlight = { airline, desc, date, from, to };
        await axios.post("/api/flights", newFlight, {
          headers: { Authorization: token },
        });
        return history.push("/");
      }
    } catch (error) {
      window.location.href = "/";
    }
  };
  return (
    <div className="add-flight">
      <h2>Add a new Flight</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="row">
          <label htmlFor="airline">Airlines</label>
          <input
            type="text"
            value={flight.airline}
            id="airline"
            name="airline"
            required
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor="from">Origin</label>
          <input
            type="text"
            value={flight.from}
            id="from"
            name="from"
            required
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor="to">Destination</label>
          <input
            type="text"
            value={flight.to}
            id="to"
            name="to"
            required
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor="desc">Description</label>
          <textarea
            type="text"
            value={flight.desc}
            id="desc"
            name="desc"
            rows="10"
            required
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor="date">Date:{flight.date}</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
