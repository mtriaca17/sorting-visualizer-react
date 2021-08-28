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
  beingCompared: {
    backgroundColor: 'orange',
  },
});

const timer = ms => new Promise(res => setTimeout(res, ms));

function BubbleSortVisualizer(props) {
  // const toSrt = [...props.arrayToSort];
  const [steps, setSteps] = useState(0);
  const [arrayBeingSorted, setArrayBeingSorted] = useState([...props.arrayToSort]);
  const [indexBeingCompared, setIndexBeingCompared] = useState([]);

  useEffect(() => {
    setArrayBeingSorted([...props.arrayToSort]);
  }, [props.arrayToSort]);

  const bubbleSort = async arr => {
    let noSwaps;
    for (let i = arr.length; i > 0; i--) {
      noSwaps = true;
      for (let j = 0; j < i - 1; j++) {
        setIndexBeingCompared([j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSteps(prevState => prevState + 1);
          setArrayBeingSorted([...arr]);
          noSwaps = false;
          await timer(50);
        }
      }
      if (noSwaps) break;
    }
    return arr;
  };

  const handleClick = () => {
    bubbleSort(arrayBeingSorted);
    // console.log('!!!!', arrayToSort);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Bubble Sort</h1>
      <p># of steps: {steps}</p>
      <div className={classes.sortDisplayer}>
        {arrayBeingSorted.map((val, index) => (
          <div
            className={`${classes.bar} ${
              indexBeingCompared.includes(index) && classes.beingCompared
            }`}
            key={index}
            style={{ height: `${val}px` }}
          ></div>
        ))}
      </div>
      <button onClick={handleClick}>Sort</button>
    </div>
  );
}

export default BubbleSortVisualizer;
