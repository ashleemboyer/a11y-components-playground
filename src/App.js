import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AboutPage, HomePage } from "./pages";
import styles from "./App.module.scss";

export default () => (
  <Router>
    <header className={styles.MainNav}>
      <h1>A11Y Components Playground</h1>
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
    </header>
    <main className={styles.MainContent}>
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </main>
  </Router>
);
