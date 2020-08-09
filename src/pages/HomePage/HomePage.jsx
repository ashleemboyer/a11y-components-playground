import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Components from "a11y-components";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const componentNames = Object.keys(Components);
  const [currentComponent, setCurrentComponent] = useState(
    Components[componentNames[0]]
  );

  return (
    <div className={styles.HomePage}>
      <h2>What component do you want to see in the Playground?</h2>
      {componentNames.map((name) => (
        <Link to={`/component/${name}`}>{name}</Link>
      ))}
    </div>
  );
};

export default HomePage;
