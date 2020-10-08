import React, { useState, useEffect } from "react";

import { format } from "timeago.js";
import axios from "axios";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [token, setToken] = useState("");

  const getFlights = async (token) => {
    const result = await axios.get("/api/flights", {
      headers: { Authorization: token },
    });

    setFlights(result.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getFlights(token);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/flights/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        getFlights(token);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };
  return (
    <div className="flight-wrapper">
      {flights.map((flight) => (
        <div className="card" key={flight._id}>
          <h4 title={flight.airline}>{flight.airline}</h4>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Origin: {flight.from}</p>
            <p>Destination: {flight.to}</p>
          </div>

          <div className="text-wrapper">
            <p>{flight.desc}</p>
          </div>
          <p className="date">{format(flight.date)}</p>
          <div className="card-footer">{flight.name}</div>
          <button className="close" onClick={() => handleDelete(flight._id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
