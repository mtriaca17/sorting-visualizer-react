import React, { useState } from 'react';
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

const exampleArray = [4, 2, 1, 5, 3, 9, 2, 3, 12, 5, 6, 9, 2, 4, 7, 8, 12, 5, 4, 12, 13];
const timer = ms => new Promise(res => setTimeout(res, ms));

function BubbleSortVisualizer() {
  const [arrToSort, setArrToSort] = useState(exampleArray);

  const bubbleSort = async arr => {
    let noSwaps;
    for (let i = arr.length; i > 0; i--) {
      noSwaps = true;
      for (let j = 0; j < i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArrToSort([...arr]);
          console.log(arrToSort);
          noSwaps = false;
          await timer(200);
        }
      }
      if (noSwaps) break;
    }
    return arr;
  };

  const handleClick = () => {
    bubbleSort(arrToSort);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Bubble Sort</h1>
      <div className={classes.sortDisplayer}>
        {arrToSort.map((val, index) => (
          <div className={classes.bar} key={index} style={{ height: `${val * 30}px` }}></div>
        ))}
      </div>
      <button onClick={handleClick}>Sort</button>
    </div>
  );
}

export default BubbleSortVisualizer;
