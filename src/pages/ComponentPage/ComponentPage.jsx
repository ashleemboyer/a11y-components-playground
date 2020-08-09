import React, { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import * as Components from "a11y-components";
import styles from "./ComponentPage.module.scss";

const getComponentProps = (props) => {
  const componentProps = {};
  props.forEach((prop) => {
    if (prop.type === "boolean") {
      componentProps[prop.name] = prop.value === "true";
    } else if (prop.type === "function") {
      // eslint-disable-next-line
      componentProps[prop.name] = eval(prop.value);
    } else if (prop.type === "json") {
      try {
        componentProps[prop.name] = JSON.parse(prop.value);
      } catch (e) {
        console.log(e);
      }
    } else {
      componentProps[prop.name] = prop.value;
    }
  });

  return componentProps;
};

const ComponentPage = () => {
  const { name } = useParams();
  const [componentProps, setComponentProps] = useState([
    {
      name: "children",
      type: "string",
      value: "Hello!",
    },
    {
      name: "disabled",
      type: "boolean",
      value: "true",
    },
    {
      name: "onClick",
      type: "function",
      value: "() => {\n  alert('Button clicked!');\n}",
    },
    {
      name: "style",
      type: "json",
      value:
        '{\n  "padding": "8px",\n  "font-size": "1rem",\n  "font-weight": "bold",\n  "font-family": "serif",\n  "border-width": "2px",\n  "border-radius": "8px"\n}',
    },
  ]);
  const [focusNewInput, setFocusNewInput] = useState(false);

  useLayoutEffect(() => {
    if (focusNewInput) {
      const propIndex = (componentProps.length - 1) * 3;
      const inputs = document.querySelectorAll("input,select,textarea");
      const inputToFocus = inputs[propIndex];
      inputToFocus.focus();
      setFocusNewInput(false);
    }
  }, [focusNewInput, componentProps]);

  return (
    <div className={styles.ComponentPage}>
      <h2>The {name} Component</h2>
      <div>
        <div className={styles.PropsContainer}>
          <div>
            <h3>Props</h3>
            <button
              className={styles.AddButton}
              onClick={() => {
                setComponentProps([
                  ...componentProps,
                  { name: "", type: "", value: "" },
                ]);
                setFocusNewInput(true);
              }}
            >
              Add Prop
            </button>
          </div>
          {componentProps.map((prop, index) => (
            <div>
              <input
                value={prop.name}
                onChange={(e) => {
                  prop.name = e.target.value;
                  componentProps.splice(index, prop);
                  setComponentProps([...componentProps]);
                }}
              />
              <select
                value={prop.type}
                onChange={(e) => {
                  prop.type = e.target.value;
                  componentProps.splice(index, prop);
                  setComponentProps([...componentProps]);
                }}
              >
                <option value=""></option>
                <option value="string">String</option>
                <option value="boolean">Boolean</option>
                <option value="json">JSON</option>
                <option value="function">Function</option>
              </select>
              {prop.type === "json" || prop.type === "function" ? (
                <textarea
                  value={prop.value}
                  onChange={(e) => {
                    prop.value = e.target.value;
                    componentProps.splice(index, prop);
                    setComponentProps([...componentProps]);
                  }}
                />
              ) : (
                <input
                  value={prop.value}
                  onChange={(e) => {
                    prop.value = e.target.value;
                    componentProps.splice(index, prop);
                    setComponentProps([...componentProps]);
                  }}
                />
              )}
              <button
                className={styles.DeleteButton}
                onClick={() => {
                  componentProps.splice(index, 1);
                  setComponentProps([...componentProps]);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className={styles.ComponentContainer}>
          <h3>Rendered Component</h3>
          <div>
            {Components[name].render(getComponentProps(componentProps))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPage;
