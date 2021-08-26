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
});

const timer = ms => new Promise(res => setTimeout(res, ms));

function InsertionSortVisualizer(props) {
  const [arrayBeingSorted, setArrayBeingSorted] = useState([...props.arrayToSort]);
  const [steps, setSteps] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    setArrayBeingSorted([...props.arrayToSort]);
  }, [props.arrayToSort]);

  const inserstionSort = async arr => {
    for (let i = 1; i < arr.length; i++) {
      let currentVal = arr[i];
      for (let j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
        arr[j + 1] = arr[j];
        arr[j] = currentVal;
        setSteps(prevState => prevState + 1);
        setArrayBeingSorted([...arr]);
        await timer(50);
        // console.log(arr);
      }
    }
    return arr;
  };

  const handleClick = () => {
    inserstionSort(arrayBeingSorted);
  };
  return (
    <div className={classes.root}>
      <h1>Insertion Sort</h1>
      <p># of steps: {steps}</p>
      <div className={classes.sortDisplayer}>
        {arrayBeingSorted.map((val, index) => (
          <div className={classes.bar} key={index} style={{ height: `${val}px` }}></div>
        ))}
      </div>
      <button onClick={handleClick}>Sort</button>
    </div>
  );
}

export default InsertionSortVisualizer;
