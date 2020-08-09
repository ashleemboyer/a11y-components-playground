import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { AboutPage, HomePage } from "./pages";

export default () => (
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>

    <div>
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </div>
  </Router>
);
