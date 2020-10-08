import React from "react";
import Nav from "./flights/Nav";
import Home from "./flights/Home";
import AddFlight from "./flights/AddFlight";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default function Flights({ setIsLoggedIn }) {
  return (
    <Router>
      <div className="flights-page">
        <Nav setIsLoggedIn={setIsLoggedIn} />
        <section>
          <Route path="/" component={Home} exact />
          <Route path="/add" component={AddFlight} exact />
        </section>
      </div>
    </Router>
  );
}
