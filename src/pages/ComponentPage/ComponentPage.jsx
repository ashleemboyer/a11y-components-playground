import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Components from "a11y-components";
import styles from "./ComponentPage.module.scss";

const Input = ({ initialValue, onChangeCallback }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChangeCallback(e.target.value);
      }}
    />
  );
};

const ComponentPage = () => {
  const { name } = useParams();

  const [componentProps, setComponentProps] = useState({
    children: "Hello",
  });

  return (
    <div className={styles.ComponentPage}>
      <h2>The {name} Component</h2>
      <div>
        <div className={styles.PropsContainer}>
          <h3>Props</h3>
          {Object.keys(componentProps).map((propName) => (
            <div key={`prop-${propName}`}>
              <Input
                initialValue={propName}
                onChangeCallback={(value) => {
                  const propValue = componentProps[propName];
                  delete componentProps[propName];
                  setComponentProps({
                    ...componentProps,
                    [value]: propValue,
                  });
                }}
              />
              <Input
                initialValue={componentProps[propName]}
                onChangeCallback={(value) => {
                  setComponentProps({
                    ...componentProps,
                    [propName]: value,
                  });
                }}
              />
            </div>
          ))}
        </div>
        <div className={styles.ComponentContainer}>
          <h3>Rendered Component</h3>
          <div>{Components[name].render(componentProps)}</div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPage;
