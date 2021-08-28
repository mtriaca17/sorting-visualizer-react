import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortDisplayer: {
    width: '90%',
    height: '60%',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: '1px',
  },
  bar: {
    border: '1px solid black',
    width: '10px',
    backgroundColor: 'dodgerblue',
  },
  lowest: {
    backgroundColor: 'orange',
  },
});

const timer = ms => new Promise(res => setTimeout(res, ms));

function SelectionSortVisualizer(props) {
  const [arrayBeingSorted, setArrayBeingSorted] = useState([...props.arrayToSort]);
  const [lowestIndex, setLowestIndex] = useState();
  const [steps, setSteps] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    setArrayBeingSorted([...props.arrayToSort]);
  }, [props.arrayToSort]);

  const selectionSort = async arr => {
    for (let i = 0; i < arr.length; i++) {
      let lowest = i;
      setLowestIndex(lowest);
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[lowest]) {
          lowest = j;
          setLowestIndex(lowest);
        }
      }
      if (i !== lowest) {
        await timer(50);
        [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
        setSteps(prevState => prevState + 1);
        setArrayBeingSorted([...arr]);
      }
    }
    console.log(arr);
    return arr;
  };

  const handleClick = () => {
    selectionSort(arrayBeingSorted);
  };

  return (
    <div className={classes.root}>
      <h1>Selection Sort</h1>
      <p># of steps: {steps}</p>
      <div className={classes.sortDisplayer}>
        {arrayBeingSorted.map((val, index) => (
          <div
            className={`${classes.bar} ${lowestIndex === index && classes.lowest}`}
            key={index}
            style={{ height: `${val}px` }}
          ></div>
        ))}
      </div>
      <button onClick={handleClick}>Sort</button>
    </div>
  );
}

export default SelectionSortVisualizer;
