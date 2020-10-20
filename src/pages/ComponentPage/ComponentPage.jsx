import React, { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Components from '@amb-codes-crafts/a11y-components';
import styles from './ComponentPage.module.scss';

const getComponentProps = (props) => {
  const componentProps = {};
  props.forEach((prop) => {
    if (prop.name === '' || prop.type === '' || prop.value === '') {
      return;
    }

    try {
      if (prop.type === 'boolean') {
        componentProps[prop.name] = prop.value === 'true';
      } else if (prop.type === 'function') {
        // eslint-disable-next-line
        componentProps[prop.name] = eval(prop.value);
      } else if (prop.type === 'json') {
        componentProps[prop.name] = JSON.parse(prop.value);
      } else {
        componentProps[prop.name] = prop.value;
      }
    } catch (e) {
      console.log(e);
    }
  });
  return componentProps;
};

const ComponentPage = () => {
  const { name } = useParams();
  const [componentProps, setComponentProps] = useState([]);
  const [focusNewInput, setFocusNewInput] = useState(false);

  useLayoutEffect(() => {
    if (focusNewInput) {
      const propIndex = (componentProps.length - 1) * 3;
      const inputs = document.querySelectorAll('input,select,textarea');
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
          <h3>Properties</h3>
          {componentProps.map((prop, index) => (
            <div key={`prop-${index}`}>
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
              {prop.type === 'json' || prop.type === 'function' ? (
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
                title={`Remove "${prop.name}" prop`}
                aria-label={`Remove ${prop.name} property`}
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
          <button
            className={styles.AddButton}
            onClick={() => {
              setComponentProps([
                ...componentProps,
                { name: '', type: '', value: '' },
              ]);
              setFocusNewInput(true);
            }}
          >
            Add Property
          </button>
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
