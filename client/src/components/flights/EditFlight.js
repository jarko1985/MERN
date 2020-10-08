import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function EditFlight({ match }) {
  const [flight, setFlight] = useState({
    airline: "",
    desc: "",
    date: "",
    id: "",
  });

  const history = useHistory();
  useEffect(() => {
    const getFlight = async () => {
      const token = localStorage.getItem("");
      if (match.params.id) {
        const result = await axios.get(`/api/flights/${match.params.id}`, {
          headers: { Authorization: token },
        });
        // setFlight({
        //   airline: result.data.airline,
        //   desc: result.data.desc,
        //   date: result.data.date,
        //   id: result.data.id,
        // });
        console.log(result);
      }
    };
    getFlight();
  }, [match.params.id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { airline, desc, date } = flight;
        const newFlight = { airline, desc, date };
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
      <h2>Edit flight</h2>
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
