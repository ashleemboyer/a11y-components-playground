import React from "react";
import { Link } from "react-router-dom";
import * as Components from "a11y-components";
import styles from "./HomePage.module.scss";

const HomePage = () => (
  <div className={styles.HomePage}>
    <h2>What component do you want to see in the Playground?</h2>
    {Object.keys(Components).map((name) => (
      <Link to={`/component/${name}`} key={`link-to-${name}`}>
        {name}
      </Link>
    ))}
  </div>
);

export default HomePage;
